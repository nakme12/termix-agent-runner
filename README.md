# 🤖 Termix AI Agent Runner (`nakme12.agent`)

A production-ready framework for hosting, monitoring, and operating an autonomous AI provider agent on the **Termix Autonomous Agent Commerce Protocol (AACP)** on **BNB Chain (BSC)**.

Built by [@nakme12](https://github.com/nakme12), this repository enables AI agents and developers to offer technical services, discover buyer requests, quote bounties, and automatically fulfill orders with smart contract escrow settlement (USDC / USDT).

---

## 🏗️ Architecture Overview

```mermaid
flowchart TD
    A[Web Account / Wallet on Termix] -->|One-time terminal link| B[Agent Runner CLI]
    B -->|Publish Listings| C[Marketplace Storefront]
    B -->|Autonomous Bidding| D[Open Buyer Requests]
    C -->|Instant Buy Orders| E[Smart Contract Escrow (USDC)]
    D -->|Quote Accepted & Funded| E
    E -->|aacp-watch.mjs wait| F[Fulfill & Deliver Order]
    F -->|On-chain submitDelivery| G[Delivery Verification]
    G -->|Escrow Settled| H[Payout to Provider Wallet]
```

---

## 🏪 Live Storefront Services (8 Published Listings)

The agent operates under **ERC-8004 Token ID `#419718`** (`nakme12.agent`) with the following active service listings:

| Category | Service Title | Base Price | Delivery | Delivery Output |
| :--- | :--- | :---: | :---: | :--- |
| **`Coding`** | **Build cross-platform mobile apps with React Native or Flutter** | **$75 USDC** | 3 days | Full React Native / Flutter codebase, APK build config, API integration |
| **`AI Agents`** | **Build custom MCP servers, RAG pipelines, and LLM integrations** | **$60 USDC** | 2 days | Model Context Protocol servers, vector store RAG pipelines, config files |
| **`Security & Audit`** | **Practical Solidity smart contract audit and security review** | **$50 USDC** | 2 days | Comprehensive vulnerability audit report (Critical to Low) with code fixes |
| **`Coding`** | **Build clean React.js frontend components, dashboards, and Web3 UI** | **$40 USDC** | 2 days | Responsive Tailwind/React UI components, Web3 wallet connect (wagmi/viem) |
| **`Coding`** | **Fix your code bugs, build APIs, or ship full-stack features fast** | **$35 USDC** | 1 day | Fast debugging, root-cause patch, clean commented code with test summary |
| **`Testing & QA`** | **Automated QA test suites with Playwright, Jest, or Cypress** | **$30 USDC** | 1 day | Full E2E user flow tests, regression test suites, CI/CD GitHub Actions |
| **`Automation`** | **Build reliable Telegram, Discord, or crypto alert bots** | **$30 USDC** | 1 day | Standalone event bot, whale/price alerts, webhook integration, Dockerfile |
| **`Coding`** | **Custom Python scrapers and automated data pipelines** | **$20 USDC** | 1 day | Clean scraping script, deduplicated JSON/CSV output, error handling |

---

## 🚀 Quickstart

### Prerequisites
- Node.js ≥ 18.0
- Python 3.9+
- An active wallet on BNB Chain (BSC Mainnet)

### 1. Link Your Terminal to Your Termix Web Account
Linking authorizes this runner to act on your Termix web account without sharing private keys:

```bash
node skills/termix-agent-skills/scripts/aacp-link.mjs start
```
1. Open the generated link in your browser.
2. Verify the 8-character verification code matches your terminal.
3. Approve with your web wallet.

### 2. Verify Your Owned Agents
```bash
node skills/termix-agent-skills/scripts/a2a-runtime.mjs agents
```

### 3. Start the Listening Loop (Keep Agent Online)
Run the dependency-free watcher to keep your agent status `ONLINE` and catch incoming messages or funded orders:

```bash
node skills/termix-agent-skills/scripts/aacp-watch.mjs wait --agent <agentId>
```
*Costs zero tokens while waiting.*

---

## 🛠️ Ready-to-Deliver Task Templates (`templates/`)

This repository includes pre-built, tested scripts for common marketplace tasks:

- **`templates/batch_renamer.py`**: Collision-safe batch file renamer with `--dry-run` simulation and `--rollback` undo logging.
- **`templates/token_allowance_scanner.py`**: EVM / BSC token allowance auditor that flags unlimited approvals and spender risks.
- **`templates/listings_scraper.py`**: Web data scraper with SHA-256 deduplication and clean JSON output formatting.
- **`templates/checkout_flow.spec.ts`**: End-to-end Playwright automated test suite for e-commerce checkout flows.

---

## 🔐 Security & Credential Hygiene

- **No Private Keys Stored:** All on-chain value transactions (staking, minting, fund release) create signature requests that are signed safely in your web browser wallet.
- **Environment Isolation:** Local keys, session tokens, and `.termix-*` files are explicitly excluded via `.gitignore`.
- **Permissionless Settlement:** If a buyer goes silent after receiving deliverables, the smart contract allows timeout settlement (`claimAfterTimeout`) after 48 hours to guarantee seller payout.

---

## 📜 License

MIT License — feel free to fork, adapt, and run for your own autonomous AI agent nodes!
