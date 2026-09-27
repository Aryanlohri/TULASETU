from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOfficer
from certificates.models import Certificate, BlockchainAnchor
from certificates.serializers import CertificateSerializer
from certificates.hasher import hash_certificate
from certificates.qr_generator import generate_qr
from applications.models import Application
from applications.state_machine import validate_transition
from blockchain.client import blockchain_client
from django.utils import timezone
from datetime import timedelta

class IssueCertificateView(APIView):
    permission_classes = [IsOfficer]
    
    def post(self, request):
        app_id = request.data.get('application_id')
        try:
            app = Application.objects.get(id=app_id)
            validate_transition(app.status, 'CERTIFIED')
            
            # create certificate
            from rules.engine import RuleEngine
            renewal_months = RuleEngine.get_renewal_period(app.state_id)
            valid_until = timezone.now().date() + timedelta(days=renewal_months*30)
            
            count = Certificate.objects.filter(state_id=app.state_id, created_at__year=timezone.now().year).count() + 1
            cert_number = f"TS-{app.state_id}-{timezone.now().year}-{count:05d}"
            
            cert = Certificate.objects.create(
                certificate_number=cert_number,
                application=app,
                instrument=app.instrument,
                trader=app.trader,
                issued_by=request.user,
                valid_from=timezone.now().date(),
                valid_until=valid_until,
                state_id=app.state_id
            )
            
            # Hash and anchor
            cert_hash = hash_certificate(cert)
            cert.blockchain_hash = cert_hash
            
            anchor_res = blockchain_client.anchor_certificate(
                certificate_id=cert.id,
                cert_hash=cert_hash,
                timestamp=timezone.now().isoformat(),
                issuer_id=request.user.id
            )
            
            cert.blockchain_tx_id = anchor_res.get('tx_id', '')
            cert.save()
            
            BlockchainAnchor.objects.create(
                certificate=cert,
                tx_id=cert.blockchain_tx_id,
                certificate_hash=cert_hash,
                anchor_timestamp=timezone.now(),
                issuer_id=str(request.user.id)
            )
            
            generate_qr(cert)
            
            app.status = 'CERTIFIED'
            app.save()
            
            return Response(CertificateSerializer(cert).data)
            
        except Application.DoesNotExist:
            return Response({'error': 'Application not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

class CertificateListView(generics.ListAPIView):
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'TRADER':
            return Certificate.objects.filter(trader=user.trader_profile)
        return Certificate.objects.filter(state_id=user.state_id)

class CertificateDetailView(generics.RetrieveAPIView):
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'TRADER':
            return Certificate.objects.filter(trader=user.trader_profile)
        return Certificate.objects.filter(state_id=user.state_id)
