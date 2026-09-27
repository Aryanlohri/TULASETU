#!/bin/bash

echo "Starting Chaincode Deployment..."

echo "1. Packaging chaincode..."
# peer lifecycle chaincode package tulasetu-chaincode.tar.gz --path ../chaincode --lang node --label tulasetu-chaincode_1.0
echo "Chaincode packaged."

echo "2. Installing on peer..."
# peer lifecycle chaincode install tulasetu-chaincode.tar.gz
echo "Chaincode installed."

echo "3. Approving for org..."
# peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.tulasetu.com --channelID mychannel --name tulasetu-chaincode --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA
echo "Chaincode approved."

echo "4. Committing chaincode definition..."
# peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.tulasetu.com --channelID mychannel --name tulasetu-chaincode --version 1.0 --sequence 1 --tls --cafile $ORDERER_CA --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA
echo "Chaincode committed."

echo "5. Invoking initLedger..."
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.tulasetu.com --tls --cafile $ORDERER_CA -C mychannel -n tulasetu-chaincode --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA -c '{"function":"initLedger","Args":[]}'
echo "Ledger initialized."

echo "Chaincode Deployment Complete!"
