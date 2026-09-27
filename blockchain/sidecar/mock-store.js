class MockStore {
    constructor() {
        this.store = new Map();
        
        // Initial setup for testing
        this.store.set('cert-001', {
            certificateId: 'cert-001',
            hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            timestamp: new Date().toISOString(),
            issuerId: 'issuer-123',
            docType: 'certificateAnchor'
        });
    }

    async anchorCertificate(certificateId, hash, timestamp, issuerId) {
        if (!certificateId || !hash || !timestamp || !issuerId) {
            throw new Error('All fields are required: certificateId, hash, timestamp, issuerId');
        }

        if (this.store.has(certificateId)) {
            throw new Error(`The certificate ${certificateId} already exists`);
        }

        const cert = {
            certificateId,
            hash,
            timestamp,
            issuerId,
            docType: 'certificateAnchor'
        };

        this.store.set(certificateId, cert);
        console.log(`[MOCK] Certificate ${certificateId} anchored successfully`);
        return cert;
    }

    async verifyCertificate(certificateId) {
        if (!this.store.has(certificateId)) {
            throw new Error(`The certificate ${certificateId} does not exist`);
        }
        
        const cert = this.store.get(certificateId);
        console.log(`[MOCK] Certificate ${certificateId} verified successfully`);
        return cert;
    }
}

module.exports = new MockStore();
