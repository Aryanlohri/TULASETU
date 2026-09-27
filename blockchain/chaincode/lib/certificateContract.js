'use strict';

const { Contract } = require('fabric-contract-api');

class CertificateContract extends Contract {
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const certificates = [
            {
                certificateId: 'cert-001',
                hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
                timestamp: new Date().toISOString(),
                issuerId: 'issuer-123'
            }
        ];

        for (const cert of certificates) {
            cert.docType = 'certificateAnchor';
            await ctx.stub.putState(cert.certificateId, Buffer.from(JSON.stringify(cert)));
            console.info(`Added <--> ${cert.certificateId}`);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async anchorCertificate(ctx, certificateId, hash, timestamp, issuerId) {
        if (!certificateId || !hash || !timestamp || !issuerId) {
            throw new Error('All fields are required: certificateId, hash, timestamp, issuerId');
        }

        const exists = await this.certificateExists(ctx, certificateId);
        if (exists) {
            throw new Error(`The certificate ${certificateId} already exists`);
        }

        const cert = {
            certificateId,
            hash,
            timestamp,
            issuerId,
            docType: 'certificateAnchor'
        };

        await ctx.stub.putState(certificateId, Buffer.from(JSON.stringify(cert)));
        console.info(`Certificate ${certificateId} anchored successfully`);
        return JSON.stringify(cert);
    }

    async verifyCertificate(ctx, certificateId) {
        const certJSON = await ctx.stub.getState(certificateId);
        if (!certJSON || certJSON.length === 0) {
            throw new Error(`The certificate ${certificateId} does not exist`);
        }
        return certJSON.toString();
    }

    async getCertificateHistory(ctx, certificateId) {
        const iterator = await ctx.stub.getHistoryForKey(certificateId);
        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                jsonRes.txId = res.value.txId;
                jsonRes.timestamp = res.value.timestamp;
                jsonRes.isDelete = res.value.isDelete;
                try {
                    jsonRes.data = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.data = res.value.value.toString('utf8');
                }
                allResults.push(jsonRes);
            }
            if (res.done) {
                await iterator.close();
                return JSON.stringify(allResults);
            }
        }
    }

    async certificateExists(ctx, certificateId) {
        const certJSON = await ctx.stub.getState(certificateId);
        return certJSON && certJSON.length > 0;
    }

    async getAllCertificates(ctx) {
        const iterator = await ctx.stub.getStateByRange('', '');
        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                await iterator.close();
                return JSON.stringify(allResults);
            }
        }
    }
}

module.exports = CertificateContract;
