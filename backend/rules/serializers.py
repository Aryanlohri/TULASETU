from rest_framework import serializers
from rules.models import StateConfig

class StateConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateConfig
        fields = '__all__'
