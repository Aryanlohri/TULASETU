const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const fabricConnection = require('./fabric-connection');
const mockStore = require('./mock-store');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const USE_MOCK = process.env.FABRIC_GATEWAY_ENABLED !== 'true';

let contract;

async function init() {
    if (USE_MOCK) {
        console.warn('========================================================================');
        console.warn('WARNING: Running in MOCK mode - not connected to Fabric ledger');
        console.warn('========================================================================');
        contract = mockStore;
    } else {
        try {
            await fabricConnection.connect();
            contract = fabricConnection.getContract();
            console.log('Connected to Fabric Gateway successfully');
        } catch (error) {
            console.error('Failed to connect to Fabric, falling back to mock mode:', error);
            console.warn('========================================================================');
            console.warn('WARNING: Running in MOCK mode - not connected to Fabric ledger');
            console.warn('========================================================================');
            contract = mockStore;
        }
    }
}

app.post('/anchor', async (req, res) => {
    const { certificateId, hash, timestamp, issuerId } = req.body;
    
    if (!certificateId || !hash || !timestamp || !issuerId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        let result;
        if (USE_MOCK || contract === mockStore) {
            result = await contract.anchorCertificate(certificateId, hash, timestamp, issuerId);
        } else {
            // Fabric submit transaction
            const utf8Decoder = new TextDecoder();
            const txResult = await contract.submitTransaction(
                'anchorCertificate',
                certificateId, hash, timestamp, issuerId
            );
            result = JSON.parse(utf8Decoder.decode(txResult));
        }

        res.json({ success: true, txId: `tx-${Date.now()}`, certificateId: result.certificateId || certificateId });
    } catch (error) {
        console.error('Error anchoring certificate:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/verify/:certificateId', async (req, res) => {
    const { certificateId } = req.params;

    try {
        let result;
        if (USE_MOCK || contract === mockStore) {
            result = await contract.verifyCertificate(certificateId);
        } else {
            const utf8Decoder = new TextDecoder();
            const evaluateResult = await contract.evaluateTransaction('verifyCertificate', certificateId);
            result = JSON.parse(utf8Decoder.decode(evaluateResult));
        }

        res.json({ exists: true, data: result });
    } catch (error) {
        if (error.message.includes('does not exist')) {
            res.json({ exists: false });
        } else {
            console.error('Error verifying certificate:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        fabric: (USE_MOCK || contract === mockStore) ? 'disconnected' : 'connected',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3001;

init().then(() => {
    app.listen(PORT, () => {
        console.log(`Sidecar server listening on port ${PORT}`);
    });
});
