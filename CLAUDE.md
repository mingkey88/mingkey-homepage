# Continue the Mingkey portfolio

## What the user wants

Revamp the old portfolio at https://mingjietan88.wixsite.com/mingkey. The user chose a Wix template, asked Codex to implement and host the homepage on GitHub Pages, and plans to use Claude Code for everything else. Preserve the selected visual direction and working homepage while expanding the site.

Repository: https://github.com/mingkey88/mingkey-homepage
Live homepage: https://mingkey88.github.io/mingkey-homepage/
Reference template: https://www.wix.com/website-template/view/html/wh-1404
Template name: Architectural Rendering Studio (Futuristic), Aura Synthesis.
User's other site, for quality reference: https://mingkey88.github.io/superiso-homepage/

## Design to preserve — updated 23 September 2026

The user subsequently asked for a creative-agency feel with scroll animations and authorized continuing with it. This supersedes the original split-screen template direction.

Use oversized uppercase editorial typography, italic serif contrasts, off-white `#eeeee6`, dark green-black `#1d211d`, and acid lime `#d3fb50`. The hero reads “MAKE IT UNEXPECTED.” A featured Companion artwork scene expands on scroll, followed by a dark introduction, a lime moving text band, a staggered project grid, process and film sections, and a lime contact section.

Maintain the identity as Mingjie's independent creative practice; do not invent a team, agency clients or credentials. Use the actual portfolio artwork.

Motion uses native scrolling, requestAnimationFrame and IntersectionObserver with no animation dependency or scroll interception. Headline entry, artwork expansion/parallax, graphic rotation, text-band movement, project reveals and a reading-progress line are implemented. Effects are reduced on mobile. OS reduced-motion and the footer motion toggle disable animation and sticky staging; content stays visible with JavaScript disabled. Keep keyboard focus revealing its containing section. Filters explicitly reveal matching cards.

## Current implementation

Plain static HTML/CSS/JS on GitHub Pages (root of `main`). No framework, runtime dependency, server backend or secrets. A zero-dependency Node script generates the static pages from one data file; its output is committed, so hosting needs no build step.

- `data/projects.mjs` is the single source of truth for all 14 projects: copy, categories, images, videos, credits, homepage `featured` flag. The first category is the one used by the homepage filter.
- `node tools/build.mjs` writes `work/index.html`, `work/<slug>/index.html`, `about/`, `contact/`, `404.html`, `sitemap.xml`, and replaces the homepage grid between `<!-- build:featured -->` markers. It also rewrites the `?v=` cache-busting query on the homepage; bump `VERSION` when CSS/JS change. About/Contact copy lives in the build script's templates.
- Never hand-edit generated files; edit the data or templates and rebuild.
- `script.js` is shared by every page and guards each feature by element presence: mobile menu, filters (multi-category cards; the work index syncs the filter to the URL hash), comparison slider, lightbox (native `<dialog>`, built in JS; without JS the gallery links open the image), copy email, scroll motion and the motion toggle (remembered in localStorage, wrapped in try/catch).
- Images: `assets/<name>.webp` (≤1800px) and `assets/thumbs/<name>.webp` (≤960×1200), both made by `tools/optimize-images.py`. The build reads WebP dimensions itself. `assets/sources.json` maps every file to its original. Images under 700px wide render at native size in galleries.
- Paths are relative; nested pages use `../` or `../../`. `404.html` alone uses absolute `/mingkey-homepage/` paths because Pages serves it at any depth.
- Every page has a canonical URL, Open Graph/Twitter tags and a sitemap entry; `robots.txt` points to the sitemap. Social images are WebP.
- Videos open on YouTube/Vimeo in a new tab. There are no embedded players (an embed rendered blank in earlier testing); preview images are the videos' own thumbnails.
- The homepage project dialog was removed; homepage cards now link to case studies.

## Source pages and verified facts

The Wix site has nine pages: Home, About, 3D works (`/3dworks`), Sculpt (`/sculpt`), Character (`/characters`), Hard Surface (`/vehicles`), Illustrations, Projects and Contact. All gallery items and videos across them were migrated on 23 September 2026 (the 3D gallery's 14 items, 8 digital paintings, 7 graphic-design pieces, the 9-image WTFO gallery). Duplicates across pages were merged. The only images not published are the 2015 profile photo on the About page and the resume PDF.

Mingjie Tan is a CG artist from Singapore. Confirmed by the user on 23 September 2026: his current role is digital marketing executive and web developer at achates360 (mentioned on the About page). The old bio lists character design, illustrations, 3D modelling, motion graphics and graphic design. It lists Adobe Photoshop, After Effects, Premiere, Autodesk 3ds Max and Mudbox; the About page shows these as "tools across the archive", not as current proficiency. Do not invent clients, awards, dates, outcomes, availability, job titles or years of experience.

Verified project text from the source pages (already in the data file):
- Alien Mechanic: main character of WTFO; modelled in 3ds Max, textured in Photoshop. Video: https://www.youtube.com/watch?v=BSt10vJLwTQ
- Nissan 350Z: 3ds Max, rendered with NVIDIA mental ray. Video: https://www.youtube.com/watch?v=EltDg5dhV0I
- Dohva dragon: traditional Sculpey clay sculpt, baked; half in full detail, half showing anatomy. Video: https://www.youtube.com/watch?v=grxExYOStyw
- Swamp Hydra: digital sculpt, textured in Mudbox. Video: https://www.youtube.com/watch?v=Df1Sz7spdX0 (YouTube title "Swamp Hydralisk Video")
- Spartan, FatMan Project, Kate, King Kong, Transformers fan art, the ads: no source description; copy only describes what is visible.
- Poster Trial (`work/poster-trial/`): the SPH Razor-branded posters, banners and app screens were a poster-making trial, not client work (confirmed by the user). Keep the notice saying so.

The old contact page has an apparent typo (`gmil.com`). The site uses `mingjie.tan88@gmail.com`, confirmed by the user as the public contact address. The phone number and resume were deliberately not republished.

### Films

**What the Flying Object / WTFO** — https://www.youtube.com/watch?v=ilIMWmxm-Jc. Solo short about an alien mechanic trying to operate his UFO's tractor beam; Mingjie handled concept through modelling, rigging and effects.

**Saikokira — Pachinko vs Ararush** — https://vimeo.com/84110618, on Samuel Kambey's Vimeo channel. The Wix page spelled it "Sakokira"; the user confirmed the site should follow the film's own title, "Saikokira". Group 2D short: Mingjie was the effects artist and animated effects plus some character shots. Team as listed on the portfolio: Samuel Kambey, Wilson Halim, Bobbie Teo, Weatherly Tan, Chris Ong and Mingjie. The Vimeo description lists "Ong Teng Wee" and "Teo Wan Ting" where the portfolio lists Chris Ong and Bobbie Teo; the site keeps the portfolio names. Software per Vimeo: Digicel FlipBook, Toon Boom, Photoshop, After Effects, Premiere Pro (the film as a whole, not necessarily Mingjie). Preserve collaboration credits; never imply solo authorship.

Exclude the default Wix social links (Wix/Flickr).

## Open questions for the user

1. The 2015 profile photo from the old About page is not published. Ask before adding it or a newer photo.
2. Social previews use WebP. If a platform needs JPEG, generate 1200×630 JPEGs and point `og:image` at them.
3. The repository is still named `mingkey-homepage`. Renaming it changes the GitHub Pages URL; if that happens, update `site.url` in `data/projects.mjs`, the homepage's absolute URLs and `robots.txt`, then rebuild.

## Useful commands

```sh
node tools/build.mjs                      # regenerate pages after editing data/projects.mjs
python3 -m http.server 4173               # preview at http://localhost:4173
node --check script.js
python3 tools/optimize-images.py original.jpg image-name   # needs: pip install pillow
```

Keep the user-facing site free of migration notes and implementation instructions. This file and README are the handoff, not content for the rendered page.
