# jahid674.github.io

Personal research portfolio for Jahid Hasan, built with plain HTML, CSS, and
JavaScript for GitHub Pages. No build step or external JavaScript dependencies.

The portfolio is organized around selected work, collaborations, mentoring and
teaching, research experience and education, the academic CV, news, and contact.
Project filters and the mobile menu progressively enhance the page; all content
and links remain available without JavaScript. Existing education, experience,
projects, CV, and contact page URLs still redirect to their original sections.

Content comes from the previous website, `resume.pdf` (the current academic CV),
and the existing applied-research résumé. Keep future appointments and submitted
papers clearly labeled. Update the downloadable CV by replacing `resume.pdf` and
changing its cache version in the page links.

## Previous version and restoration

The complete version from before the portfolio redesign is saved in
`backup/site-before-portfolio-2026-11-05/full-site/`. Every original file has a
SHA-256 checksum in the accompanying manifest. The original page source is also
saved alongside the full snapshot so it can be retained in Git. The full local
snapshot is ignored by Git to avoid adding personal documents to the public
repository; keep it when copying this project to another computer.

See [the backup instructions](backup/site-before-portfolio-2026-11-05/RESTORE.md).
To restore from the repository root:

```sh
python3 backup/site-before-portfolio-2026-11-05/restore.py
```

The script checks every saved file, archives the current site, and restores the
previous version. The older September backup is preserved as well.

## Local preview

Run `python3 -m http.server 8000` from this directory and open
`http://localhost:8000`. No installation is needed. Changes in this working tree
reach the public website through the repository's existing GitHub Pages workflow.

## Content notes

News updates: add new entries at the top of the news list in `index.html` and never delete older entries. Keep all updates in a list that scrolls up and down, with room for the latest six entries on larger screens and a height that fits smaller screens. Do not use a “See more” button.

Keep the ongoing agentic AI project description high level, focused on debugging failures in agentic trajectories. Do not disclose its methods or key ideas before publication, including details about data quality or fitness.

Private papers and images are no longer served from the branch tip. The site now references immutable raw GitHub URLs pinned to commit `eca0a41b6fd5123d5b0fd9b067347457b09ef651`, so the current public tree does not expose those binaries.

Important limitation: those files still exist in Git history and remain publicly accessible by direct raw URL or by browsing older commits. If you want them fully removed from GitHub, you need to rewrite history and force-push, or move the assets to a different host that is not backed by this repository.
