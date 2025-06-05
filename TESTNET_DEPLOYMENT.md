# Stellar Testnet Deployment Guide

## Prerequisites

1. Make sure you have the following installed:
   - Node.js (v16 or later)
   - Rust and Cargo
   - Stellar CLI tools (`stellar-cli`)
   - [Freighter Wallet](https://www.freighter.app/) for browser interactions

## Step 1: Get Testnet Account and Funds

1. Create a testnet account using Stellar Laboratory or Freighter Wallet
2. Fund your testnet account using Stellar's Friendbot:
   ```bash
   curl "https://friendbot.stellar.org?addr=YOUR_PUBLIC_KEY"
   ```

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in the `rwa-frontend` directory:
   ```env
   NEXT_PUBLIC_NETWORK=testnet
   NEXT_PUBLIC_CONTRACT_ID=your_contract_id_after_deployment
   ```

## Step 3: Deploy Smart Contract to Testnet

1. Build the contract:
   ```bash
   cd rwa-temp
   cargo build --target wasm32-unknown-unknown --release
   ```

2. Deploy to testnet using soroban-cli:
   ```bash
   soroban contract deploy \
     --wasm target/wasm32-unknown-unknown/release/rwa_temp.wasm \
     --source-account YOUR_SECRET_KEY \
     --network testnet
   ```

3. Save the contract ID output for use in the frontend

## Step 4: Configure Frontend

1. Update the contract ID in your frontend:
   - Use the contract ID from step 3 in your `.env.local` file

2. Install dependencies and build:
   ```bash
   cd rwa-frontend
   npm install
   npm run build
   ```

## Step 5: Test the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Connect with Freighter Wallet:
   - Make sure Freighter is set to "Testnet"
   - Connect your testnet account through the UI

3. Test key features:
   - Asset tokenization
   - Token transfers
   - Marketplace interactions

## Common Testing Scenarios

1. **Asset Creation**
   - Create a new asset using the tokenization form
   - Verify asset appears in marketplace
   - Check transaction in Stellar Explorer

2. **Token Transfer**
   - Send tokens to another testnet account
   - Verify balances update correctly
   - Check transaction history

3. **Marketplace Interaction**
   - List assets for sale
   - Test buying process
   - Verify ownership transfer

## Troubleshooting

1. **Transaction Failures**
   - Check testnet account balance
   - Verify correct network selection in Freighter
   - Review transaction in Stellar Explorer

2. **Contract Interaction Issues**
   - Confirm contract ID in environment variables
   - Check testnet network status
   - Verify contract deployment status

## Monitoring and Debugging

1. Monitor transactions on Stellar Explorer:
   - Visit https://stellar.expert/explorer/testnet
   - Search for your contract ID or account

2. Check contract state:
   ```bash
   soroban contract invoke \
     --id YOUR_CONTRACT_ID \
     --source-account YOUR_SECRET_KEY \
     --network testnet \
     -- get_state
   ```

## Notes

- Always test thoroughly on testnet before mainnet deployment
- Keep your secret keys secure and never share them
- Monitor testnet account balance and fund as needed
- Use separate accounts for testing different scenarios

## Resources

- [Stellar Testnet Explorer](https://stellar.expert/explorer/testnet)
- [Soroban Documentation](https://soroban.stellar.org)
- [Freighter Wallet](https://www.freighter.app/)
- [Stellar Laboratory](https://laboratory.stellar.org)
