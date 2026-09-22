# Mingkey portfolio

A responsive homepage for Mingjie Tan, built with HTML, CSS and JavaScript. No dependencies, package manager or build step.

- Live site: https://mingkey88.github.io/mingkey-homepage/
- Original portfolio: https://mingjietan88.wixsite.com/mingkey
- Chosen visual reference: https://www.wix.com/website-template/view/html/wh-1404
- Continue the project: read `CLAUDE.md`.

## Preview locally

From this directory:

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. You can also use any static web server.

## Files

- `index.html` — homepage content and semantic structure
- `styles.css` — design tokens, layout and responsive styles
- `script.js` — project data, filters, dialogs, comparison slider and mobile navigation
- `assets/` — optimized local artwork; `sources.json` maps files to their originals
- `CLAUDE.md` — brief, source material, remaining scope and implementation guidance
- `QA.md` — checks and limitations

## Publish

GitHub Pages serves the root of `main`. Commit and push changes to update the site. All local assets use relative paths so the site works under `/mingkey-homepage/`.

The homepage is complete. Separate portfolio, about and case-study pages are intentionally left for the next phase. Current navigation goes to homepage sections; artwork opens a detail dialog, with clearly labelled links to the original portfolio. Contact links use email rather than a non-functional form.

## Content and design

The user selected Wix's Architectural Rendering Studio (Futuristic) template, option 1, as the visual direction. This is an independent static implementation using that direction: split-screen hero, warm ivory and brown, large art panels and restrained typography. No Wix runtime or template imagery is included. Artwork belongs to its respective rights holders; no blanket open-source licence is granted for the portfolio images.
