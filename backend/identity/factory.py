import os
from identity.mock_aadhaar import MockAadhaarProvider

def get_identity_provider():
    provider_name = os.getenv('IDENTITY_PROVIDER', 'mock_aadhaar')
    if provider_name == 'mock_aadhaar':
        return MockAadhaarProvider()
    return MockAadhaarProvider()
