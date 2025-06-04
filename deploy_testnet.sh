#!/bin/bash

echo "🚀 Stellar Testnet Deploy Script"
echo "-------------------------------"

if [ -z "$1" ]; then
    echo "❌ Hata: SECRET KEY gerekli"
    echo "Kullanım: ./deploy.sh YOUR_SECRET_KEY"
    exit 1
fi

SECRET_KEY=$1

echo "1️⃣  Kontrat derleniyor..."
cargo build --target wasm32-unknown-unknown --release

if [ $? -ne 0 ]; then
    echo "❌ Derleme hatası!"
    exit 1
fi

echo "2️⃣  Testnet'e deploy ediliyor..."
WASM_PATH="target/wasm32-unknown-unknown/release/rwa_temp.wasm"

echo "📦 WASM dosyası: $WASM_PATH"
echo "🔑 Hesap: Testnet"

CONTRACT_ID=$(soroban contract deploy \
    --wasm $WASM_PATH \
    --source-account $SECRET_KEY \
    --network testnet)

if [ $? -eq 0 ]; then
    echo "✅ Deploy başarılı!"
    echo "📝 Contract ID: $CONTRACT_ID"
    
    # .env.local dosyasını güncelle
    sed -i "s/NEXT_PUBLIC_CONTRACT_ID=.*/NEXT_PUBLIC_CONTRACT_ID=$CONTRACT_ID/" ./rwa-frontend/.env.local
    
    echo "🔄 .env.local güncellendi"
    echo ""
    echo "🎉 Deployment tamamlandı!"
    echo "▶️ Frontend'i başlatmak için:"
    echo "   cd rwa-frontend"
    echo "   npm run dev"
else
    echo "❌ Deploy başarısız"
    exit 1
fi
