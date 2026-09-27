const fs = require('fs');
const path = require('path');
const grpc = require('@grpc/grpc-js');
const { connect, signers } = require('@hyperledger/fabric-gateway');

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'tulasetu-chaincode';

const mspId = process.env.MSP_ID || 'Org1MSP';
const cryptoPath = process.env.CRYPTO_PATH || path.resolve(__dirname, '..', 'network', 'organizations', 'peerOrganizations', 'org1.tulasetu.com');
const keyDirectoryPath = path.resolve(cryptoPath, 'users', 'User1@org1.tulasetu.com', 'msp', 'keystore');
const certPath = path.resolve(cryptoPath, 'users', 'User1@org1.tulasetu.com', 'msp', 'signcerts', 'cert.pem');
const tlsCertPath = path.resolve(cryptoPath, 'peers', 'peer0.org1.tulasetu.com', 'tls', 'ca.crt');
const peerEndpoint = process.env.PEER_ENDPOINT || 'localhost:7051';
const peerHostAlias = process.env.PEER_HOST_ALIAS || 'peer0.org1.tulasetu.com';

let gateway;
let network;
let contract;

async function setupGateway() {
    const credentials = await fs.promises.readFile(certPath);
    const identity = { mspId, credentials };
    
    const keyFiles = await fs.promises.readdir(keyDirectoryPath);
    const keyPath = path.resolve(keyDirectoryPath, keyFiles[0]);
    const privateKeyPem = await fs.promises.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    const signer = signers.newPrivateKeySigner(privateKey);

    const tlsRootCert = await fs.promises.readFile(tlsCertPath);
    const client = new grpc.Client(peerEndpoint, grpc.credentials.createSsl(tlsRootCert), {
        'grpc.ssl_target_name_override': peerHostAlias,
    });

    gateway = connect({
        client,
        identity,
        signer,
        evaluateOptions: () => {
            return { deadline: Date.now() + 5000 };
        },
        endorseOptions: () => {
            return { deadline: Date.now() + 15000 };
        },
        submitOptions: () => {
            return { deadline: Date.now() + 5000 };
        },
        commitStatusOptions: () => {
            return { deadline: Date.now() + 60000 };
        },
    });

    network = gateway.getNetwork(channelName);
    contract = network.getContract(chaincodeName);
}

module.exports = {
    connect: setupGateway,
    getContract: () => contract,
    disconnect: () => { if (gateway) gateway.close(); }
};
