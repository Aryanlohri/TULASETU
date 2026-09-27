from rest_framework import generics
from accounts.permissions import IsTrader
from traders.models import TraderProfile, Instrument
from traders.serializers import TraderProfileSerializer, InstrumentSerializer

class TraderProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsTrader]
    serializer_class = TraderProfileSerializer
    
    def get_object(self):
        return self.request.user.trader_profile

class InstrumentListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsTrader]
    serializer_class = InstrumentSerializer
    
    def get_queryset(self):
        return Instrument.objects.filter(trader=self.request.user.trader_profile)
        
    def perform_create(self, serializer):
        profile = self.request.user.trader_profile
        serializer.save(trader=profile, state_id=profile.state_id)

class InstrumentDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsTrader]
    serializer_class = InstrumentSerializer
    
    def get_queryset(self):
        return Instrument.objects.filter(trader=self.request.user.trader_profile)
