# TulaSetu Blockchain Layer

This directory contains the Hyperledger Fabric blockchain layer for the TulaSetu project. It anchors certificate verification data to a real immutable ledger.

## Architecture

- **Chaincode (`/chaincode`)**: The smart contract written in Node.js that runs on the Fabric peers. It manages the `certificateAnchor` assets in the world state. No PII is stored on-chain, only a cryptographic hash of the certificate data, the certificate ID, timestamp, and issuer ID.
- **Sidecar (`/sidecar`)**: A thin Node.js Express server that acts as a REST bridge between the Django backend and the Fabric network using `@hyperledger/fabric-gateway`.
- **Network (`/network`)**: Docker Compose and configuration files to spin up a single-organization Hyperledger Fabric test network (Peer, Orderer, CA, CouchDB).

## Data Privacy Design

The actual certificate data (names, grades, dates) remains in the traditional database (Django). Only a cryptographic hash of the certificate content along with metadata is anchored to the blockchain. This ensures privacy while maintaining verifiability.

## How to Start (Development/Mock Mode)

If you don't want to run the full Fabric network, you can run the sidecar in mock mode:

```bash
cd sidecar
npm install
npm run dev
```

The server will log `WARNING: Running in MOCK mode` and use an in-memory store that behaves exactly like the chaincode.

## How to Start (Real Fabric Network)

1. **Start the Network**:
   ```bash
   cd network
   docker-compose -f docker-compose-fabric.yml up -d
   ./scripts/setup-network.sh
   ```

2. **Deploy Chaincode**:
   ```bash
   cd network
   ./scripts/deploy-chaincode.sh
   ```

3. **Start the Sidecar**:
   ```bash
   cd sidecar
   export FABRIC_GATEWAY_ENABLED=true
   npm install
   npm start
   ```
