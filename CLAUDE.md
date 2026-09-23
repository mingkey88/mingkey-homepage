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

Plain static HTML/CSS/JS. No framework, build step, server backend or secrets. Hosted from the `main` branch root via GitHub Pages. Keep paths relative; nested pages must account for their directory depth. Prefer `work/index.html`, `about/index.html`, and `work/project-name/index.html` routes that work as static directories. Do not introduce history-based SPA routing without a Pages-compatible plan.

Working features: category filters, six project dialogs, responsive mobile menu, keyboard-operable render/wireframe range comparison, film links to YouTube, mailto contact, reduced-motion support and a footer motion toggle, focus styles and native dialog focus management. The film opens directly on YouTube in a new tab; there is no embedded third-party player. A dynamic embed remained blank during local browser testing, so it was replaced with an explicit direct link. Primary navigation currently points to homepage anchors.

Project metadata is in the `projects` object in `script.js`; cards are in `index.html`. If expanding the portfolio, centralize the data to avoid maintaining both manually. `assets/sources.json` gives source URLs for full originals. Shipped artwork is optimized WebP, up to 1800px. All visible project descriptions are short editorial summaries of the artwork, not verified production credits or dates.

## Source pages and verified facts

- Home: https://mingjietan88.wixsite.com/mingkey
- About: https://mingjietan88.wixsite.com/mingkey/about
- 3D gallery: https://mingjietan88.wixsite.com/mingkey/3dworks
- Illustrations and graphic design: https://mingjietan88.wixsite.com/mingkey/illustrations
- Films/projects: https://mingjietan88.wixsite.com/mingkey/projects
- Contact: https://mingjietan88.wixsite.com/mingkey/contact

Mingjie Tan is a CG artist from Singapore. The old bio lists character design, illustrations, 3D modelling, motion graphics and graphic design. It lists Adobe Photoshop, After Effects, Premiere, Autodesk 3ds Max and Mudbox; treat that as historical information, not proof of current proficiency or employment. Do not invent clients, awards, dates, outcomes, availability, job titles or years of experience.

The old contact page has an apparent typo (`gmil.com`). The connected Wix site's contact email was `mingjie.tan88@gmail.com`; that is the address used in this homepage. Ask the user if they want a different public contact address. The phone number and old resume were deliberately not republished because this homepage does not need them; verify currency before adding them.

### Films

**What the Flying Object / WTFO** — https://www.youtube.com/watch?v=ilIMWmxm-Jc

A solo short about an alien mechanic trying to operate his UFO's tractor beam. The old project page explicitly says Mingjie handled everything from concept through modelling, rigging and effects. The alien wireframe is used as the homepage film preview. Use the existing YouTube video rather than inventing a showreel.

**Sakokira — Pachinko Vs Ararush** — listed on the original Projects page with a Vimeo embed. Not yet migrated. It is a group 2D short: Mingjie was the effects artist and animated effects plus some character shots. Listed collaborators: Samuel Kambey, Wilson Halim, Bobbie Teo, Weatherly Tan and Chris Ong, alongside Mingjie. Preserve collaboration credits; do not imply solo authorship.

The original 3D gallery has 3 pages; digital paintings and graphic design each have 2 pages. Only selected artwork has been migrated. Inspect all gallery pages, images and any subnavigation to finish the migration. Exclude default Wix social links (the original footer links to Wix/Flickr defaults).

## Suggested next work

1. Build a full portfolio index with 3D, illustration, graphic design and motion categories.
2. Build individual case-study pages from the original source material; use artwork, process imagery, truthful role information and full-size galleries.
3. Add a dedicated About page using the verified bio, asking the user for updated information where needed.
4. Add a Contact page. A mailto link works immediately. A form needs a genuine configured service; never show a fake success response.
5. Migrate remaining artwork and the group film, preserving titles and credits. Keep the old Wix site untouched.
6. Replace homepage archive links/dialog CTAs with the new pages once they exist.
7. Add page-specific metadata, social images, sitemap and canonical URLs when the route structure is settled.
8. Verify keyboard, mobile, filters, galleries, video fallback, links and nested Pages paths before pushing.

## Useful commands

```sh
python3 -m http.server 4173
node --check script.js
git add .
git commit -m "Expand portfolio pages"
git push origin main
```

Keep the user-facing site free of migration notes and implementation instructions. This file and README are the handoff, not content for the rendered page.
