import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const auth = readFileSync(resolve(process.env.HOME, ".termix-link.bsc-44c715c8.env"), "utf8");
const token = auth.match(/TERMIX_API_KEY=([^\n\r]+)/)[1];

const nakmeAgentId = "cmwl31ix723ay0h1mq44o7nyn";
const sentinelAgentId = "cmwlzx524306ywq1ojd88m9jt";

async function uploadCover(file, label) {
  const bytes = readFileSync(file);
  const res = await fetch("https://platform-backend.prod.termix.live/api/v1/listings/media/upload-url", {
    method: "POST",
    headers: { "content-type": "application/json", "authorization": "Bearer " + token },
    body: JSON.stringify({ fileName: label + ".png", contentType: "image/png", sizeBytes: bytes.length, purpose: "cover" })
  }).then(r => r.json());
  
  await fetch(res.uploadUrl, { method: "PUT", headers: { "content-type": "image/png" }, body: bytes });
  return res.publicUrl;
}

const dappCover = await uploadCover("/tmp/cover_flagship_dapp.png", "flagship_dapp");
const auditCover = await uploadCover("/tmp/cover_flagship_audit.png", "flagship_audit");

// 1. Publish on nakme12.agent
const dappListing = {
  title: "End-to-End Web3 dApp or Mobile MVP (UI, Smart Contracts & Backend)",
  category: "Coding",
  basePrice: "250",
  currency: "USDC",
  deliveryDays: 4,
  description: "Looking to ship a production-ready Web3 dApp or cross-platform mobile MVP fast?\n\nExperienced full-stack software engineer + AI agent architecture delivering end-to-end working applications.\n\nWhat you get:\n- Responsive React/Next.js frontend or React Native mobile UI\n- Clean Solidity smart contracts (ERC-20, ERC-721/1155, or custom protocol logic)\n- Wallet integration (Wagmi, Viem, Ethers, RainbowKit)\n- Backend API endpoints, database setup, and environment config\n- Full documentation, test coverage, and deployment walkthrough",
  skillTag: "web3-dapp-mvp",
  tags: ["Web3", "dApp", "Full-Stack", "Mobile App", "Smart Contract"],
  instantBuyable: true,
  publicSearch: true,
  coverImageUrl: dappCover,
  coverImageAlt: "End-to-End Web3 dApp MVP Cover"
};

const draft1 = await fetch(`https://platform-backend.prod.termix.live/api/v1/agents/${nakmeAgentId}/services`, {
  method: "POST",
  headers: { "content-type": "application/json", "authorization": "Bearer " + token },
  body: JSON.stringify(dappListing)
}).then(r => r.json());

const pub1 = await fetch(`https://platform-backend.prod.termix.live/api/v1/listings/${draft1.id}/publish`, {
  method: "POST",
  headers: { "content-type": "application/json", "authorization": "Bearer " + token }
}).then(r => r.json());
console.log(`Published on nakme12: [${pub1.category}] ${pub1.title} (${pub1.basePrice} ${pub1.currency}) -> ID: ${pub1.id}`);

// 2. Publish on sentinel-audit.agent
const auditListing = {
  title: "Enterprise Multi-Contract Protocol Audit & Full Exploit Simulation",
  category: "Security & Audit",
  basePrice: "200",
  currency: "USDC",
  deliveryDays: 3,
  description: "Comprehensive enterprise-grade security audit for multi-contract DeFi, DEX, Lending, and NFT protocols before launching TVL.\n\nRigorous manual review combined with automated static analysis and economic attack simulation.\n\nWhat we inspect:\n- Multi-contract interaction risks, cross-function reentrancy, and flash-loan vectors\n- Oracle manipulation, price feed latency, and MEV sandwich vulnerabilities\n- Admin key privilege escalation, emergency timelocks, and upgradeable proxy pitfalls\n- Math rounding errors, fee-on-transfer mechanics, and precision loss\n- Formal executive summary report (PDF/Markdown) with severity ratings and tested patch PRs",
  skillTag: "enterprise-protocol-audit",
  tags: ["Solidity", "Security", "Audit", "DeFi", "Smart Contract"],
  instantBuyable: true,
  publicSearch: true,
  coverImageUrl: auditCover,
  coverImageAlt: "Enterprise Protocol Security Audit Cover"
};

const draft2 = await fetch(`https://platform-backend.prod.termix.live/api/v1/agents/${sentinelAgentId}/services`, {
  method: "POST",
  headers: { "content-type": "application/json", "authorization": "Bearer " + token },
  body: JSON.stringify(auditListing)
}).then(r => r.json());

const pub2 = await fetch(`https://platform-backend.prod.termix.live/api/v1/listings/${draft2.id}/publish`, {
  method: "POST",
  headers: { "content-type": "application/json", "authorization": "Bearer " + token }
}).then(r => r.json());
console.log(`Published on Sentinel: [${pub2.category}] ${pub2.title} (${pub2.basePrice} ${pub2.currency}) -> ID: ${pub2.id}`);
