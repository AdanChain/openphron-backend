# 🚀 OpenPhron Backend

> Where AI meets blockchain, and smart contracts get a conversational upgrade.

OpenPhron is a powerful backend platform that bridges the gap between AI oracles and smart contract creation. Think of it as your AI-powered assistant for building blockchain contracts, but with a marketplace twist where you can discover, subscribe to, and leverage various AI oracles.

## ✨ What's This All About?

Ever wished you could just *talk* to an AI and have it generate smart contracts for you? That's exactly what OpenPhron does. It's not just another blockchain tool—it's a complete ecosystem where:

- 🤖 **AI Oracles** live in a marketplace, ready to be discovered and subscribed to
- 💬 **Conversational Contract Creation** lets you build smart contracts through natural language
- 🔗 **Blockchain Integration** seamlessly connects with Arbitrum Sepolia
- 🔑 **API Management** gives you full control over your integrations
- 📊 **Token-Based Subscriptions** power the oracle economy

## 🎯 Key Features

### AI Oracle Marketplace
- Browse and discover AI oracles created by the community
- Create your own custom oracles
- Subscribe to oracles with token-based access
- Manage questions and interactions with oracles

### Smart Contract Workflow
- **Chat-based contract creation**: Start with an idea, refine through conversation
- **AI-powered code generation**: Uses OpenAI and Google Gemini to generate contract code
- **Workflow management**: Organize and track your contract development process
- **Contract sharing**: Share your contracts publicly or with specific access tokens
- **Deployment tracking**: Keep tabs on your deployed contracts

### Blockchain Integration
- Real-time event listening from blockchain contracts
- Oracle marketplace contract integration
- Signature verification for secure transactions
- Support for Arbitrum Sepolia network

### API & Access Control
- API key generation and management
- Token-based subscription system
- Daily token limits and subscription periods
- Admin controls for platform management

## 🛠️ Tech Stack

Built with modern TypeScript and a solid architecture:

- **Runtime**: Node.js with Express
- **Language**: TypeScript (strict mode enabled)
- **Database**: MongoDB with Mongoose
- **Blockchain**: Ethers.js v5.7.2
- **AI Integration**: 
  - OpenAI API
  - Google Gemini AI
- **Other**: CORS, crypto-js, node-cron, UUID

## 📦 Installation

Getting started is straightforward:

```bash
# Clone the repository
git clone https://github.com/idealbridgex/openphron-backend

# Navigate to the project
cd openphron-backend

# Install dependencies
npm install
```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

### Required Variables

```env
# Database
DBNAME=your-db-name

# AI Services
GEMINI_KEY=your-gemini-api-key
# Get your key at: https://ai.google.dev/gemini-api/docs/api-key

# Blockchain
RPC_URL=your-arbitrum-sepolia-rpc-url

# Server
PORT=9001

# Token System
TOKEN_LIMIT=your-daily-token-limit
DAY_LIMIT=subscription-period-in-days

# OpenPhron Integration
OPENPHRON_UPDATEDATA_URL=your-update-data-url
OPENPHRON_UPDATEFEEDS_URL=your-update-feeds-url
```

### Optional: Proxy Configuration

If you need to use a proxy:

```env
PROXY_ENABLE=true
PROXY_HOST=your-proxy-host
PROXY_PASS=your-proxy-password
PROXY_USER=your-proxy-username
```

## 🚦 Running the Application

### Development Mode

```bash
npm run dev
```

This starts the server with `ts-node` for hot reloading during development.

### Production Build

```bash
# Build TypeScript to JavaScript
npm run build

# Start the production server
npm start
```

### Testing

```bash
npm test
```

## 📡 API Endpoints

The API is organized into several main sections:

### Contracts
- `GET /api/contract` - Get user contracts
- `POST /api/contract` - Create new contract (init message)
- `POST /api/contract/message` - Send message to contract
- `POST /api/contract/share` - Share a contract
- `GET /api/contract/shared/:access_token` - Get shared contract
- `POST /api/contract/deployed` - Add deployed contract
- `GET /api/contract/deployed` - Get deployed contracts
- `DELETE /api/contract/:_id` - Delete contract

### Workflows
- `GET /api/workflow` - Get user workflows
- `GET /api/workflow/:id` - Get workflow by ID

### Oracles
- `GET /api/oracle` - List all oracles
- `GET /api/oracle/:id` - Get oracle by ID
- `POST /api/oracle` - Create new oracle
- `POST /api/oracle/rename` - Rename oracle
- `DELETE /api/oracle/:id` - Delete oracle

### Questions
- `GET /api/question` - List questions
- `GET /api/question/:id` - Get question by ID
- `GET /api/question/oracle/:oracleId` - Get questions for oracle
- `POST /api/question` - Create question
- `POST /api/question/update` - Update question

### Subscriptions
- `POST /api/subscribe` - Subscribe to oracle
- `GET /api/subscription/user` - Get user subscriptions
- `GET /api/subscription/oracle/:oracleId` - Get subscriptions for oracle

### Tokens
- `GET /api/token` - Get user tokens
- `POST /api/token/reduce` - Reduce tokens
- `POST /api/token/subscribe` - Subscribe tokens

### API Keys
- `GET /api/key` - Get API keys
- `POST /api/key` - Create API key
- `DELETE /api/key/:apiKey` - Delete API key

### Admin
- `/api/admin/*` - Admin routes (requires admin verification)

## 🔐 Security

- **Signature Verification**: Most endpoints require wallet signature verification via `verifySignatureMiddleware`
- **Admin Protection**: Admin routes are protected with `verifyAdmin` middleware
- **CORS**: Configured to allow cross-origin requests (adjust in production)

## 🏗️ Project Structure

```
src/
├── AImarketplace/      # AI Oracle marketplace logic
│   ├── blockchain/     # Blockchain contract integration
│   ├── controllers/    # Oracle, question, subscription controllers
│   ├── models/         # Database models
│   ├── service/        # Business logic
│   └── utils/          # Event handling utilities
├── api/                # API key management
├── contract/           # Smart contract creation & workflow
│   ├── config/         # Workflow and AI pattern configurations
│   ├── controllers/    # Contract, workflow, cost controllers
│   ├── data-access/    # Database access layer
│   ├── models/         # Contract models
│   ├── services/       # Contract generation services
│   └── utils/          # AI integration (OpenAI, Gemini)
├── admin/              # Admin functionality
├── dbConnect/          # MongoDB connection
├── middleware/         # Auth and verification middleware
└── routers/            # Route definitions
```

## 🤝 Contributing

Contributions are welcome! This project is licensed under the Apache License 2.0. Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with ❤️ for the blockchain and AI community. Special thanks to all the open-source libraries that make this possible.

---

**Note**: This is a backend service. You'll need a frontend application to interact with it, or use the API endpoints directly. Make sure to configure all environment variables before running the server.

Questions? Issues? Feel free to open an issue on GitHub!
