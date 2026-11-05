#!/usr/bin/env python3
"""Verify and restore the saved website, first archiving the current files."""
from datetime import datetime
from pathlib import Path
import hashlib
import json
import shutil
import tarfile


def restore():
    backup = Path(__file__).resolve().parent
    root = backup.parent.parent
    snapshot = backup / "full-site"
    manifest = json.loads((backup / "snapshot-manifest.json").read_text())
    for name, digest in manifest["files"].items():
        saved = (snapshot / name).resolve()
        if not saved.is_relative_to(snapshot.resolve()):
            raise SystemExit(f"Invalid snapshot path: {name}")
        if not saved.is_file():
            raise SystemExit(f"Missing snapshot file: {name}. See RESTORE.md.")
        if hashlib.sha256(saved.read_bytes()).hexdigest() != digest:
            raise SystemExit(f"Checksum mismatch: {name}; nothing was restored.")

    stamp = datetime.now().strftime("%Y%m%d-%H%M%S-%f")
    archive = root / "backup" / f"site-before-restore-{stamp}.tar.gz"
    excluded = {".git", "backup", ".agents", ".codex", ".aws", ".DS_Store"}
    with tarfile.open(archive, "w:gz") as tar:
        for current in root.rglob("*"):
            relative = current.relative_to(root)
            if current.is_file() and not any(p in excluded for p in relative.parts):
                tar.add(current, arcname=str(relative), recursive=False)

    for name in manifest["files"]:
        destination = root / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(snapshot / name, destination)
    print(f"Restored {len(manifest['files'])} verified files from November 5, 2026.")
    print(f"The version you replaced is saved at {archive.relative_to(root)}.")


if __name__ == "__main__":
    restore()
