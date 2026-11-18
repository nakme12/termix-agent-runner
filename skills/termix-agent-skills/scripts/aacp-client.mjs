// The mark every request to Termix carries, so the platform can tell skill use
// apart from the website (backend lib/request-client.ts):
//
//   X-Termix-Client: skill/<version>
//   User-Agent:      termix-skill/<version> (node/<v>; <platform>)
//
// Every call to the Termix API and the Termix skill bucket spreads
// `termixClientHeaders()` into its headers. Third-party calls (LLM providers,
// public chain RPC, the Binance wallet CLI) do not — they are not ours to mark.
//
// Zero dependencies, no side effects on import (house style for this skill).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

let version;

export function skillVersion() {
  if (version === undefined) {
    try {
      version = readFileSync(fileURLToPath(new URL("../VERSION", import.meta.url)), "utf8").trim() || null;
    } catch {
      version = null;
    }
  }
  return version;
}

export function termixClientHeaders() {
  const v = skillVersion() ?? "unknown";
  return {
    "user-agent": `termix-skill/${v} (node/${process.versions.node}; ${process.platform})`,
    "x-termix-client": `skill/${v}`,
  };
}
