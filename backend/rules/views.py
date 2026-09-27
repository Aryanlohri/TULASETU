from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rules.models import StateConfig
from rules.serializers import StateConfigSerializer
from rules.engine import RuleEngine

class StateConfigListView(generics.ListAPIView):
    queryset = StateConfig.objects.filter(is_active=True)
    serializer_class = StateConfigSerializer
    permission_classes = [AllowAny]

class CalculateFeeView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        state_id = request.query_params.get('state_id')
        app_type = request.query_params.get('app_type')
        instrument_type = request.query_params.get('instrument_type')
        
        if not all([state_id, app_type, instrument_type]):
            return Response({'error': 'Missing parameters'}, status=400)
            
        fee = RuleEngine.get_fee(state_id, app_type, instrument_type)
        return Response({'fee': str(fee)})
