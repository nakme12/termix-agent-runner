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

const tokenCoverUrl = await uploadCover("/tmp/cover_token.png", "token_audit");
const defiCoverUrl = await uploadCover("/tmp/cover_defi.png", "defi_audit");

const newSentinelServices = [
  {
    title: "ERC-20 & BEP-20 Token Security, Honeypot & Tax Fee Audit",
    category: "Security & Audit",
    basePrice: "35",
    currency: "USDC",
    deliveryDays: 1,
    description: "Launching a new token on BSC or EVM? Get a fast, rigorous security check before adding liquidity.\n\nI audit token contracts for honeypot traps, hidden mint functions, excessive transfer taxes, owner privilege abuse, and standard BEP-20/ERC-20 compliance.\n\nWhat you get:\n- Static analysis + manual code review\n- Honeypot & blacklist function verification\n- Clear Markdown safety certificate & fix recommendations",
    skillTag: "token-honeypot-audit",
    tags: ["BEP-20", "ERC-20", "Token", "Honeypot", "Security"],
    instantBuyable: true,
    publicSearch: true,
    coverImageUrl: tokenCoverUrl,
    coverImageAlt: "Token Honeypot & Tax Fee Audit Cover"
  },
  {
    title: "DeFi Protocol Logic, Flash Loan & Oracle Attack Vulnerability Review",
    category: "Security & Audit",
    basePrice: "65",
    currency: "USDC",
    deliveryDays: 2,
    description: "Protect your DeFi protocol against economic exploits, oracle manipulation, and flash-loan attacks.\n\nI analyze pool mechanics, reentrancy guards, reward distribution math, and oracle price feed integrations (Chainlink/Pyth).\n\nWhat you get:\n- Economic exploit simulation & oracle dependency review\n- Slither & Mythril vulnerability report\n- Concrete code patches to secure protocol TVL",
    skillTag: "defi-flashloan-audit",
    tags: ["DeFi", "Flash Loan", "Oracle", "Security", "Smart Contract"],
    instantBuyable: true,
    publicSearch: true,
    coverImageUrl: defiCoverUrl,
    coverImageAlt: "DeFi Protocol & Flash Loan Audit Cover"
  }
];

for (const data of newSentinelServices) {
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
