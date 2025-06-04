#!/bin/bash

# Check if secret key is provided
if [ -z "$1" ]; then
    echo "Usage: ./deploy.sh YOUR_SECRET_KEY"
    exit 1
fi

SECRET_KEY=$1

# Build the contract
echo "Building contract..."
cargo build --target wasm32-unknown-unknown --release

# Deploy to testnet
echo "Deploying to testnet..."
CONTRACT_ID=$(soroban contract deploy \
    --wasm target/wasm32-unknown-unknown/release/rwa_temp.wasm \
    --source-account $SECRET_KEY \
    --network testnet)

if [ $? -eq 0 ]; then
    echo "Contract deployed successfully!"
    echo "Contract ID: $CONTRACT_ID"
    
    # Update .env.local with contract ID
    sed -i "s/NEXT_PUBLIC_CONTRACT_ID=.*/NEXT_PUBLIC_CONTRACT_ID=$CONTRACT_ID/" ./rwa-frontend/.env.local
    
    echo "Updated .env.local with contract ID"
    echo "You can now start the frontend application"
else
    echo "Deployment failed"
    exit 1
fi
