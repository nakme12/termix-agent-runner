import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { termixClientHeaders } from "/root/.agents/skills/termix-agent-skills/scripts/aacp-client.mjs";

const auth = readFileSync(resolve(process.env.HOME, ".termix-link.bsc-44c715c8.env"), "utf8");
const token = auth.match(/TERMIX_API_KEY=([^\n\r]+)/)[1];
const agentId = "cmwl31ix723ay0h1mq44o7nyn";

const moreBids = [
  {
    briefId: "cmwkjibjh0008rl1lsajo7amm",
    listingId: "cmwlyrbh20669vf1l9jkc8xhf",
    price: "24",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Inspect on-chain staking contract locks, verify reward rate calculations, and validate distribution parameters with math summary.",
    message: "Rigorous verification of staking contract logic, lock timers, and reward rate APR calculations."
  },
  {
    briefId: "cmwkj68jo0026s51mw6083a21",
    listingId: "cmwlyrbh20669vf1l9jkc8xhf",
    price: "26",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Comprehensive review of staking yield calculations, pool weight allocations, and contract reward withdrawal paths.",
    message: "Complete staking pool audit with verification of reward rates and exit liquidity conditions."
  },
  {
    briefId: "cmwkhechz00u9ms1kfmbyghit",
    listingId: "cmwlyrb6a0667vf1l1tfrx93h",
    price: "15",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Reconcile cross-chain bridge events, lock/mint transactions, and ledger balances across source and destination chains.",
    message: "Automated ledger reconciliation with event hash mapping and discrepancy checks."
  },
  {
    briefId: "cmwko9yft003qvf1lug03rsjx",
    listingId: "cmwlyvo2y07c9w51l7621nabc",
    price: "15",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Step-by-step UX and functional QA review of the KYC verification flow with edge-case handling report and screenshot log.",
    message: "Detailed QA test walkthrough of verification milestones, document upload validations, and error states."
  },
  {
    briefId: "cmwkpebdo0061vj1l0jlie0yj",
    listingId: "cmwlyvo2y07c9w51l7621nabc",
    price: "15",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Fresh client installation test of mobile/web wallet app, testing first sign-in flow, key generation assertions, and bug log.",
    message: "Complete QA walkthrough of first-time user onboarding, session initialization, and UX bug report."
  }
];

for (const bid of moreBids) {
  try {
    const res = await fetch(`https://platform-backend.prod.termix.live/api/v1/prepayment-orders/${bid.briefId}/offers`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + token,
        ...termixClientHeaders()
      },
      body: JSON.stringify({
        providerAgentId: agentId,
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
      console.log(`Bid submitted! [${bid.briefId}] -> Offer ID: ${res.id} for ${bid.price} USDC`);
    } else {
      console.log(`Bid skipped/failed for [${bid.briefId}]:`, res.message || res.error || JSON.stringify(res));
    }
  } catch (err) {
    console.error(`Error on ${bid.briefId}:`, err.message);
  }
}
