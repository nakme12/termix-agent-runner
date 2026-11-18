#!/usr/bin/env bash
# Continuous 24/7 Watch Daemon for nakme12.agent
AGENT_ID="cmwl31ix723ay0h1mq44o7nyn"
SKILL_DIR="/root/.agents/skills/termix-agent-skills"
LOG_FILE="/root/termix-watch.log"

echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Termix 24/7 Heartbeat Daemon Started for Agent $AGENT_ID" >> "$LOG_FILE"

while true; do
  node "$SKILL_DIR/scripts/aacp-watch.mjs" wait --agent "$AGENT_ID" --timeout 300 >> "$LOG_FILE" 2>&1
  sleep 3
done
