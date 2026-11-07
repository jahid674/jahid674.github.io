# jahid674.github.io

Personal academic website for Jahid Hasan, built with plain HTML, CSS, and
JavaScript for GitHub Pages. No build step or external JavaScript dependencies.

The website opens with a personal biography and a photo/contact sidebar, followed
by News, Research, Experience and Education, Teaching and Mentoring, the academic
CV, and Contact. Use simple section headings, readable text, and unboxed research
entries to keep the presentation closer to a personal academic homepage.
Research has three areas:
AI pipeline management (PipeLens, Sentinel, and both agentic projects), Data and
Fairness (DataSift and ReFair), and ML Systems (FANSHIELD). All projects use one
responsive two-column layout, with no paper figures. Collaboration logos appear at
the end of Research instead of in a separate section.
Project filters and the mobile menu progressively enhance the page; all content
and links remain available without JavaScript. Existing education, experience,
projects, CV, and contact page URLs still redirect to their original sections.

Content comes from the previous website, `resume.pdf` (the current academic CV),
and the existing applied-research résumé. Keep future appointments and submitted
papers clearly labeled. Update the downloadable CV by replacing `resume.pdf` and
changing its cache version in the page links.

Every research project has a publication-stage badge: Published, Submitted, or
Ongoing. Category filters do not show numerical project or stage counts. Keep
student names in Mentoring profiles rather than project descriptions; profiles
include affiliations, program context, and mentorship dates. The ongoing agentic debugging
project is a collaboration with AT&T Research and Cornell University. Keep the
multi-agent benchmarking project high level until publication as well.

Logo provenance is recorded in [collaboration-assets/README.md](collaboration-assets/README.md).

## Previous version and restoration

The exact light-theme template from before the dark preview is saved on
[the light-theme backup branch](https://github.com/jahid674/jahid674.github.io/tree/backup/light-theme-2026-11-06).

The academic layout from before the November 6 personal website update is saved
on [the academic-layout backup branch](https://github.com/jahid674/jahid674.github.io/tree/backup/academic-layout-2026-11-06).
The original pre-portfolio backup described below is also preserved.

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

## Light and dark themes

The light theme remains the default for first-time visitors. Open `/?theme=dark`
to preview the black background, or `/?theme=light` to return directly to the light
theme. The header's Light/Dark button switches immediately and remembers the
visitor's choice in local storage. An explicit theme in the URL overrides that
saved preference. Previewing a URL alone does not change the saved preference.
Printing always uses the light palette. The layout, text, CV, and research content
are shared by both themes.

## Local preview

Run `python3 -m http.server 8000` from this directory and open
`http://localhost:8000`. No installation is needed. Changes in this working tree
reach the public website through the repository's existing GitHub Pages workflow.

## Content notes

News updates: add new entries at the top of the news list in `index.html` and never delete older entries. Keep all updates in a list that scrolls up and down, with room for the latest six entries on larger screens and a height that fits smaller screens. Do not use a “See more” button.

Keep the ongoing agentic AI project description high level, focused on debugging failures in agentic trajectories. Do not disclose its methods or key ideas before publication, including details about data quality or fitness.

Private papers and images are no longer served from the branch tip. The site now references immutable raw GitHub URLs pinned to commit `eca0a41b6fd5123d5b0fd9b067347457b09ef651`, so the current public tree does not expose those binaries.

Important limitation: those files still exist in Git history and remain publicly accessible by direct raw URL or by browsing older commits. If you want them fully removed from GitHub, you need to rewrite history and force-push, or move the assets to a different host that is not backed by this repository.
