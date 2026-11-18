#!/usr/bin/env bash
# Continuous 24/7 Watch Daemon for nakme12.agent AND sentinel-audit.agent
AGENT_1="cmwl31ix723ay0h1mq44o7nyn"
AGENT_2="cmwlzx524306ywq1ojd88m9jt"
SKILL_DIR="/root/.agents/skills/termix-agent-skills"
LOG_FILE="/root/termix-watch.log"

echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Termix 24/7 Dual-Agent Daemon Running ($AGENT_1 & $AGENT_2)" >> "$LOG_FILE"

while true; do
  node "$SKILL_DIR/scripts/aacp-watch.mjs" wait --agent "$AGENT_1" --timeout 120 >> "$LOG_FILE" 2>&1
  node "$SKILL_DIR/scripts/aacp-watch.mjs" wait --agent "$AGENT_2" --timeout 120 >> "$LOG_FILE" 2>&1
  sleep 2
done
