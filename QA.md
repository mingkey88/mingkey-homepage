# Site checks

## AI-regenerated artwork — 23 September 2026

- Seven user-supplied AI remakes added (Companion, Sinister Sunny, Vampire Hunter Kate, King Kong, Transformers fan art, Spartan, plus an extra Ararush painting). Each case study's lightbox opens on the AI version, then the original, with the disclosure note shown.
- Existing browser checks pass (the old single-image lightbox check no longer applies: every image project now has at least two images). No horizontal scroll at 320–1024px; 122 local links and images return 200.
- Homepage stage (desktop and phone), homepage grid and two case studies visually reviewed.


## Full site build — 23 September 2026

Checked locally in headless Chromium against `python3 -m http.server`, including a copy served under `/mingkey-homepage/` to match GitHub Pages.

### Passed

- `node --check` on `script.js` and `tools/build.mjs`; the build regenerates all pages without errors.
- Link crawl of all 19 pages under `/mingkey-homepage/`: 108 unique local links, images and `srcset` sources return 200; no duplicate IDs; every WebP in `assets/` is referenced.
- No horizontal overflow on any page at 320, 390, 768 or 1024px. One overflow (next-project title at 320px) was found and fixed.
- Desktop (1440px) and phone (390px) layouts visually reviewed for the homepage, work index, several case studies (film, gallery, single painting, graphic design), About and Contact.
- Homepage filters: All 6, 3D 3, Illustration 2, Motion 1; status text updates; cards link to case studies; comparison slider responds to the keyboard.
- Work index filters: All 14, 3D & sculpture 7, Illustration 7, Graphic design 1, Motion 2. `work/#illustration` opens pre-filtered; clicking a filter updates the address; unknown hashes show everything.
- Lightbox: opens from the keyboard, arrow keys move and wrap, the counter and caption update, the full-size image loads, the page behind is scroll-locked, and Escape closes it and returns focus to the thumbnail. Single-image projects hide previous/next.
- Mobile menu opens and navigates from a nested page.
- Motion toggle switches motion off, and the choice carries over to the next page. With OS reduced motion emulated, motion is paused, the toggle is disabled and nothing is hidden.
- With JavaScript disabled, all cards, gallery items and text are visible; gallery links open the full image directly; the copy-email button stays hidden.
- Copy-email button writes the address to the clipboard and announces it.
- 404 page loads its styles and assets from `/mingkey-homepage/`, and its links resolve.
- No browser console errors.

### Not tested here

- External video links (YouTube, Vimeo) were confirmed to exist via their oEmbed endpoints; playback was not tested.
- The browser could not reach the live site from this environment. Recheck the published pages after GitHub Pages deploys.
- Not a formal accessibility audit: structure, keyboard behaviour, focus handling, alt text and motion preferences were checked.

## Homepage phase — 22 September 2026

The original homepage checks (filters, slider, mobile menu, published HTTPS site, GitHub Pages build) passed at the time. The project dialog tested then has since been replaced by links to the case-study pages.
