from abc import ABC, abstractmethod

class IdentityProvider(ABC):
    @abstractmethod
    def verify_identity(self, aadhaar_number: str) -> dict:
        pass
    
    @abstractmethod
    def fetch_document(self, doc_id: str) -> dict:
        pass
