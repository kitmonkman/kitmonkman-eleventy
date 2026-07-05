# kitmonkman.com — Eleventy site

This is the source for the site. You write content as Markdown and template
files in `src/`; Eleventy builds them into finished HTML in `_site/`, which is
what gets deployed. You never edit `_site/` by hand — it's generated.

## One-time setup

1. Make sure Node.js is installed (`node --version` should print a number).
2. In this folder, run:

   ```
   npm install
   ```

   That reads `package.json` and installs Eleventy into the project.

## Day-to-day: writing and previewing

Run:

```
npx @11ty/eleventy --serve
```

This builds the site and starts a live preview at **http://localhost:8080**.
Leave it running — every time you save a file, the browser refreshes. Stop it
with Ctrl-C.

## Publishing

```
npx @11ty/eleventy
```

Builds the final site into `_site/`. How you deploy that depends on your host
(see "Deploying" below).

---

## How the site is organised

```
src/
  index.njk            → the Position front door (home page)
  work.njk             → The Work          (placeholder for now)
  york.njk             → York              (placeholder for now)
  about.njk            → About             (placeholder for now)
  style.css            → the whole site's design
  notebook/
    index.njk          → the Notebook landing ( [ 147 ] )
    thread.njk         → generates one page per thread automatically
    notebook.json      → tells every post here to use the post layout
    2026-05-10-*.md    → individual posts (these are the ones you add to)
  _includes/layouts/
    base.njk           → masthead + footer wrapper for every page
    post.njk           → how a single notebook post is laid out
  _data/
    site.json          → nav links + thread descriptions, all in one place
```

---

## Adding a notebook post (the thing you'll do most)

Create a new `.md` file in `src/notebook/`. Name it however you like; dating
the filename keeps the folder tidy. At the top, put this block, then write:

```
---
pageTitle: "Your title here"
date: 2026-06-25
thread: don-quixote
threadTitle: "Don Quixote"
status: ongoing
---

Your prose here, in Markdown. Blank line between paragraphs.
*Italics* with asterisks.
```

The fields:

- **pageTitle** — the post's headline. (Required.)
- **date** — YYYY-MM-DD. Controls ordering and the displayed date. (Required.)
- **thread** — the thread's short slug, e.g. `don-quixote`, `academy`, `york`,
  `urdance`, `restoration`. Leave it out entirely for a standalone post.
- **threadTitle** — the thread's display name, e.g. `Don Quixote`. (Use the
  same one each time for a given thread.)
- **status** — `ongoing`, `note`, or `finished`. Shown as a small marker.

That's the whole act of publishing. Save it; if `--serve` is running you'll see
it appear. The threads, counts, ordering, and thread pages all update
themselves — you never edit an index.

### Starting a new thread

Just use a new `thread` slug the first time. To give it a description on the
Notebook landing, add a line to `threadDescriptions` in `src/_data/site.json`.

---

## Deploying

**Netlify (recommended):** connect this repo, set build command to
`npx @11ty/eleventy` and publish directory to `_site`. Netlify rebuilds on every
push — so your workflow becomes write, push, done. No local build needed.

**GitHub Pages:** needs a small GitHub Actions workflow to run the build. Ask
and I'll provide the file.

---

## Notes

- `node_modules/` and `_site/` are generated — they're not included here and
  shouldn't be committed (a `.gitignore` is provided).
- The four example posts are there to show the pattern. Delete them whenever you
  like; the site adjusts automatically.
