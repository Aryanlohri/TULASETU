from rest_framework import serializers
from applications.models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ('application_number', 'status', 'assigned_officer', 'fee_amount', 'fee_paid', 'state_id', 'trader')
