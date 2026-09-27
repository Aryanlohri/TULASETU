from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsTrader, IsOfficer
from applications.models import Application
from applications.serializers import ApplicationSerializer
from applications.state_machine import validate_transition, generate_application_number
from rules.engine import RuleEngine

class ApplicationListCreateView(generics.ListCreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'TRADER':
            return Application.objects.filter(trader=user.trader_profile)
        elif user.role in ['LMO', 'GATC']:
            return Application.objects.filter(state_id=user.state_id)
        return Application.objects.none()
        
    def perform_create(self, serializer):
        profile = self.request.user.trader_profile
        instrument = serializer.validated_data['instrument']
        app_type = serializer.validated_data['app_type']
        
        fee = RuleEngine.get_fee(profile.state_id, app_type, instrument.type)
        app_number = generate_application_number(profile.state_id)
        
        serializer.save(
            trader=profile,
            state_id=profile.state_id,
            application_number=app_number,
            fee_amount=fee
        )

class ApplicationDetailView(generics.RetrieveAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'TRADER':
            return Application.objects.filter(trader=user.trader_profile)
        return Application.objects.filter(state_id=user.state_id)

class ApplicationAssignView(APIView):
    permission_classes = [IsOfficer]
    
    def patch(self, request, pk):
        try:
            app = Application.objects.get(pk=pk, state_id=request.user.state_id)
            validate_transition(app.status, 'ASSIGNED')
            officer_id = request.data.get('officer_id', request.user.id)
            app.assigned_officer_id = officer_id
            app.status = 'ASSIGNED'
            app.save()
            return Response(ApplicationSerializer(app).data)
        except Application.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

class ApplicationScheduleView(APIView):
    permission_classes = [IsOfficer]
    
    def patch(self, request, pk):
        try:
            app = Application.objects.get(pk=pk, assigned_officer=request.user)
            validate_transition(app.status, 'SCHEDULED')
            
            # create inspection here conceptually or just update status
            app.status = 'SCHEDULED'
            app.save()
            return Response(ApplicationSerializer(app).data)
        except Application.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
