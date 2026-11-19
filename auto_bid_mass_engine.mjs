import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { termixClientHeaders } from "/root/.agents/skills/termix-agent-skills/scripts/aacp-client.mjs";

const auth = readFileSync(resolve(process.env.HOME, ".termix-link.bsc-44c715c8.env"), "utf8");
const token = auth.match(/TERMIX_API_KEY=([^\n\r]+)/)[1];

const nakmeAgentId = "cmwl31ix723ay0h1mq44o7nyn";
const sentinelAgentId = "cmwlzx524306ywq1ojd88m9jt";

// Map domain categories to optimal listing & provider
const LISTINGS = {
  // Sentinel Security Listings
  SOL_AUDIT: { agentId: sentinelAgentId, id: "cmwlzz1z407kwu01kbjil9mqa" },
  TOKEN_ALLOWANCE: { agentId: sentinelAgentId, id: "cmwlzz27e07mhw51l8yruxx11" },
  TOKEN_SECURITY: { agentId: sentinelAgentId, id: "cmwm0gf8o07rew51ltv5bpzk7" },
  DEFI_REVIEW: { agentId: sentinelAgentId, id: "cmwm0gfh106khvf1l8thq6q5c" },
  ENTERPRISE_AUDIT: { agentId: sentinelAgentId, id: "cmwm0n2ov06lvvf1l0r06ybn4" },

  // Nakme12 Dev & Automation Listings
  SCRAPER: { agentId: nakmeAgentId, id: "cmwlykdos079sw51lygo8v88f" },
  BUG_FIX: { agentId: nakmeAgentId, id: "cmwlyrb6a0667vf1l1tfrx93h" },
  BOTS: { agentId: nakmeAgentId, id: "cmwlyrbq2079bu01kjh8hiy16" },
  FRONTEND: { agentId: nakmeAgentId, id: "cmwlyvo8t07cbw51lrci0uyrh" },
  QA_TESTS: { agentId: nakmeAgentId, id: "cmwlyvo2y07c9w51l7621nabc" },
  AI_MCP: { agentId: nakmeAgentId, id: "cmwlyvnut07c7w51l943wx9qw" },
  MOBILE: { agentId: nakmeAgentId, id: "cmwlywvv907avu01k1x384qbn" },
  FULL_DAPP: { agentId: nakmeAgentId, id: "cmwm0n2d306ltvf1l7jz1gabl" }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function classifyRequest(title = "", tags = [], scope = "") {
  const text = `${title} ${tags.join(" ")} ${scope}`.toLowerCase();

  // Exclude non-tech / social / spam
  const skipKeywords = [
    "quote this x", "retweet", "repost", "meme", "fitness", "nutrition", 
    "life coaching", "ghostwriting", "follow", "travel", "3d model"
  ];
  if (skipKeywords.some(kw => text.includes(kw))) {
    return null;
  }

  // 1. Security & Blockchain Audit matches
  if (text.includes("allowance") || text.includes("revoke") || text.includes("spender") || text.includes("bytecode")) {
    return {
      listing: LISTINGS.TOKEN_ALLOWANCE,
      scope: "On-chain inspection, allowance risk mapping, and verified transaction payload review.",
      message: "Certified blockchain security review focusing on token spender risks and exact verification."
    };
  }
  if (text.includes("honeypot") || text.includes("bep-20") || text.includes("erc-20") || text.includes("token security") || text.includes("tax fee")) {
    return {
      listing: LISTINGS.TOKEN_SECURITY,
      scope: "Contract security audit checking honeypot mechanics, mint/burn traps, liquidity locks, and ownership privileges.",
      message: "Comprehensive token security scan ensuring zero malicious logic or transfer traps."
    };
  }
  if (text.includes("solidity") || text.includes("audit") || text.includes("reentrancy") || text.includes("exploit") || text.includes("vulnerability") || text.includes("staking")) {
    return {
      listing: LISTINGS.SOL_AUDIT,
      scope: "Rigorous smart contract logic audit, attack vector simulation, and remediation report with line-by-line fixes.",
      message: "Deep security audit by Sentinel Audit. Complete vulnerability scan with mitigation proofs."
    };
  }

  // 2. Scraping & Data Extraction matches
  if (text.includes("scrap") || text.includes("extract") || text.includes("csv") || text.includes("json") || text.includes("pipeline") || text.includes("crawl")) {
    return {
      listing: LISTINGS.SCRAPER,
      scope: "Automated Python scraping pipeline with SHA-256 deduplication, schema validation, and error recovery.",
      message: "High-performance Python scraper delivering clean, validated structured data (JSON/CSV)."
    };
  }

  // 3. QA / Playwright / Testing matches
  if (text.includes("playwright") || text.includes("cypress") || text.includes("jest") || text.includes("test") || text.includes("qa") || text.includes("suite")) {
    return {
      listing: LISTINGS.QA_TESTS,
      scope: "Automated end-to-end test suite covering edge cases, assertion checks, and artifact capture.",
      message: "Robust test automation with clean isolation and CI-ready test scripts."
    };
  }

  // 4. React / Frontend matches
  if (text.includes("react") || text.includes("frontend") || text.includes("ui") || text.includes("dashboard") || text.includes("websocket") || text.includes("tailwind")) {
    return {
      listing: LISTINGS.FRONTEND,
      scope: "Clean responsive UI implementation with resilient state management and optimal UX flow.",
      message: "Modern React.js development with clean components, responsive layout, and zero console errors."
    };
  }

  // 5. Bug fix / TypeScript / API matches
  if (text.includes("bug") || text.includes("typescript") || text.includes("api") || text.includes("refactor") || text.includes("fix") || text.includes("docker") || text.includes("sql") || text.includes("script")) {
    return {
      listing: LISTINGS.BUG_FIX,
      scope: "Isolate issue in local harness, apply minimal surgical fix, and provide reproduction confirmation tests.",
      message: "Fast root-cause fix with clean type definitions and zero regression guarantees."
    };
  }

  return null;
}

async function runSlowPacedAutoBid() {
  console.log(`[${new Date().toISOString()}] 🎯 Starting Paced Mass Bidding Engine across discover streams...`);

  let allRequests = [];
  for (let page = 1; page <= 14; page++) {
    try {
      const res = await fetch(`https://platform-backend.prod.termix.live/api/v1/prepayment-orders/discover?page=${page}&pageSize=20`, {
        headers: { "authorization": "Bearer " + token, ...termixClientHeaders() }
      }).then(r => r.json());

      if (res.items && res.items.length > 0) {
        allRequests.push(...res.items);
      } else {
        break;
      }
    } catch (err) {
      console.error(`Page ${page} fetch error:`, err.message);
    }
  }

  console.log(`📡 Discovered ${allRequests.length} total platform requests.`);

  let placed = 0;
  let activeQuoted = 0;
  let skippedNonTech = 0;

  for (let i = 0; i < allRequests.length; i++) {
    const item = allRequests[i];
    const match = classifyRequest(item.title, item.tags, item.scope);

    if (!match) {
      skippedNonTech++;
      continue;
    }

    // Determine competitive price: 10% - 15% discount on max budget
    const maxBudget = parseFloat(item.budget?.max || item.budget?.min || "20");
    let discountPrice = Math.max(10, Math.floor(maxBudget * 0.85)); // at least $10, 15% discount
    if (discountPrice > maxBudget) discountPrice = Math.floor(maxBudget);

    try {
      const res = await fetch(`https://platform-backend.prod.termix.live/api/v1/prepayment-orders/${item.id}/offers`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": "Bearer " + token,
          ...termixClientHeaders()
        },
        body: JSON.stringify({
          providerAgentId: match.listing.agentId,
          listingId: match.listing.id,
          price: String(discountPrice),
          currency: item.budget?.currency || "USDC",
          deliveryDays: 1,
          scope: match.scope,
          proofMethod: "optimistic",
          settlementType: "escrow",
          message: match.message,
          validUntilHours: 168
        })
      }).then(r => r.json());

      if (res.id) {
        placed++;
        console.log(`✅ [OFFER #${placed}] Brief: "${item.title.slice(0, 35)}..." -> Bid: $${discountPrice} USDC (ID: ${res.id})`);
      } else if (res.code === "CONFLICT") {
        activeQuoted++;
        console.log(`⏭️ [ACTIVE] Already quoted on "${item.title.slice(0, 30)}..."`);
      } else {
        console.log(`⚠️ [SKIP] "${item.title.slice(0, 30)}...": ${res.message || res.code || "Failed"}`);
      }
    } catch (err) {
      console.error(`❌ Network error on ${item.id}:`, err.message);
    }

    // "dheere dheere" human-paced delay: 2.0s to 3.5s pause between bids
    const delay = Math.floor(Math.random() * 1500) + 2000;
    await sleep(delay);
  }

  console.log(`\n======================================================`);
  console.log(`🏁 Paced Auto-Bidding Run Finished!`);
  console.log(`   ✅ Fresh Bids Placed: ${placed}`);
  console.log(`   ⏭️ Already Quoted:     ${activeQuoted}`);
  console.log(`   🚫 Skipped Non-Tech:   ${skippedNonTech}`);
  console.log(`======================================================\n`);
}

runSlowPacedAutoBid().catch(err => {
  console.error("Fatal bidder error:", err);
  process.exit(1);
});
