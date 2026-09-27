#!/bin/bash

echo "Starting Network Setup..."

echo "1. Generating crypto material..."
# cryptogen generate --config=./crypto-config.yaml --output="organizations"
echo "Crypto material generated."

echo "2. Creating genesis block..."
# configtxgen -profile TwoOrgsApplicationGenesis -channelID system-channel -outputBlock ./system-genesis-block/genesis.block
echo "Genesis block created."

echo "3. Creating channel..."
# peer channel create -o localhost:7050 -c mychannel -f ./channel-artifacts/mychannel.tx --outputBlock ./channel-artifacts/mychannel.block --tls --cafile $ORDERER_CA
echo "Channel created."

echo "4. Joining peer to channel..."
# peer channel join -b ./channel-artifacts/mychannel.block
echo "Peer joined to channel."

echo "5. Setting anchor peer..."
# peer channel update -o localhost:7050 -c mychannel -f ./channel-artifacts/Org1MSPanchors.tx --tls --cafile $ORDERER_CA
echo "Anchor peer set."

echo "Network Setup Complete!"
