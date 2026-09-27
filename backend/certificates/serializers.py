from rest_framework import serializers
from certificates.models import Certificate, BlockchainAnchor

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'
