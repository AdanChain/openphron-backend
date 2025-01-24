# Project Title
   OpenPhron
## Description

OpenPhron Marketplace  provides a platform for users to explore various AI oracles and create smart contracts based on their ideas. The application consists of an AI Library for browsing oracles and a Workflow section for contract creation.

## Features

- **OracleList**
- **Oracle subscription**
- **Smart Contract Creation**

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/idealbridgex/openphron-backend
   ```

2. Install dependencies:
   
   ```bash
   npm install
   ```
   

3. Set up environment variables:
   
   -**DBNAME** : your-db-name.
   
   -**GEMINI_KEY** : your-GEMINI_KEY.
   https://ai.google.dev/gemini-api/docs/api-key
   
   -**PROXY_ENABLE** : if you want to use proxy, you must set true PROXY_ENABLE.

   --**PROXY_HOST** : your-proxy-host.
   
   --**PROXY_PASS** : your-proxy-pass.
   
   --**PROXY_USER** : your-prosy-user.
   
   -**RPC_URL**: Arbitrum Sepolia RPC.

   -**PORT**: 9001.

   -**TOKEN_LIMIT**: daily token limit.

   -**DAY_LIMIT**: subscription period.
   

5. Run the application:

   Start the Server
   ```bash
   npm run dev
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
