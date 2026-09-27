const CertificateContract = require('../lib/certificateContract');

describe('CertificateContract', () => {
    let contract;
    let ctx;
    let mockStub;

    beforeEach(() => {
        contract = new CertificateContract();
        mockStub = {
            putState: jest.fn(),
            getState: jest.fn(),
            getHistoryForKey: jest.fn(),
            getStateByRange: jest.fn()
        };
        ctx = {
            stub: mockStub
        };
    });

    describe('anchorCertificate', () => {
        it('should anchor a certificate successfully', async () => {
            mockStub.getState.mockResolvedValue(null);
            
            const certId = 'cert-1';
            const hash = 'abc';
            const timestamp = '2023-01-01T00:00:00Z';
            const issuerId = 'issuer-1';
            
            const result = await contract.anchorCertificate(ctx, certId, hash, timestamp, issuerId);
            expect(mockStub.putState).toHaveBeenCalledTimes(1);
            expect(JSON.parse(result).certificateId).toEqual(certId);
        });

        it('should reject duplicates', async () => {
            mockStub.getState.mockResolvedValue(Buffer.from('existing data'));
            
            await expect(contract.anchorCertificate(ctx, 'cert-1', 'abc', 'time', 'iss'))
                .rejects.toThrow('The certificate cert-1 already exists');
        });
        
        it('should validate inputs', async () => {
            await expect(contract.anchorCertificate(ctx, '', 'abc', 'time', 'iss'))
                .rejects.toThrow('All fields are required: certificateId, hash, timestamp, issuerId');
        });
    });

    describe('verifyCertificate', () => {
        it('should return correct data if exists', async () => {
            const cert = { certificateId: 'cert-1', hash: 'abc' };
            mockStub.getState.mockResolvedValue(Buffer.from(JSON.stringify(cert)));
            
            const result = await contract.verifyCertificate(ctx, 'cert-1');
            expect(JSON.parse(result).hash).toEqual('abc');
        });

        it('should throw for non-existent certificate', async () => {
            mockStub.getState.mockResolvedValue(null);
            
            await expect(contract.verifyCertificate(ctx, 'cert-invalid'))
                .rejects.toThrow('The certificate cert-invalid does not exist');
        });
    });
});
