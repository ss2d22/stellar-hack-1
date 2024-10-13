## Overview
This project is a decentralised peer-to-peer lending platform built on the Stellar blockchain. It empowers unbanked and credit-invisible individuals to access small loans without a credit history. Borrowers can increase loan amounts and reduce interest rates as they successfully repay, while lenders can review profiles and assess the risk/reward of each loan. The platform leverages Stellar's blockchain for fast, low-cost transactions and integrates advanced authentication methods for secure interactions. 
## Key Features
### Accessible Borrowing
Users can borrow small amounts without needing a credit history, unlocking access to larger loans with lower interest rates upon repayment.
### Profitable Lending
Lenders can assess borrower profiles and make informed decisions based on repayment history and risk.
### Stellar Blockchain 
Fast, low-cost, and secure transactions for both borrowers and lenders.
### Passkey Authentication
Secure login and transaction signing using Face ID or fingerprint through Stellar's ecosystem.
## Technologies Used
- Rust with Soroban SDK: Smart contract development on Stellar.
- Stellar CLI: For contract compilation, deployment, and NPM package generation.
- NPM CLI: To publish and reuse contract packages across projects.
- Express Server: Securely submits transactions and handles smart contract interactions with passkeys.
- React and Vite: Front-end technologies used alongside the Stellar JavaScript SDK for account and transaction management.
- Passkeys and Freighter Wallet: Ensures secure user authentication and transaction signing.
## Key Stellar Features
Soroban Smart Contracts: Enables decentralised lending with transparency and security.
Fast, Low-Cost Transactions: Stellar’s consensus mechanism ensures quick, low-fee loan management.
NPM Package Integration: Simplified by Stellar CLI for easy reuse of contract logic.
Express Server for Passkey Integration: Enables secure and streamlined contract calls and transactions.
Wallet Support: Robust wallet integration with Freighter and passkeys for secure transaction management.
Usage
Lenders: Create an account, browse borrower profiles, and decide where to lend based on the risk/reward assessment.
Borrowers: Create an account, apply for a loan, and build your borrowing power by repaying loans to unlock larger amounts at lower interest rates.
Authentication: Use Face ID or fingerprint (passkey) via the Freighter Wallet for secure login and transaction signing.
