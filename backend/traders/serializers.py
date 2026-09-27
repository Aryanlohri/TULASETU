from rest_framework import serializers
from traders.models import TraderProfile, Instrument

class TraderProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TraderProfile
        fields = '__all__'
        read_only_fields = ('user', 'identity_verified', 'identity_provider')

class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = '__all__'
        read_only_fields = ('trader', 'state_id')
