from identity.base import IdentityProvider

class MockAadhaarProvider(IdentityProvider):
    def verify_identity(self, aadhaar_number: str) -> dict:
        if len(str(aadhaar_number)) == 12:
            return {
                'status': 'success',
                'provider': 'aadhaar_mock',
                'data': {
                    'name': 'Mock Verified User',
                    'address': 'Mock Address, India',
                    'verified': True
                }
            }
        return {'status': 'failed', 'error': 'Invalid Aadhaar format'}

    def fetch_document(self, doc_id: str) -> dict:
        return {'status': 'success', 'url': f'mock_url_{doc_id}'}
