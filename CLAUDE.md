# Continue the Mingkey portfolio

## What the user wants

Revamp the old portfolio at https://mingjietan88.wixsite.com/mingkey. The user chose a Wix template, asked Codex to implement and host the homepage on GitHub Pages, and plans to use Claude Code for everything else. Preserve the selected visual direction and working homepage while expanding the site.

Repository: https://github.com/mingkey88/mingkey-homepage
Live homepage: https://mingkey88.github.io/mingkey-homepage/
Reference template: https://www.wix.com/website-template/view/html/wh-1404
Template name: Architectural Rendering Studio (Futuristic), Aura Synthesis.
User's other site, for quality reference: https://mingkey88.github.io/superiso-homepage/

## Design to preserve — updated 23 September 2026

Current direction (requested by the user on 23 September 2026): the layout language of the Studio Brave Webflow template (https://studio-brave.webflow.io/), in an earthy orange palette. It supersedes the earlier creative-agency version and the original Wix template reference. Brave is a paid template, so the site recreates its layout ideas in original code; never copy its code, images, copy or font files from its CDN.

- Type: Overused Grotesk (SIL OFL, self-hosted in `assets/fonts/` with `OFL.txt`), giant uppercase headings with tight leading, small uppercase labels, first-line indents on paragraphs. No serif.
- Palette: cream `--paper #f1ebe1`, espresso `--ink #2a1e16`, burnt orange `--accent #e0703a`, `--accent-deep #a8441a` for small accents on cream, sand `--panel #e7ddcd`, deep `--shade #1a120c` for the footer and image backgrounds. All colours are CSS variables in `:root`; ink on the accent is about 5:1 contrast, so keep text on orange dark.
- Structure: header with wordmark, Singapore coordinates and uppercase nav (full-screen menu on phones); numbered sections with `(01)` labels and vertical side labels; pill buttons with a four-point star; project cards with overlaid title, arrow and category tags, plus a Grid/List toggle; dark sections with staggered cards; capsule film images; a footer with two marquee rows ("Mingkey", "Make it unexpected") and a spinning "Let's talk" badge.
- Homepage order: full-bleed Companion hero ("MINGKEY / CG ARTIST", "What I do" list) → (01) About → (02) Sketch / Sculpt / Animate → scroll-expanding WTFO film stage → (03) Disciplines → (04) Selected work → (05) Behind the work (350Z wireframe slider + step cards) → (06) Films → footer.
- Brave sections that make claims (team, awards, on-time delivery, client support) were replaced with truthful equivalents; keep it that way.

Maintain the identity as Mingjie's independent creative practice; do not invent a team, agency clients or credentials. Use the actual portfolio artwork. The user rejected AI-generated hero art; do not add generated imagery.

Motion uses native scrolling, requestAnimationFrame, IntersectionObserver and CSS keyframes, with no animation dependency or scroll interception: title entry, hero parallax, drifting process words, the film stage expanding on scroll, reveals, marquees, the spinning badge and a progress line. OS reduced motion and the footer motion toggle (remembered in localStorage) stop all of it, including marquees; content stays visible with JavaScript disabled. Keyboard focus reveals its containing element. Filters explicitly reveal matching cards.

## Current implementation

Plain static HTML/CSS/JS on GitHub Pages (root of `main`). No framework, runtime dependency, server backend or secrets. A zero-dependency Node script generates every page from one data file; its output is committed, so hosting needs no build step.

- `data/projects.mjs` is the single source of truth for all 14 projects (copy, categories, images, videos, credits, `featured` flag) plus `site` details (email, location, coordinates). `indexCard` overrides `card` for the image on project cards.
- `node tools/build.mjs` writes every page: `index.html`, `work/`, `work/<slug>/`, `about/`, `contact/`, `404.html` and `sitemap.xml`. Homepage, About and Contact copy lives in its templates. Bump `VERSION` there when CSS/JS change. Never hand-edit generated HTML.
- `script.js` is shared by every page and guards each feature by element presence: phone menu, filters (multi-category, work index synced to the URL hash), Grid/List toggle (remembered), comparison slider, lightbox (native `<dialog>`; without JS gallery links open the image), copy email, the compose form, scroll motion and the motion toggle. localStorage access is wrapped in try/catch.
- The Contact page's compose form builds a `mailto:` link and opens the visitor's email app; the page says nothing is sent from it. There is no email service; never show a fake "sent" message.
- Images: `assets/<name>.webp` (≤1800px), `assets/thumbs/<name>.webp` (≤960×1200) and, for the two full-bleed heroes, `assets/wide/<name>.webp` (2400px). The build puts every available size into `srcset` and reads WebP dimensions itself. `assets/sources.json` maps every file to its original. Images under 700px wide render at native size in galleries.
- Paths are relative; nested pages use `../` or `../../`. `404.html` alone uses absolute `/mingkey-homepage/` paths because Pages serves it at any depth.
- Every page has a canonical URL, Open Graph/Twitter tags and a sitemap entry; `robots.txt` points to the sitemap. Social images are WebP.
- Videos open on YouTube/Vimeo in a new tab. There are no embedded players; preview images are the videos' own thumbnails.

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
