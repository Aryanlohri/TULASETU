from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.serializers import UserSerializer, UserRegistrationSerializer, UserLoginSerializer
from identity.factory import get_identity_provider

class RegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer
    
    def perform_create(self, serializer):
        user = serializer.save()
        if user.role == 'TRADER':
            from traders.models import TraderProfile
            TraderProfile.objects.create(
                user=user,
                business_name=f"{user.full_name}'s Business",
                state_id=user.state_id
            )

class LoginView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        })

class MeView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user

class VerifyIdentityView(APIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        aadhaar = request.data.get('aadhaar_number')
        provider = get_identity_provider()
        res = provider.verify_identity(aadhaar)
        
        if res.get('status') == 'success':
            if request.user.role == 'TRADER':
                profile = request.user.trader_profile
                profile.identity_verified = True
                profile.identity_provider = 'aadhaar'
                profile.save()
            return Response({'status': 'verified', 'data': res})
        return Response({'status': 'failed', 'error': 'Identity verification failed'}, status=400)
