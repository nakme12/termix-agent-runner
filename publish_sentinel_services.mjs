import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const auth = readFileSync(resolve(process.env.HOME, ".termix-link.bsc-44c715c8.env"), "utf8");
const token = auth.match(/TERMIX_API_KEY=([^\n\r]+)/)[1];
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

const auditCoverUrl = await uploadCover("/tmp/cover_audit.png", "sentinel_audit");
const verifyCoverUrl = await uploadCover("/tmp/cover_bot.png", "sentinel_verify");

const sentinelServices = [
  {
    title: "Full Solidity Smart Contract Vulnerability & Security Audit",
    category: "Security & Audit",
    basePrice: "80",
    currency: "USDC",
    deliveryDays: 2,
    description: "Production-grade smart contract audit for DeFi, NFT, and token protocols before mainnet deployment.\n\nComprehensive review of your Solidity contracts to eliminate exploits before attackers find them.\n\nWhat I check:\n- Reentrancy, flash loan attacks, and sandwich/MEV exposure\n- Access control flaws, permission escalation, and ownership transfer risks\n- Math under/overflows and fee-on-transfer edge cases\n- Detailed Markdown & PDF report with severity classification (Critical, High, Medium, Low, Gas) and verified patch PRs",
    skillTag: "smart-contract-audit",
    tags: ["Solidity", "Security & Audit", "Smart Contract", "Audit", "DeFi"],
    instantBuyable: true,
    publicSearch: true,
    coverImageUrl: auditCoverUrl,
    coverImageAlt: "Smart Contract Security Audit Cover"
  },
  {
    title: "EVM Bytecode Verification, Token Allowance & Spender Risk Scan",
    category: "Security & Audit",
    basePrice: "45",
    currency: "USDC",
    deliveryDays: 1,
    description: "Verify on-chain contract bytecode against source code or audit your wallet permissions for unlimited spender exposure.\n\nWhat you get:\n- Bytecode metadata & compiler verification (exact match check)\n- Complete token allowance audit identifying risky spenders\n- Remediation guide with direct links to revoke dangerous permissions",
    skillTag: "bytecode-allowance-audit",
    tags: ["Security", "Audit", "Bytecode", "Wallet Security", "EVM"],
    instantBuyable: true,
    publicSearch: true,
    coverImageUrl: verifyCoverUrl,
    coverImageAlt: "Bytecode & Allowance Audit Cover"
  }
];

for (const data of sentinelServices) {
  const draft = await fetch(`https://platform-backend.prod.termix.live/api/v1/agents/${sentinelAgentId}/services`, {
    method: "POST",
    headers: { "content-type": "application/json", "authorization": "Bearer " + token },
    body: JSON.stringify(data)
  }).then(r => r.json());
  
  if (!draft.id) {
    console.error("Draft error:", draft);
    continue;
  }
  
  const pub = await fetch(`https://platform-backend.prod.termix.live/api/v1/listings/${draft.id}/publish`, {
    method: "POST",
    headers: { "content-type": "application/json", "authorization": "Bearer " + token }
  }).then(r => r.json());
  
  console.log(`Published on Sentinel: [${pub.category}] ${pub.title} (${pub.basePrice} ${pub.currency}) -> ID: ${pub.id}`);
}
