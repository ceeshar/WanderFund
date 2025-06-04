# 🌟 TravelToken Experiences Hub

A specialized tourism & hospitality tokenization platform built on the Stellar blockchain. This platform enables the tokenization and investment in boutique hotels, eco-tourism facilities, and unique travel experiences.

![Platform](https://img.shields.io/badge/Platform-TravelToken_Experiences-blue)
![Blockchain](https://img.shields.io/badge/Blockchain-Stellar-brightgreen)
![Framework](https://img.shields.io/badge/Framework-Next.js_15-black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 **Project Overview**

TravelToken Experiences Hub revolutionizes tourism investment by tokenizing unique travel assets on the Stellar blockchain. The platform connects eco-conscious investors with sustainable tourism opportunities, enabling fractional ownership in boutique hotels, eco-lodges, and curated travel experiences.

### **🌟 Key Features**

#### **For Tourism Business Owners**
- 🏨 **Property Tokenization** - Simplified process for tourism asset tokenization
- 💰 **Funding Access** - Early stage funding from global investors
- 📊 **Performance Tracking** - Monitor bookings and revenue metrics
- 🌿 **Sustainability Score** - Showcase eco-friendly initiatives

#### **For Investors**
- 💼 **Experience Portfolio** - Invest in unique travel experiences
- 🎯 **Curated Opportunities** - Premium tourism investment listings
- 🏆 **Exclusive Benefits** - Priority booking rights and special perks
- 📈 **Value Tracking** - Monitor investment performance

#### **Platform Features**
- 🌍 **Eco-Tourism Focus** - Emphasis on sustainable tourism projects
- ⚡ **Stellar Integration** - Efficient blockchain transactions
- 🛡️ **Compliance Tools** - Tourism license validation
- 📱 **Modern Interface** - Beautiful, responsive design

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ installed
- [Freighter Wallet](https://freighter.app/) browser extension
- Access to Stellar Testnet for development

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd rwa-investment-platform

# Navigate to frontend directory
cd rwa-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to access the platform.

### **Production Build**

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🏗️ **Project Architecture**

### **Technology Stack**

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 15 + TypeScript | Modern web application |
| **Styling** | Tailwind CSS + shadcn/ui | Beautiful UI components |
| **State Management** | Zustand | Efficient state handling |
| **Blockchain** | Stellar SDK | Token management |
| **Wallet** | Freighter API | Secure transactions |
| **Theme** | Custom Tourism Design | Travel-focused UI |

### **Directory Structure**

```
rwa-frontend/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Dashboard (main page)
│   ├── marketplace/       # Asset marketplace
│   ├── tokenize/          # Asset tokenization wizard
│   ├── transfer/          # Token transfer interface
│   ├── dashboard/         # Dashboard redirect
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   └── layout/            # Layout components
├── lib/
│   ├── types.ts           # TypeScript definitions
│   ├── stellar.ts         # Stellar SDK utilities
│   ├── contract.ts        # Smart contract client
│   └── utils.ts           # Helper functions
├── stores/
│   ├── wallet.ts          # Wallet state management
│   └── contract.ts        # Contract state management
└── public/                # Static assets
```

---

## 💼 **Smart Contract Integration**

### **Contract Details**
- **Network**: Stellar Testnet
- **Asset Types**: 
  - Boutique Hotel Tokens (BHT)
  - Eco-Lodge Tokens (ELT)
  - Experience Tokens (EXT)

### **Supported Operations**

| Operation | Description | Status |
|-----------|-------------|--------|
| `get_balance` | Check token holdings | ✅ Implemented |
| `get_property_details` | View tourism asset info | ✅ Implemented |
| `transfer` | Transfer ownership rights | ✅ Implemented |
| `verify_license` | Check tourism licenses | ✅ Implemented |
| `book_stay` | Redeem accommodation | 🔄 In Progress |
| `list_experiences` | View available experiences | 🔄 In Progress |

### **Asset Metadata Structure**

```typescript
interface AssetMetadata {
  name: string;              // "Luxury Apartment NYC"
  symbol: string;            // "LAPT"  
  asset_type: string;        // "real_estate"
  description: string;       // Asset description
  valuation: string;         // Current USD value
  last_valuation_date: number; // Unix timestamp
  legal_doc_hash: string;    // Property deed hash
}
```

---

## 🎨 **Design System**

### **Color Palette**
```css
Primary: #40E0D0    /* Turquoise - Ocean vibes */
Secondary: #F5F5DC  /* Beige - Warm welcome */
Accent: #D2691E     /* Earth - Premium feel */
Background: #FFFFFF /* Clean spaces */
Text: #2C3E50      /* Professional */
```

---

## 📈 **Asset Types Supported**

### **🏨 Boutique Hotels**
- **Minimum Value**: $250,000
- **Features**: Unique character, prime locations
- **Example**: Mountain View Resort - $1.2M luxury eco-lodge

### **🌿 Eco-Tourism Facilities**
- **Minimum Value**: $100,000
- **Features**: Sustainable operations, nature integration
- **Example**: Rainforest Retreat - $800K eco-resort

### **🎯 Travel Experiences**
- **Minimum Value**: $50,000
- **Features**: Curated tours, cultural immersion
- **Example**: Safari Adventure Package - $150K annual operation

---

## 🚨 **Known Limitations**

### **Current Development Constraints**
- **Simulated Compliance**: Recipient validation is mocked for development
- **Static Asset Data**: Metadata and balances are not live from blockchain
- **Network Warnings**: Stellar SDK warnings in web environment (expected)
- **Manual Network Switching**: Users must switch networks in Freighter manually

### **Production Readiness Checklist**
- [ ] Connect to live smart contracts
- [ ] Implement real compliance verification
- [ ] Add comprehensive error handling
- [ ] Implement proper testing suite
- [ ] Security audit and penetration testing
- [ ] Legal compliance review

---

## 🤝 **Contributing**

We welcome contributions to the RWA Investment Platform! Here's how to get started:

### **Development Workflow**

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow code style**: Use existing TypeScript and component patterns
4. **Test thoroughly**: Ensure no regressions in existing functionality
5. **Submit pull request**: Include clear description of changes

### **Code Style Guidelines**

- **TypeScript**: Strict mode with comprehensive type definitions
- **Components**: Functional components with proper prop typing
- **Styling**: Tailwind CSS classes with shadcn/ui patterns
- **State Management**: Zustand stores with typed interfaces
- **Naming**: Descriptive variable and function names

### **Contribution Areas**

- 🐛 **Bug Fixes**: Address issues and improve stability
- ✨ **New Features**: Implement roadmap items or propose new functionality
- 📚 **Documentation**: Improve guides and API documentation
- 🎨 **UI/UX**: Enhance design and user experience
- 🔧 **Performance**: Optimize loading times and responsiveness

---

## 📚 **Resources**

### **Documentation**
- [Stellar Documentation](https://developers.stellar.org/)
- [Freighter Wallet](https://freighter.app/)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### **Community**
- [Stellar Discord](https://discord.gg/stellar)
- [Next.js Discord](https://discord.gg/nextjs)
- [GitHub Issues](link-to-issues)

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 🙏 **Acknowledgments**

- **Stellar Development Foundation** for blockchain infrastructure
- **shadcn** for exceptional UI component library
- **Vercel** for Next.js framework and deployment platform
- **Tailwind Labs** for utility-first CSS framework

---

## 📞 **Support**

### **Getting Help**
- 📖 **Documentation**: Check this README and inline code comments
- 🐛 **Issues**: Report bugs via GitHub Issues
- 💬 **Community**: Join our Discord for discussions
- 📧 **Direct Contact**: [Your contact information]

### **Common Issues**

| Issue | Solution |
|-------|----------|
| Wallet not connecting | Ensure Freighter extension is installed and enabled |
| Build warnings | Stellar SDK warnings are expected in web environments |
| Network switching | Manually switch networks in Freighter extension |
| Transaction failures | Check address format and compliance status |

---

<div align="center">

**Built with ❤️ for the future of tokenized real world assets**

[Website](link) • [Documentation](link) • [Discord](link) • [Twitter](link)

</div>