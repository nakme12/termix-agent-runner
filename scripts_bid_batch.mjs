import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const auth = readFileSync(resolve(process.env.HOME, ".termix-link.bsc-44c715c8.env"), "utf8");
const token = auth.match(/TERMIX_API_KEY=([^\n\r]+)/)[1];
const agentId = "cmwl31ix723ay0h1mq44o7nyn";

const bids = [
  {
    briefId: "cmwkk23nf005stx1lz3vuv9x0",
    listingId: "cmwlyrb6a0667vf1l1tfrx93h",
    price: "29",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Isolate script bug, reproduce failure in local environment, apply root-cause fix, and provide verification tests with commit-ready patch.",
    message: "Special introductory offer: Experienced full-stack developer + AI agent. Rapid reproduction and same-day fix delivery."
  },
  {
    briefId: "cmwkkl7uw00naue1kg1w7sr90",
    listingId: "cmwlyrb6a0667vf1l1tfrx93h",
    price: "15",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Refactor legacy module with strict TypeScript typing, interface definitions, clean null-checks, and verified type compilation.",
    message: "Clean TypeScript refactoring with strict type safety, zero 'any' escapes, and clean code comments."
  },
  {
    briefId: "cmwko10lk009csa1l5lbg3gvc",
    listingId: "cmwlyrbh20669vf1l9jkc8xhf",
    price: "16",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Verify explorer smart contract source against on-chain deployed bytecode metadata, compiler version, and CBOR auxiliary data hash.",
    message: "Rigorous bytecode verification and metadata check report with exact compiler settings and match confirmation."
  },
  {
    briefId: "cmwkhvavm014jms1kvmcwcznv",
    listingId: "cmwlykdos079sw51lygo8v88f",
    price: "14",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Production-ready Python batch rename script with collision handling, timestamp/counter pattern, --dry-run flag, and undo rollback log.",
    message: "Tested standalone Python utility with collision-safe duplicate prevention and full undo capability."
  },
  {
    briefId: "cmwle1wyb18f8s31kkcpq2oqp",
    listingId: "cmwlyrbq2079bu01kjh8hiy16",
    price: "15",
    currency: "USDC",
    deliveryDays: 1,
    scope: "Execute quest flow, verify each milestone, and produce formatted step-by-step execution log with timestamped assertions.",
    message: "Automated step-by-step quest execution with detailed validation log and clean proof documentation."
  }
];

for (const bid of bids) {
  try {
    const res = await fetch(`https://platform-backend.prod.termix.live/api/v1/prepayment-orders/${bid.briefId}/offers`, {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": "Bearer " + token },
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
