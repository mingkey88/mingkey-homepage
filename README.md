# mingkey Portfolio Site revamped

The portfolio of Mingjie Tan: a homepage, a filterable work index, 25 case-study pages, About, Contact and a 404 page. Plain HTML, CSS and JavaScript, hosted on GitHub Pages. No framework and nothing to install for hosting.

- Live site: https://mingkey88.github.io/mingkey-homepage/
- Original portfolio: https://mingjietan88.wixsite.com/mingkey
- Continue the project: read `CLAUDE.md`.

## Preview locally

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. Any static server works.

## How the site is put together

| Path | What it is | Edit by hand? |
| --- | --- | --- |
| `index.html` | Homepage | Yes, except the project grid between the `build:featured` markers |
| `data/projects.mjs` | Every project: titles, copy, categories, images, videos, credits | Yes, this is where project content lives |
| `tools/build.mjs` | Generates the pages below from the data (Node 18+, no dependencies) | Only to change page templates, About or Contact copy |
| `work/`, `about/`, `contact/`, `404.html`, `sitemap.xml` | Generated output, committed so GitHub Pages can serve it | No, they are overwritten by the build |
| `styles.css`, `script.js` | Shared by every page | Yes |
| `assets/*.webp`, `assets/thumbs/*.webp` | Full-size (≤1800px) and grid-size (≤960px) artwork | Created with `tools/optimize-images.py` |
| `assets/sources.json` | Original URL for every image | Yes, when adding images |

### Change project text or add a project

1. Edit `data/projects.mjs`.
2. For new artwork: `pip install pillow`, then `python3 tools/optimize-images.py path/to/original.jpg my-image-name`.
3. Run `node tools/build.mjs`.
4. Preview, then commit everything, including the generated files.

If you change `styles.css` or `script.js`, bump `VERSION` in `tools/build.mjs` and rebuild so visitors don't get a stale cached copy.

## Publish

GitHub Pages serves the root of `main`. Commit and push to update the site. Pages link to each other with relative paths so everything works under `/mingkey-homepage/`; `404.html` is the one exception and uses absolute `/mingkey-homepage/` paths because GitHub Pages serves it at any depth.

## Content and design

The creative-agency direction (oversized editorial type, an earthy cream/espresso/burnt-orange palette, scroll-driven artwork stage, reveals and moving text band) was requested on 23 September 2026 and supersedes the original Wix template reference. Motion follows native scrolling, respects the OS reduced-motion setting, and can be switched off with the footer toggle (remembered across pages).

Artwork belongs to its respective rights holders. No blanket open-source licence is granted for the portfolio images. The Transformers fan art is unofficial; Transformers is a trademark of Hasbro.
