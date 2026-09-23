# Site checks

## Studio-style redesign — 23 September 2026

Checked locally in headless Chromium, including a copy served under `/mingkey-homepage/`.

- 42 automated browser checks pass: font loads; homepage shows the 6 featured cards linking to case studies; Grid/List toggle works and is remembered on the next page; comparison slider keyboard; film stage links to YouTube in a new tab; motion toggle stops marquees and is remembered; work filters (All 14, 3D & sculpture 7, Illustration 7, Graphic design 1, Motion 2) with shareable hash; lightbox keyboard, wrap-around, focus return and single-image mode; Explore more shows 2 cards; phone menu opens full screen, locks scroll, closes on Escape with focus returned, and navigates; copy email; compose form stays on the page, explains what happens and blocks empty submits; no console errors.
- OS reduced motion: motion paused, toggle disabled, marquees stopped, nothing hidden.
- JavaScript disabled: all content visible on home, work, a case study, About and Contact; JS-only controls stay hidden.
- No horizontal scroll at 320, 390, 768 or 1024px on any of the 19 pages (marquees and hero images are clipped on purpose).
- Link crawl under `/mingkey-homepage/`: 113 unique local links, images and `srcset` sources return 200; no duplicate IDs; 404 page loads its styles, font and links.
- Desktop (1440px) and phone (390px) screenshots reviewed for every page type, plus the phone menu, list view and film stage.
- Not tested: the compose form opening a real email app (headless browsers have none), video playback, and the live site before deployment.


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
