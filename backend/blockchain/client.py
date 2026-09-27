import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class BlockchainClient:
    def __init__(self):
        self.base_url = settings.BLOCKCHAIN_SIDECAR_URL
        self.enabled = settings.BLOCKCHAIN_ENABLED
    
    def anchor_certificate(self, certificate_id, cert_hash, timestamp, issuer_id):
        if not self.enabled:
            logger.warning('Blockchain disabled, skipping anchor')
            return {'tx_id': 'disabled', 'status': 'skipped'}
        try:
            response = requests.post(f'{self.base_url}/anchor', json={
                'certificateId': str(certificate_id),
                'hash': cert_hash,
                'timestamp': timestamp,
                'issuerId': str(issuer_id)
            }, timeout=10)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f'Blockchain anchor failed: {e}')
            return {'tx_id': 'pending', 'status': 'failed', 'error': str(e)}
    
    def verify_certificate(self, certificate_id):
        if not self.enabled:
            return None
        try:
            response = requests.get(f'{self.base_url}/verify/{certificate_id}', timeout=10)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f'Blockchain verify failed: {e}')
            return None

blockchain_client = BlockchainClient()
