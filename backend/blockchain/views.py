from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from certificates.models import Certificate
from blockchain.client import blockchain_client

class VerifyCertificateView(APIView):
    """Public endpoint for certificate verification. No authentication required.
    Citizens scan a QR code or enter a certificate ID to verify validity.
    No PII is returned — only certificate metadata and blockchain proof."""
    permission_classes = [AllowAny]
    
    def get(self, request, certificate_id):
        try:
            # Support lookup by UUID or certificate_number
            try:
                import uuid
                uuid.UUID(certificate_id)
                cert = Certificate.objects.select_related('instrument').get(id=certificate_id)
            except (ValueError, Certificate.DoesNotExist):
                cert = Certificate.objects.select_related('instrument').filter(
                    certificate_number__iexact=certificate_id
                ).first()
                if not cert:
                    return Response({'error': 'Certificate not found', 'is_valid': False}, status=404)
            
            from django.utils import timezone
            is_expired = cert.valid_until and cert.valid_until < timezone.now().date()
            is_valid = cert.status == 'ACTIVE' and not is_expired
            
            # Off-chain verification data (NO PII — no trader name/address)
            response_data = {
                'certificate_number': cert.certificate_number,
                'status': 'EXPIRED' if is_expired and cert.status == 'ACTIVE' else cert.status,
                'valid_from': cert.valid_from,
                'valid_until': cert.valid_until,
                'instrument_type': cert.instrument.type if cert.instrument else 'N/A',
                'is_valid': is_valid,
                'blockchain_verified': False,
                'blockchain_tx_id': cert.blockchain_tx_id or '',
                'blockchain_hash': cert.blockchain_hash or '',
                'anchor_timestamp': None,
            }
            
            # On-chain verification via sidecar
            onchain_res = blockchain_client.verify_certificate(str(cert.id))
            if onchain_res and onchain_res.get('exists'):
                data = onchain_res.get('data', {})
                response_data['blockchain_verified'] = True
                response_data['anchor_timestamp'] = data.get('timestamp')
                
            return Response(response_data)
        except Certificate.DoesNotExist:
            return Response({'error': 'Certificate not found', 'is_valid': False}, status=404)
