# Website backup — November 5, 2026

This is the version immediately before the portfolio redesign, based on commit
`1c1a58e`. No earlier backups were changed.

The original HTML, stylesheet, and JavaScript are saved here for version control.
`full-site/` holds a complete local snapshot, including the résumé, papers, images,
and original configuration. It is excluded from Git because it contains personal
documents. Keep this folder when moving the project to another computer.

## Preview the previous version

Open `full-site/index.html` in a browser, or serve the repository and visit
`/backup/site-before-portfolio-2026-11-05/full-site/`.

## Restore the previous version

Run this from the repository root:

```sh
python3 backup/site-before-portfolio-2026-11-05/restore.py
```

The script verifies every saved file using `snapshot-manifest.json`, saves the
current site in a dated archive under `backup/`, and then copies the complete
snapshot back into place. It leaves Git history, older backups, and extra files
alone. Restoring locally does not publish the restored version to GitHub Pages.

If you only have a Git checkout without `full-site/`, restore the original page
layout by copying the saved `index.html`, `style.css`, and `script.js` from this
directory into the repository root. The résumé and supporting assets are not
changed by the portfolio redesign.
