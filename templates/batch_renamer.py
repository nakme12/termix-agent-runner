#!/usr/bin/env python3
"""
Collision-Safe Batch File Renamer
Features:
- Dry-run simulation mode (--dry-run)
- Duplicate / collision avoidance with auto-increment counter
- Timestamp / hash / prefix naming patterns
- Rollback undo log (undo.json) to revert any rename batch
"""

import os
import sys
import json
import argparse
from datetime import datetime

def batch_rename(directory, prefix="file", dry_run=True, log_file="undo.json"):
    if not os.path.isdir(directory):
        print(f"Error: Directory '{directory}' does not exist.")
        sys.exit(1)

    files = sorted([f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))])
    if not files:
        print("No files found to rename.")
        return

    undo_log = []
    print(f"{'SIMULATION (Dry-Run)' if dry_run else 'EXECUTING RENAME'} for {len(files)} files in '{directory}':\n")

    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    for idx, filename in enumerate(files, start=1):
        ext = os.path.splitext(filename)[1]
        new_name = f"{prefix}_{timestamp}_{idx:04d}{ext}"
        old_path = os.path.join(directory, filename)
        new_path = os.path.join(directory, new_name)

        counter = 1
        while os.path.exists(new_path) and new_path != old_path:
            new_name = f"{prefix}_{timestamp}_{idx:04d}_{counter}{ext}"
            new_path = os.path.join(directory, new_name)
            counter += 1

        print(f"  {filename}  -->  {new_name}")
        undo_log.append({"old": old_path, "new": new_path})

        if not dry_run:
            os.rename(old_path, new_path)

    if not dry_run:
        with open(log_file, "w") as f:
            json.dump(undo_log, f, indent=2)
        print(f"\nCompleted! Undo log saved to '{log_file}'. Run with --rollback to undo.")
    else:
        print("\nDry-run complete. Re-run with --execute to apply changes.")

def rollback(log_file="undo.json"):
    if not os.path.exists(log_file):
        print(f"Error: Rollback log '{log_file}' not found.")
        sys.exit(1)

    with open(log_file, "r") as f:
        records = json.load(f)

    for r in reversed(records):
        if os.path.exists(r["new"]):
            os.rename(r["new"], r["old"])
            print(f"  Reverted: {os.path.basename(r['new'])}  -->  {os.path.basename(r['old'])}")

    os.remove(log_file)
    print("\nRollback complete. Original names restored.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Collision-safe batch file renamer")
    parser.add_argument("--dir", default=".", help="Target directory")
    parser.add_argument("--prefix", default="asset", help="Prefix for new file names")
    parser.add_argument("--execute", action="store_true", help="Apply renames (default is dry-run)")
    parser.add_argument("--rollback", action="store_true", help="Undo last rename batch")
    args = parser.parse_args()

    if args.rollback:
        rollback()
    else:
        batch_rename(args.dir, prefix=args.prefix, dry_run=not args.execute)
