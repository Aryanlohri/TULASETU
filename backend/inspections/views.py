from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.permissions import IsOfficer
from inspections.models import Inspection
from inspections.serializers import InspectionSerializer
from applications.models import Application
from applications.state_machine import validate_transition
from django.utils import timezone

class InspectionListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsOfficer]
    serializer_class = InspectionSerializer
    
    def get_queryset(self):
        return Inspection.objects.filter(officer=self.request.user)
        
    def perform_create(self, serializer):
        app = serializer.validated_data['application']
        if app.assigned_officer != self.request.user:
            raise serializers.ValidationError("Application not assigned to you")
            
        validate_transition(app.status, 'INSPECTED')
        
        inspection = serializer.save(
            officer=self.request.user,
            state_id=self.request.user.state_id
        )
        
        if inspection.status == 'COMPLETED':
            app.status = 'INSPECTED'
            app.save()

class InspectionSyncView(APIView):
    permission_classes = [IsOfficer]
    
    def post(self, request):
        inspections_data = request.data
        if not isinstance(inspections_data, list):
            return Response({'error': 'Expected list of inspections'}, status=400)
            
        synced = []
        errors = []
        
        for item in inspections_data:
            try:
                app = Application.objects.get(id=item['application_id'])
                validate_transition(app.status, 'INSPECTED')
                
                insp = Inspection.objects.create(
                    application=app,
                    officer=request.user,
                    scheduled_date=item.get('scheduled_date', timezone.now().date()),
                    actual_timestamp=item.get('actual_timestamp'),
                    status='COMPLETED',
                    location_lat=item.get('location_lat'),
                    location_lng=item.get('location_lng'),
                    reading_data=item.get('reading_data', {}),
                    remarks=item.get('remarks', ''),
                    result=item.get('result', 'PASS'),
                    is_offline_sync=True,
                    offline_captured_at=item.get('offline_captured_at'),
                    synced_at=timezone.now(),
                    state_id=request.user.state_id
                )
                app.status = 'INSPECTED'
                app.save()
                synced.append(str(insp.id))
            except Exception as e:
                errors.append({'item': item, 'error': str(e)})
                
        return Response({
            'status': 'success',
            'synced_count': len(synced),
            'errors': errors
        })
