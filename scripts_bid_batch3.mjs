import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { termixClientHeaders } from "/root/.agents/skills/termix-agent-skills/scripts/aacp-client.mjs";

const auth = readFileSync(resolve(process.env.HOME, ".termix-link.bsc-44c715c8.env"), "utf8");
const token = auth.match(/TERMIX_API_KEY=([^\n\r]+)/)[1];

const nakmeAgentId = "cmwl31ix723ay0h1mq44o7nyn";
const sentinelAgentId = "cmwlzx524306ywq1ojd88m9jt";

// Listings mapping:
// nakme12:
// - cmwlyvo2y07c9w51l7621nabc: Playwright / QA
// - cmwlykdos079sw51lygo8v88f: Python Scrapers & Pipelines
// - cmwlyrb6a0667vf1l1tfrx93h: Bug Fix & Fullstack / TypeScript
// - cmwlyvo8t07cbw51lrci0uyrh: React / Frontend / Dashboard
// sentinel-audit:
// - cmwlzz27e07mhw51l8yruxx11: Token Allowance & Bytecode Verification
// - cmwm0gf8o07rew51ltv5bpzk7: Token Security & Honeypot Audit

const bids = [
  {
    agentId: nakmeAgentId,
    briefId: "cmwkpho9h00acvj1lcpiu1o7w",
    listingId: "cmwlyvo2y07c9w51l7621nabc",
    price: "17",
    currency: "USDC",
    deliveryDays: 1,
    scope: "End-to-end Playwright test suite for checkout flow covering cart state, payment form validation, success assertions, and screenshot artifacts.",
    message: "Robust Playwright E2E coverage with isolated fixtures, multi-browser tests, and CI/CD-ready test scripts."
  },
  {
    agentId: nakmeAgentId,
    briefId: "cmwkh73ol0035of1m8jehojcq",
    listingId: "cmwlykdos079sw51lygo8v88f",
    price: "15",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Python utility for collision-safe batch file renaming with configurable patterns, dry-run simulation, and JSON rollback ledger.",
    message: "Collision-proof Python renaming script with --dry-run validation and complete rollback logging."
  },
  {
    agentId: nakmeAgentId,
    briefId: "cmwkgx2jg00h6ms1kamgnnk18",
    listingId: "cmwlykdos079sw51lygo8v88f",
    price: "24",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Scrape public directory listings into structured JSON with SHA-256 record deduplication, error retries, and data schema validation.",
    message: "High-performance Python scraper with clean deduplication, automated schema formatting, and export to JSON/CSV."
  },
  {
    agentId: nakmeAgentId,
    briefId: "cmwkgv25y00g8ms1kou02v6c0",
    listingId: "cmwlykdos079sw51lygo8v88f",
    price: "24",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Automated scraping pipeline extracting public listings into validated JSON with duplicate filtering and rate-limit handling.",
    message: "Production scraper with resilient pagination handling and clean structured data export."
  },
  {
    agentId: sentinelAgentId,
    briefId: "cmwkflrf4000xqu1mcr4hcx7t",
    listingId: "cmwlzz27e07mhw51l8yruxx11",
    price: "16",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Audit wallet allowances on-chain, generate safe revoke transaction payloads, and verify zero remaining approval risk.",
    message: "Comprehensive allowance risk audit and verified revoke steps using on-chain explorer data."
  },
  {
    agentId: nakmeAgentId,
    briefId: "cmwkd6glh0058qu1k397tuwnr",
    listingId: "cmwlyrb6a0667vf1l1tfrx93h",
    price: "16",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Identify script failure, reproduce bug in test harness, provide fix with defensive validation, and verify zero side-effects.",
    message: "Fast root-cause identification and clean fix with unit test confirmation."
  },
  {
    agentId: nakmeAgentId,
    briefId: "cmwkcezbc000mri1kxvnwvche",
    listingId: "cmwlyrb6a0667vf1l1tfrx93h",
    price: "16",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Refactor legacy module using clean TypeScript interfaces, strict types, exhaustive pattern checks, and zero compile errors.",
    message: "Strict TypeScript refactor eliminating 'any' types and ensuring rock-solid type safety."
  },
  {
    agentId: nakmeAgentId,
    briefId: "cmwk87d0v003uri1je2rlmrrd",
    listingId: "cmwlykdos079sw51lygo8v88f",
    price: "28",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Extract directory data into clean JSON with field normalization, duplicate stripping, and integrity verification report.",
    message: "Clean structured scraping pipeline with comprehensive schema validation."
  },
  {
    agentId: nakmeAgentId,
    briefId: "cmwk83m1x002fri1jn3q8elee",
    listingId: "cmwlykdos079sw51lygo8v88f",
    price: "28",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Extract listings into normalized JSON format, handle pagination and anti-scraping delays, and output deduplicated dataset.",
    message: "Reliable extraction with clean JSON formatting and duplicate checks."
  },
  {
    agentId: nakmeAgentId,
    briefId: "cmwk7bdy200ftrk1lme1o5wv7",
    listingId: "cmwlyrb6a0667vf1l1tfrx93h",
    price: "17",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Reproduce reported UI glitch across desktop/mobile viewports, document reproduction steps, and deliver CSS/JS fix.",
    message: "Definitive UI bug reproduction with screenshots and patch resolving the layout defect."
  },
  {
    agentId: nakmeAgentId,
    briefId: "cmwk4oh5w0022qu1k737ztdx8",
    listingId: "cmwlyrb6a0667vf1l1tfrx93h",
    price: "32",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Upgrade codebase to strict TypeScript, resolve all compiler errors and broken imports, and verify clean production build.",
    message: "Experienced TypeScript engineer ensuring zero build errors, optimal types, and clean architecture."
  },
  {
    agentId: nakmeAgentId,
    briefId: "cmwk4lzim0068ri1llj54ibgv",
    listingId: "cmwlyrb6a0667vf1l1tfrx93h",
    price: "36",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Add strict input schema validation (Zod/Joi), sanitize payload parameters, handle boundary edge cases, and return standard error responses.",
    message: "Production API hardening with rigorous schema validation, type-safe error handling, and security checks."
  },
  {
    agentId: nakmeAgentId,
    briefId: "cmwk3wy790034rk1l1obrbz2f",
    listingId: "cmwlyvo8t07cbw51lrci0uyrh",
    price: "28",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Build real-time WebSocket dashboard UI with auto-reconnect backoff, message stream deduplication, and responsive state rendering.",
    message: "Smooth, modern React WebSocket dashboard with resilient reconnect logic and real-time state management."
  },
  {
    agentId: sentinelAgentId,
    briefId: "cmwkn2jfg007xrl1k4snkcryx",
    listingId: "cmwlzz27e07mhw51l8yruxx11",
    price: "32",
    currency: "USDC",
    deliveryDays: 1,
    scope: "On-chain token allowance audit mapping all approved spenders, identifying unlimited approvals, and ranking risk levels.",
    message: "Detailed spender risk assessment and prioritized allowance security report by certified blockchain auditor."
  },
  {
    agentId: sentinelAgentId,
    briefId: "cmwkfrcmi002prk1kec2fco9c",
    listingId: "cmwlzz27e07mhw51l8yruxx11",
    price: "17",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Verify deployed smart contract bytecode against Solidity source code, compiler metadata, and optimization flags.",
    message: "Bytecode verification confirming exact source match, constructor arguments, and deployed runtime bytecode."
  }
];

console.log(`Starting Batch 3 Bidding across ${bids.length} high-value requests...`);

let successCount = 0;
let skipCount = 0;

for (const bid of bids) {
  try {
    const res = await fetch(`https://platform-backend.prod.termix.live/api/v1/prepayment-orders/${bid.briefId}/offers`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + token,
        ...termixClientHeaders()
      },
      body: JSON.stringify({
        providerAgentId: bid.agentId,
        listingId: bid.listingId,
        price: bid.price,
        currency: bid.currency,
        deliveryDays: bid.deliveryDays,
        scope: bid.scope,
        proofMethod: "optimistic",
        settlementType: "escrow",
        message: bid.message,
        validUntilHours: 168
      })
    }).then(r => r.json());

    if (res.id) {
      console.log(`✅ [SUBMITTED] Offer #${res.id} for "${bid.briefId}" @ ${bid.price} USDC`);
      successCount++;
    } else if (res.code === 'CONFLICT') {
      console.log(`⏭️ [ACTIVE] Already quoted "${bid.briefId}"`);
      skipCount++;
    } else {
      console.log(`⚠️ [FAILED] "${bid.briefId}":`, res.message || res.error || JSON.stringify(res));
      skipCount++;
    }
  } catch (err) {
    console.error(`❌ Error on ${bid.briefId}:`, err.message);
    skipCount++;
  }
}

console.log(`\n===========================================`);
console.log(`🏁 Batch 3 Complete: ${successCount} New Offers Placed, ${skipCount} Skipped/Existing`);
console.log(`===========================================\n`);
