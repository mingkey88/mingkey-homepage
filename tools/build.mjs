#!/usr/bin/env node
// Generates every page of the site from data/projects.mjs. No dependencies.
//
//   node tools/build.mjs
//
// Writes index.html, work/, work/<slug>/, about/, contact/, 404.html and
// sitemap.xml. The output is committed; GitHub Pages serves it as plain
// static files. Page copy for the homepage, About and Contact lives in the
// templates below; project copy lives in data/projects.mjs.

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, categories, projects } from '../data/projects.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Bump when styles.css or script.js change so browsers skip stale caches.
const VERSION = 'brave-1';
const BASE_PATH = new URL(site.url).pathname; // "/mingkey-homepage/"
const mailto = `mailto:${site.email}`;
const FILM_URL = 'https://www.youtube.com/watch?v=ilIMWmxm-Jc';

const esc = (value = '') => String(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = n => String(n).padStart(2, '0');
const write = (path, html) => {
  mkdirSync(dirname(join(ROOT, path)), { recursive: true });
  writeFileSync(join(ROOT, path), html);
};
const bySlug = slug => projects.find(project => project.slug === slug);

// ---------------------------------------------------------------- images

const sizeCache = new Map();
function webpSize(file) {
  if (sizeCache.has(file)) return sizeCache.get(file);
  const path = join(ROOT, file);
  if (!existsSync(path)) throw new Error(`Missing image: ${file}`);
  const b = readFileSync(path);
  const chunk = b.toString('ascii', 12, 16);
  let size;
  if (chunk === 'VP8 ') size = { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  else if (chunk === 'VP8L') { const bits = b.readUInt32LE(21); size = { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 }; }
  else if (chunk === 'VP8X') size = { w: b.readUIntLE(24, 3) + 1, h: b.readUIntLE(27, 3) + 1 };
  else throw new Error(`Unrecognised WebP: ${file}`);
  sizeCache.set(file, size);
  return size;
}

// Every available size of an image (thumbs ≤960, full ≤1800, wide ≤2400)
// goes into srcset; `size` picks the fallback src.
function img(name, alt, p, { sizes = '(max-width: 760px) 100vw, 50vw', lazy = true, size = 'thumb', attrs = '' } = {}) {
  const variants = [['thumbs/', 'thumb'], ['', 'full'], ['wide/', 'wide']]
    .map(([dir, key]) => ({ key, file: `assets/${dir}${name}.webp` }))
    .filter(variant => existsSync(join(ROOT, variant.file)))
    .map(variant => ({ ...variant, ...webpSize(variant.file) }));
  if (!variants.length) throw new Error(`Missing image: ${name}`);
  const widths = [...new Map(variants.map(variant => [variant.w, variant])).values()].sort((a, b) => a.w - b.w);
  const main = variants.find(variant => variant.key === size) || variants.find(variant => variant.key === 'full');
  const srcset = widths.length > 1 ? ` srcset="${widths.map(variant => `${p}${variant.file} ${variant.w}w`).join(', ')}" sizes="${sizes}"` : '';
  return `<img src="${p}${main.file}"${srcset} alt="${esc(alt)}" width="${main.w}" height="${main.h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'}${attrs}>`;
}

// ---------------------------------------------------------------- small parts

const star = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c.7 6.3 5.7 11.3 12 12-6.3.7-11.3 5.7-12 12-.7-6.3-5.7-11.3-12-12C6.3 11.3 11.3 6.3 12 0z" fill="currentColor"/></svg>';
const globe = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.8 3.9 6 3.9 9.5s-1.3 6.7-3.9 9.5c-2.6-2.8-3.9-6-3.9-9.5s1.3-6.7 3.9-9.5z"/></svg>';
const icons = {
  sketch: '<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 32l3-9L27 7l6 6-16 16-9 3z"/><path d="M24 10l6 6M11 23l6 6"/></svg>',
  model: '<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 4l14 8v16l-14 8-14-8V12z"/><path d="M6 12l14 8 14-8M20 20v16"/></svg>',
  sculpt: '<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 34h22M12 34c0-6 3-8 3-13a5 5 0 0110 0c0 5 3 7 3 13"/><circle cx="20" cy="10" r="5"/></svg>',
  animate: '<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="9" width="32" height="22" rx="2"/><path d="M17 15v10l8-5z"/><path d="M4 35h32"/></svg>',
  mail: '<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 9h30v22H5z"/><path d="M5 9l15 12L35 9"/></svg>',
  pin: '<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 36s11-11.5 11-20a11 11 0 00-22 0c0 8.5 11 20 11 20z"/><circle cx="20" cy="16" r="4"/></svg>',
  grid: '<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6h12v12H6zM22 6h12v12H22zM6 22h12v12H6zM22 22h12v12H22z"/></svg>',
};

const pill = (href, text, { variant = '', external = false } = {}) =>
  `<a class="pill${variant ? ` ${variant}` : ''}" href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text} ${star}</a>`;
const labelRow = (text, number) => `<div class="label-row"><span>${text}</span><span>(${number})</span></div>`;
const sideLabel = (text, number) => `<div class="side-label" aria-hidden="true"><span>${text}</span><span>(${number})</span></div>`;
const lines = list => list.map(line => `<span class="hero-line"><span>${esc(line)}</span></span>`).join('');
const marqueeRow = (text, repeat = 6) => {
  const half = Array.from({ length: repeat }, () => `<span>${esc(text)}</span><span class="marquee-star">✳</span>`).join('');
  return `<div class="marquee-track">${half}${half}</div>`;
};
const viewToggle = '<div class="view-toggle" role="group" aria-label="Project layout" hidden><button type="button" data-view="grid" aria-pressed="true">Grid</button><button type="button" data-view="list" aria-pressed="false">List</button></div>';

function videoUrl(video) {
  return video.platform === 'vimeo' ? `https://vimeo.com/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`;
}
const platformName = video => (video.platform === 'vimeo' ? 'Vimeo' : 'YouTube');

// ---------------------------------------------------------------- layout

function head({ title, description, path, image, p, type = 'website', noindex = false }) {
  const url = site.url + path;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f1ebe1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">${noindex ? '\n  <meta name="robots" content="noindex">' : `\n  <link rel="canonical" href="${url}">`}
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="${type}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${site.url}assets/${image}.webp">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="${p}favicon.svg" type="image/svg+xml">
  <link rel="preload" href="${p}assets/fonts/OverusedGrotesk-VF.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${p}styles.css?v=${VERSION}">
  <script src="${p}script.js?v=${VERSION}" defer></script>
</head>`;
}

function header(p, current, overlay) {
  const home = p || './';
  const items = [[home, 'Home', 'home'], [`${p}work/`, 'Work', 'work'], [`${p}about/`, 'About', 'about'], [`${p}contact/`, 'Contact', 'contact']];
  return `  <div class="scroll-progress" aria-hidden="true"></div>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header${overlay ? ' is-overlay' : ''}" id="top">
    <a class="wordmark" href="${home}" aria-label="Mingkey home">Mingkey<span aria-hidden="true">✳</span></a>
    <span class="coords">${globe}${site.coordinates}</span>
    <nav id="navigation" aria-label="Main navigation">${items.map(([href, text, key]) => `<a href="${href}"${current === key ? ' aria-current="page"' : ''}>${text}</a>`).join('')}</nav>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation"><span class="sr-only">Menu</span><span class="menu-lines" aria-hidden="true"></span></button>
  </header>`;
}

function footer(p) {
  return `  <footer class="site-footer">
    <div class="footer-top">
      <div class="footer-cta"><p>Got a what if?</p><a class="pill pill-light pill-small" href="${p}contact/">Let’s talk ${star}</a></div>
      <nav class="footer-nav" aria-label="Footer"><a href="${p}work/">Work</a><a href="${p}about/">About</a><a href="${p}contact/">Contact</a></nav>
      <div class="footer-contact"><a href="${mailto}">${site.email}</a><span>Based in ${site.location}</span></div>
      <a class="back-top" href="#top"><span aria-hidden="true">↑</span>Back to top</a>
    </div>
    <div class="footer-mark">
      <div class="marquee" aria-hidden="true">${marqueeRow('Mingkey', 5)}</div>
      <div class="marquee marquee-reverse" aria-hidden="true">${marqueeRow('Make it unexpected', 3)}</div>
      <a class="talk-badge" href="${p}contact/" aria-label="Let’s talk: go to the contact page"><svg class="badge-ring" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="badge-circle" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0"/></defs><text><textPath href="#badge-circle" textLength="462" lengthAdjust="spacing">LET’S TALK • SAY HELLO • LET’S TALK • SAY HELLO •</textPath></text></svg><span aria-hidden="true">↗</span></a>
    </div>
    <div class="footer-bottom"><span>© <span id="year">2026</span> ${site.owner}</span><span>CG artist, ${site.location}</span><button class="motion-toggle" type="button" aria-pressed="true">Motion on</button></div>
  </footer>`;
}

function page({ depth, current, main, overlay = false, ...meta }) {
  const p = meta.absolute ? BASE_PATH : '../'.repeat(depth);
  return `${head({ ...meta, p })}
<body>
${header(p, current, overlay)}
  <main id="main">
${main(p)}
  </main>
${footer(p)}
</body>
</html>
`;
}

// ---------------------------------------------------------------- shared sections

function card(project, index, p, sizes = '(max-width: 760px) 100vw, 50vw') {
  const c = project.indexCard || project.card;
  const media = ['card-media', c.fit === 'contain' && 'fit-contain', c.tone && `tone-${c.tone}`].filter(Boolean).join(' ');
  const style = c.position ? ` style="--position:${c.position}"` : '';
  const tags = project.categories.map(key => `<span>${esc(categories[key])}</span>`).join('');
  return `<a class="card" href="${p}work/${project.slug}/" data-category="${project.categories.join(' ')}"><span class="${media}"${style}>${img(c.image, c.alt, p, { sizes })}</span><span class="card-number">${pad(index + 1)}</span><span class="card-title">${esc(project.title)}</span><span class="card-label">${esc(project.label)}</span><span class="card-tags">${tags}</span><span class="card-arrow" aria-hidden="true">↗</span></a>`;
}

function contactBand(p) {
  return `
    <section class="contact-band" aria-labelledby="band-title">
      <div class="marquee marquee-ink" aria-hidden="true">${marqueeRow('Let’s talk', 4)}</div>
      <div class="band-body"><h2 class="sr-only" id="band-title">Let’s talk</h2><p class="indent">Got a what if? Tell me about the character, creature or world you have in mind, and let’s see where the idea can go.</p>${pill(`${p}contact/`, 'Say hello', { variant: 'pill-outline' })}</div>
    </section>`;
}

function stepCards(p) {
  const steps = [
    ['sketch', 'Sketch', 'Pencil variations, turnarounds and expression sheets come first.', 'work/what-the-flying-object/'],
    ['model', 'Model', 'Characters, creatures and cars, built in 3ds Max and Mudbox.', 'work/nissan-350z/'],
    ['sculpt', 'Sculpt', 'Dohva was sculpted by hand in Sculpey clay, then baked.', 'work/dohva/'],
    ['animate', 'Animate', 'Rigging, effects and animation bring it to the screen.', 'work/what-the-flying-object/'],
  ];
  return steps.map(([icon, title, text, href]) => `<a class="step-card" href="${p}${href}"><span class="step-inner"><span class="step-head">${icons[icon]}<strong>${title}</strong></span><span class="step-body">${text}</span></span></a>`).join('');
}

// ---------------------------------------------------------------- homepage

function homePage() {
  const featured = projects.filter(project => project.featured);
  const heroList = [
    ['Character design', 'work/what-the-flying-object/'],
    ['Illustration', 'work/#illustration'],
    ['3D & sculpture', 'work/#3d'],
    ['Motion', 'work/#motion'],
  ];
  const disciplines = [
    ['Character design', 'Heroes, creatures and one very stressed alien mechanic, from rough sketch to turnaround.', ['Sketching', 'Turnarounds', 'Expressions'], 'work/what-the-flying-object/'],
    ['Illustration', 'Digital paintings with warm light, strong silhouettes and a little menace.', ['Digital painting', 'Characters', 'Fan art'], 'work/#illustration'],
    ['3D & sculpture', 'Characters, creatures and cars built in 3D, and a dragon sculpted in clay.', ['3ds Max', 'Mudbox', 'Sculpey clay'], 'work/#3d'],
    ['Motion', 'A solo animated short, and effects animation for a film made with friends.', ['Rigging', 'Effects', 'Animation'], 'work/#motion'],
    ['Graphic design', 'A poster trial, web banners and app screens.', ['Posters', 'Banners', 'App screens'], 'work/#design'],
  ];
  const films = [
    ['what-the-flying-object', 'video-wtfo', 'The alien mechanic beside a glowing tractor beam inside his UFO', 'What the Flying Object', 'Solo animated short · YouTube'],
    ['saikokira', 'video-saikokira', 'Title card reading “Iron Fist” in fiery letters, from Saikokira', 'Saikokira — Pachinko vs Ararush', 'Group 2D short · Vimeo'],
    ['dohva', 'video-dohva', 'The clay dragon Dohva on its rocky base', 'Dohva, dragon sculpture', 'Sculpture video · YouTube'],
  ];
  return page({
    depth: 0,
    current: 'home',
    overlay: true,
    path: '',
    title: 'Mingkey — Make it unexpected.',
    description: 'The portfolio of Mingjie Tan, a CG artist in Singapore. Explore character design, 3D modelling, illustration and animation.',
    image: 'companion',
    main: p => `    <section class="hero" aria-labelledby="hero-title">
      ${img('companion', 'Companion: an armoured dragon alongside a warrior, painted in warm amber tones', p, { size: 'full', sizes: '100vw', lazy: false, attrs: ' class="hero-bg"' })}
      <div class="hero-shade" aria-hidden="true"></div>
      <h1 class="hero-title" id="hero-title">${lines(['Mingkey', 'CG artist'])}</h1>
      <div class="hero-bottom">
        <div class="hero-list"><p>What I do <span aria-hidden="true">↘</span></p><ol>${heroList.map(([text, href], i) => `<li><a href="${p}${href}"><span>${text}</span><span>${pad(i + 1)}</span></a></li>`).join('')}</ol></div>
        <div class="hero-intro"><p>Mingjie Tan is a CG artist from Singapore, making characters, creatures and the worlds they live in. A little offbeat. Always made with care.</p>${pill(`${p}work/`, 'View the work', { variant: 'pill-light' })}</div>
      </div>
    </section>
    <section class="split section" aria-labelledby="about-title">
      ${sideLabel('About me', '01')}
      <div class="split-copy"><h2 id="about-title">Serious about craft.<br>Playful by nature.</h2><p class="indent">I’m Mingjie, a CG artist and curious mind based in Singapore. I turn what-ifs into characters, imagined worlds and moving images. A little offbeat. Always made with care.</p>${pill(`${p}about/`, 'More about me', { variant: 'pill-outline' })}</div>
      <a class="split-art" href="${p}work/king-kong/" aria-label="King Kong: see the project">${img('king-kong', 'King Kong, an armoured gorilla warrior with an axe against an orange sky', p, { sizes: '(max-width: 760px) 100vw, 30vw' })}</a>
    </section>
    <section class="mission section" aria-labelledby="mission-title">
      <div class="mission-label">${labelRow('My process', '02')}</div>
      <h2 class="sr-only" id="mission-title">Sketch, sculpt, animate</h2>
      <div class="mission-grid">
        <div class="mw mw-1" data-drift="1" aria-hidden="true">Sketch<span class="mw-num">001</span></div>
        <a class="mission-art" href="${p}work/dohva/" aria-label="Dohva, the clay dragon: see the project">${img('dohva-3', 'The clay dragon Dohva facing forward with wings spread', p, { sizes: '(max-width: 760px) 40vw, 16vw' })}</a>
        <div class="mw mw-2" data-drift="-1" aria-hidden="true">Sculpt<span class="mw-num">002</span></div>
        <div class="mw mw-3" data-drift="1" aria-hidden="true">Animate<span class="mw-num">003</span></div>
        <p class="mission-copy caps-copy">Every piece starts as a rough idea on paper, then takes shape in paint, polygons or clay. Some of them end up moving on screen.</p>
      </div>
    </section>
    <section class="showcase" aria-labelledby="film-title">
      <div class="stage-sticky"><div class="stage-canvas">
        ${img('video-wtfo', 'Still from What the Flying Object: the alien mechanic at a console beside a glowing tractor beam', p, { size: 'full', sizes: '100vw', attrs: ' class="stage-photo"' })}
        <div class="stage-shade" aria-hidden="true"></div>
        <div class="stage-top"><span>In motion</span><span>Solo animated short</span></div>
        <h2 class="stage-title" id="film-title">What the<br>Flying Object</h2>
        <a class="stage-play" href="${FILM_URL}" target="_blank" rel="noopener noreferrer" aria-label="Watch What the Flying Object on YouTube (opens a new tab)"><span class="play-circle" aria-hidden="true">▶</span><span>Watch on YouTube ↗</span></a>
        <div class="stage-bottom"><span>A UFO. A stubborn tractor beam. One determined mechanic.</span><a href="${p}work/what-the-flying-object/">See how it was made ↗</a></div>
      </div></div>
    </section>
    <section class="disciplines dark section" aria-labelledby="disc-title">
      ${labelRow('Disciplines', '03')}
      <h2 class="sr-only" id="disc-title">Disciplines</h2>
      <ol class="disc-list">${disciplines.map(([name, text, tags, href], i) => `<li><a href="${p}${href}"><span class="disc-name">${name}</span><span class="disc-text">${text}</span><span class="disc-tags">${tags.map(tag => `<span>${tag}</span>`).join('')}</span><span class="disc-num">${pad(i + 1)}</span></a></li>`).join('')}</ol>
      ${pill(`${p}work/`, 'View all work', { variant: 'pill-light' })}
    </section>
    <section class="work section" aria-labelledby="work-title">
      ${labelRow('Portfolio', '04')}
      <div class="work-head"><h2 class="giant" id="work-title">${lines(['Selected', 'work'])}</h2><div class="work-meta"><p>${projects.length} projects<br>3D, illustration, design and motion</p>${viewToggle}</div></div>
      <div class="cards">
        ${featured.map((project, i) => card(project, i, p)).join('\n        ')}
      </div>
      <div class="work-foot"><p class="caps-copy">Characters, creatures, machines, paintings and films, from the first sketch to the final frame.</p>${pill(`${p}work/`, 'View all projects', { variant: 'pill-outline' })}</div>
    </section>
    <section class="behind dark section" aria-labelledby="behind-title">
      ${sideLabel('Behind the work', '05')}
      <div class="behind-main">
        <h2 id="behind-title">No magic.<br>Just making.</h2>
        <p>Every finished image starts with a little structure. Drag to look beneath the surface of the 350Z.</p>
        <div class="comparison" style="--split:50%">${img('350z', 'Finished red Nissan 350Z render', p, { size: 'full', sizes: '(max-width: 760px) 100vw, 50vw' })}<div class="wire-layer">${img('car-wire', 'Wireframe structure of the same Nissan 350Z', p, { size: 'full', sizes: '(max-width: 760px) 100vw, 50vw' })}</div><div class="comparison-divider" aria-hidden="true"><span>↔</span></div><div class="comparison-labels" aria-hidden="true"><span>Wireframe</span><span>Render</span></div><label class="sr-only" for="comparison-range">Reveal wireframe: adjust the image comparison</label><input id="comparison-range" type="range" min="0" max="100" value="50" aria-valuetext="50 percent wireframe visible"></div>
      </div>
      <div class="step-cards">${stepCards(p)}</div>
    </section>
    <section class="films section" aria-labelledby="films-title">
      ${labelRow('In motion', '06')}
      <div class="films-head"><h2 class="giant" id="films-title">${lines(['Films /'])}</h2><div><p class="caps-copy">A solo animated short, a film made with friends, and a video of a dragon sculpted in clay.</p>${pill(`${p}work/#motion`, 'All motion work', { variant: 'pill-outline' })}</div></div>
      <div class="film-cards">${films.map(([slug, image, alt, title, meta]) => `<a class="film-card" href="${p}work/${slug}/"><span class="capsule">${img(image, alt, p, { sizes: '(max-width: 760px) 100vw, 33vw' })}</span><strong>${title}</strong><span class="film-meta">${meta}</span></a>`).join('')}</div>
    </section>`,
  });
}

// ---------------------------------------------------------------- work index

function filterButtons(list) {
  const count = key => list.filter(project => project.categories.includes(key)).length;
  const buttons = [`<button class="active" data-filter="all" aria-pressed="true">All work <sup>${pad(list.length)}</sup></button>`];
  for (const [key, text] of Object.entries(categories)) {
    if (count(key)) buttons.push(`<button data-filter="${key}" aria-pressed="false">${esc(text)} <sup>${pad(count(key))}</sup></button>`);
  }
  return buttons.join('');
}

function workIndex() {
  return page({
    depth: 1,
    current: 'work',
    overlay: true,
    path: 'work/',
    title: 'Work — Mingkey',
    description: `All ${projects.length} projects by Singapore CG artist Mingjie Tan: characters, creatures, 3D models, a clay sculpture, digital paintings, graphic design and animated short films.`,
    image: 'ararush',
    main: p => `    <section class="image-hero" aria-labelledby="page-title">
      ${img('ararush', 'Ararush in 3D: a stone creature with glowing lava cracks, holding a molten sphere', p, { size: 'full', sizes: '100vw', lazy: false, attrs: ' class="hero-bg"' })}
      <div class="hero-shade" aria-hidden="true"></div>
      <h1 class="giant" id="page-title">${lines(['Selected', 'work'])}</h1>
      <div class="hero-meta"><span>3D, illustration, design and motion</span><span>(${projects.length} projects)</span><a href="#projects">Scroll down <span aria-hidden="true">↘</span></a></div>
    </section>
    <section class="work section" id="projects" aria-label="Projects">
      <div class="work-controls"><div class="filters" role="group" aria-label="Filter projects" data-sync-hash>${filterButtons(projects)}</div>${viewToggle}</div>
      <p class="sr-only" id="filter-status" role="status" aria-live="polite">Showing ${projects.length} projects.</p>
      <div class="cards">
        ${projects.map((project, i) => card(project, i, p)).join('\n        ')}
      </div>
    </section>${contactBand(p)}`,
  });
}

// ---------------------------------------------------------------- case studies

function videoCard(video, p) {
  return `<a class="video-card" href="${videoUrl(video)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(`Watch ${video.title} on ${platformName(video)} (opens a new tab)`)}"><span class="video-thumb">${img(video.thumb, video.alt, p)}<span class="play-circle" aria-hidden="true">▶</span></span><span class="video-caption"><strong>${esc(video.label || video.title)}</strong><span>${video.note ? `${esc(video.note)} · ` : ''}${platformName(video)} ↗</span></span></a>`;
}

function projectPage(project, index) {
  const total = projects.length;
  const videos = project.videos || [];
  const heroVideo = videos.find(video => video.thumb === project.hero);
  const otherVideos = videos.filter(video => video !== heroVideo);
  // The lead image opens the lightbox too, so drop it from the gallery below.
  const groups = (project.gallery || [])
    .map(group => ({ ...group, items: group.items.filter(item => item.image !== project.hero) }))
    .filter(group => group.items.length);
  const heroItem = (project.gallery || []).flatMap(group => group.items).find(item => item.image === project.hero);
  const heroAlt = heroItem?.alt || project.card.alt;
  const related = (project.related || []).map(bySlug).filter(Boolean);
  const explore = [...related];
  for (let step = 1; explore.length < 2; step++) {
    const candidate = projects[(index + step) % total];
    if (candidate !== project && !explore.includes(candidate)) explore.push(candidate);
  }
  const facts = [
    { term: 'Discipline', detail: esc(project.label) },
    ...(project.facts || []).map(fact => ({ term: esc(fact.term), detail: esc(fact.detail) })),
    { term: 'Filed under', detail: project.categories.map(key => `<a href="../#${key}">${esc(categories[key])}</a>`).join(', ') },
  ];
  const heroSize = webpSize(`assets/${project.hero}.webp`);
  const portrait = !heroVideo && heroSize.h > heroSize.w;
  const displayLines = project.display || [project.title];

  let counter = 0;
  const galleryItem = (item, p) => {
    counter += 1;
    const full = webpSize(`assets/${item.image}.webp`);
    return `<figure class="gallery-item"><a class="gallery-link" href="${p}assets/${item.image}.webp" data-lightbox data-caption="${esc(item.caption)}" data-width="${full.w}" data-height="${full.h}" aria-label="${esc(`View larger: ${item.caption}`)}"><span class="gallery-frame">${img(item.image, item.alt, p, { attrs: full.w < 700 ? ' class="native"' : '' })}</span></a><figcaption><span>${pad(counter)}</span>${esc(item.caption)}</figcaption></figure>`;
  };

  return page({
    depth: 2,
    current: 'work',
    path: `work/${project.slug}/`,
    title: `${project.title} — Mingkey`,
    description: `${project.summary} From the portfolio of Singapore CG artist Mingjie Tan.`,
    image: project.hero,
    type: 'article',
    main: p => {
      const lead = heroVideo
        ? `<a class="project-film" href="${videoUrl(heroVideo)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(`Watch ${heroVideo.title} on ${platformName(heroVideo)} (opens a new tab)`)}">${img(project.hero, heroVideo.alt, p, { size: 'full', sizes: '100vw', lazy: false })}<span class="film-overlay"><span class="play-circle" aria-hidden="true">▶</span><span>${esc(heroVideo.label || 'Watch')} on ${platformName(heroVideo)} ↗</span></span></a>`
        : `<a class="lead-link" href="${p}assets/${project.hero}.webp" data-lightbox data-caption="${esc(heroItem?.caption || project.title)}" data-width="${heroSize.w}" data-height="${heroSize.h}" aria-label="${esc(`View larger: ${project.title}`)}">${img(project.hero, heroAlt, p, { size: 'full', sizes: portrait ? '(max-width: 760px) 100vw, 60vw' : '100vw', lazy: false })}<span class="lead-zoom" aria-hidden="true">+</span></a>`;
      const actions = videos.map((video, i) => pill(videoUrl(video), `${esc(video.label || 'Watch the video')} on ${platformName(video)}`, { variant: i ? 'pill-outline' : '', external: true })).join('');
      const videoSection = otherVideos.length ? `
    <section class="project-videos section" aria-labelledby="videos-title">
      <div class="label-row"><h2 id="videos-title">${otherVideos.length > 1 ? 'Videos' : 'Video'}</h2><span>(${pad(otherVideos.length)})</span></div>
      <div class="video-grid${otherVideos.length === 1 ? ' single' : ''}">${otherVideos.map(video => videoCard(video, p)).join('')}</div>
    </section>` : '';
      const gallery = groups.map((group, g) => `
    <section class="gallery-group section" aria-labelledby="gallery-${g}">
      <div class="label-row"><h2 id="gallery-${g}">${esc(group.heading || 'More views')}</h2><span>(${pad(g + 1)})</span></div>
      ${group.text ? `<p class="gallery-text">${esc(group.text)}</p>` : ''}
      <div class="gallery-grid${group.items.length === 1 ? ' single' : ''}">${group.items.map(item => galleryItem(item, p)).join('')}</div>
    </section>`).join('');
      return `    <section class="project-head" aria-labelledby="page-title">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Work</a><span aria-hidden="true">/</span><span aria-current="page">${esc(project.title)}</span></nav>
      <h1 class="giant" id="page-title">${lines(displayLines)}</h1>
      <div class="hero-meta"><span>${esc(project.label)}</span><span>(Project ${pad(index + 1)} / ${pad(total)})</span><a href="#overview">Scroll down <span aria-hidden="true">↘</span></a></div>
    </section>
    <div class="project-lead${portrait ? ' is-portrait' : ''}">${lead}</div>
    <section class="overview section" id="overview" aria-labelledby="overview-title">
      <h2 class="overview-title" id="overview-title">Overview</h2>
      <div class="overview-body">${project.intro.map(text => `<p class="indent">${esc(text)}</p>`).join('')}${project.notice ? `<p class="small-print">${esc(project.notice)}</p>` : ''}<dl class="facts">${facts.map(fact => `<div><dt>${fact.term}</dt><dd>${fact.detail}</dd></div>`).join('')}</dl>${actions ? `<div class="overview-actions">${actions}</div>` : ''}</div>
    </section>${videoSection}${gallery}
    <section class="explore section" aria-labelledby="explore-title">
      ${labelRow(related.length ? 'Related projects' : 'More projects', '#')}
      <div class="explore-head"><h2 class="giant" id="explore-title">${lines(['Explore', 'more'])}</h2><div><p class="caps-copy">Characters, creatures, machines, paintings and films from the rest of the archive.</p>${pill('../', 'View all projects', { variant: 'pill-outline' })}</div></div>
      <div class="cards">${explore.map(other => card(other, projects.indexOf(other), p)).join('')}</div>
    </section>`;
    },
  });
}

// ---------------------------------------------------------------- about

function aboutPage() {
  const tools = [
    ['Autodesk 3ds Max', 'Modelling', ['what-the-flying-object', 'nissan-350z']],
    ['Autodesk Mudbox', 'Digital sculpting and texturing', ['swamp-hydra']],
    ['Adobe Photoshop', 'Texturing', ['what-the-flying-object']],
    ['NVIDIA mental ray', 'Rendering', ['nissan-350z']],
    ['Sculpey clay', 'Traditional sculpture', ['dohva']],
    ['Adobe After Effects', 'Motion graphics', []],
    ['Adobe Premiere', 'Editing', []],
  ];
  return page({
    depth: 1,
    current: 'about',
    path: 'about/',
    title: 'About Mingjie Tan — Mingkey',
    description: 'Mingjie Tan is a CG artist from Singapore working across character design, illustration, 3D modelling, motion graphics and graphic design, and a digital marketing executive and web developer at achates360.',
    image: 'alien-mechanic',
    main: p => `    <section class="project-head" aria-labelledby="page-title">
      <h1 class="giant" id="page-title">${lines(['Hi, I’m', 'Mingjie'])}</h1>
      <div class="hero-meta"><span>Based in ${site.location}</span><span>(CG artist)</span><a href="#statement">Scroll down <span aria-hidden="true">↘</span></a></div>
    </section>
    <div class="collage">
      <a href="${p}work/what-the-flying-object/">${img('alien-mechanic', 'Painted character art of the alien mechanic from What the Flying Object', p, { sizes: '(max-width: 760px) 34vw, 30vw' })}</a>
      <a href="${p}work/vampire-hunter-kate/">${img('kate', 'Vampire Hunter Kate, a woman in a wide-brimmed hat and red coat', p, { sizes: '(max-width: 760px) 34vw, 30vw' })}</a>
      <a href="${p}work/spartan/">${img('spartan-painting', 'Painting of a Spartan warrior with a crested helmet, spear and shield', p, { sizes: '(max-width: 760px) 34vw, 30vw' })}</a>
    </div>
    <section class="statement section" id="statement" aria-label="Introduction">
      <span class="statement-num">(01)</span>
      <p>I’m Mingjie, a CG artist from Singapore. I make characters, creatures and the worlds they live in, working across character design, illustration, 3D modelling, motion graphics and graphic design, often all on the same project.</p>
    </section>
    <div class="duo">
      <a href="${p}work/dohva/">${img('dohva-2', 'The clay dragon Dohva from its anatomical side, with muscles and ribs exposed', p, { sizes: '(max-width: 760px) 100vw, 34vw' })}</a>
      <a href="${p}work/what-the-flying-object/">${img('wtfo-environment', 'Painted interior of the UFO bay from What the Flying Object', p, { sizes: '(max-width: 760px) 100vw, 64vw' })}</a>
    </div>
    <section class="split section" aria-labelledby="now-title">
      ${sideLabel('Right now', '02')}
      <div class="split-copy"><h2 id="now-title">CG artist.<br>Web developer.</h2><p class="indent">These days I’m a digital marketing executive and web developer at achates360. This site brings together my CG and illustration archive. Thank you for visiting. If you’d like to work together, drop me an email.</p>${pill(`${p}contact/`, 'Get in touch', { variant: 'pill-outline' })}</div>
      <a class="split-art" href="${p}work/companion/" aria-label="Companion: see the project">${img('companion', 'Companion: an armoured dragon alongside a warrior, painted in warm amber tones', p, { sizes: '(max-width: 760px) 100vw, 30vw' })}</a>
    </section>
    <section class="toolkit section" aria-labelledby="tools-title">
      ${labelRow('Toolkit', '03')}
      <div class="toolkit-grid">
        <div><h2 class="toolkit-title" id="tools-title">Tools across<br>the archive</h2><p class="caps-copy">The software and materials used across the projects on this site.</p>${pill(`${p}work/`, 'View all projects', { variant: 'pill-outline' })}</div>
        <table class="tool-table"><thead><tr><th scope="col">Tool</th><th scope="col">Used for</th><th scope="col">Where to see it</th></tr></thead><tbody>${tools.map(([tool, use, slugs]) => `<tr><th scope="row">${tool}</th><td>${use}</td><td>${slugs.length ? slugs.map(slug => `<a href="${p}work/${slug}/">${esc(bySlug(slug).title)}</a>`).join(', ') : '—'}</td></tr>`).join('')}</tbody></table>
      </div>
    </section>`,
  });
}

// ---------------------------------------------------------------- contact

function contactPage() {
  const subject = encodeURIComponent('Hello Mingjie');
  return page({
    depth: 1,
    current: 'contact',
    path: 'contact/',
    title: 'Contact — Mingkey',
    description: 'Get in touch with Mingjie Tan, a CG artist based in Singapore.',
    image: 'companion',
    main: p => `    <section class="contact-hero section" aria-labelledby="page-title">
      <div class="contact-intro">
        <h1 class="giant" id="page-title">${lines(['Let’s work', 'together'])}</h1>
        <p class="indent">Got a what if? Whether it’s a character, a creature or a whole world, drop me a line and tell me about it.</p>
        <a class="contact-email" href="${mailto}?subject=${subject}">${site.email}</a>
      </div>
      <a class="contact-art" href="${p}work/sinister-sunny/" aria-label="Sinister Sunny: see the project">${img('sunny', 'Sinister Sunny, a girl in a red dress holding a small doll, lit from behind', p, { sizes: '(max-width: 760px) 100vw, 40vw' })}</a>
    </section>
    <section class="info dark section" aria-labelledby="info-title">
      <h2 class="sr-only" id="info-title">Ways to reach me</h2>
      <div class="info-cards">
        <div class="step-card"><div class="step-inner"><div class="step-head">${icons.mail}<strong>Email</strong></div><div class="step-body"><p>The best way to reach me.</p><a href="${mailto}?subject=${subject}">${site.email}</a><button class="copy-email" type="button" data-copy="${site.email}" hidden>Copy address</button><span class="copy-status" role="status" aria-live="polite"></span></div></div></div>
        <div class="step-card"><div class="step-inner"><div class="step-head">${icons.pin}<strong>Based in</strong></div><div class="step-body"><p>${site.location} (GMT+8).</p><p>${site.coordinates}</p></div></div></div>
        <div class="step-card"><div class="step-inner"><div class="step-head">${icons.grid}<strong>The work</strong></div><div class="step-body"><p>${projects.length} projects across 3D, illustration, design and motion.</p><a href="${p}work/">Browse the archive ↗</a></div></div></div>
      </div>
    </section>
    <section class="compose section" aria-labelledby="compose-title">
      <div class="marquee marquee-ink" aria-hidden="true">${marqueeRow('Write to me', 4)}</div>
      <div class="compose-grid">
        <div><h2 class="compose-title" id="compose-title">Write your message here</h2><p class="indent">When you press the button, your email app opens with the message ready to send. Nothing is sent from this page.</p></div>
        <form class="compose-form" action="${mailto}" method="get" data-email="${site.email}">
          <label>Your name<input name="name" autocomplete="name" required></label>
          <label>Subject<input name="subject" value="Hello Mingjie" required></label>
          <label>Message<textarea name="body" rows="6" required></textarea></label>
          <button class="pill" type="submit">Open in my email app ${star}</button>
          <p class="compose-status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>`,
  });
}

// ---------------------------------------------------------------- 404

function notFoundPage() {
  // Served at any depth by GitHub Pages, so links use the absolute site path.
  return page({
    absolute: true,
    current: '',
    path: '404.html',
    title: 'Page not found — Mingkey',
    description: 'This page flew off somewhere.',
    image: 'video-wtfo',
    noindex: true,
    main: p => `    <section class="project-head not-found" aria-labelledby="page-title">
      <h1 class="giant" id="page-title">${lines(['404', 'Flew off'])}</h1>
      <div class="hero-meta"><span>Error 404</span><span>(Nothing to beam up here)</span><span></span></div>
      <p class="indent">The page you were looking for isn’t here. It may have moved when the portfolio was rebuilt.</p>
      <div class="overview-actions">${pill(p, 'Back to the homepage')}${pill(`${p}work/`, 'See all work', { variant: 'pill-outline' })}</div>
    </section>`,
  });
}

// ---------------------------------------------------------------- sitemap + run

function sitemap() {
  const paths = ['', 'work/', ...projects.map(project => `work/${project.slug}/`), 'about/', 'contact/'];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(path => `  <url><loc>${site.url}${path}</loc></url>`).join('\n')}
</urlset>
`;
}

const slugs = new Set();
for (const project of projects) {
  if (slugs.has(project.slug)) throw new Error(`Duplicate slug: ${project.slug}`);
  slugs.add(project.slug);
  for (const key of project.categories) if (!categories[key]) throw new Error(`${project.slug}: unknown category ${key}`);
  for (const slug of project.related || []) if (!bySlug(slug)) throw new Error(`${project.slug}: unknown related project ${slug}`);
}

// Remove case-study folders for projects that no longer exist.
if (existsSync(join(ROOT, 'work'))) {
  for (const entry of readdirSync(join(ROOT, 'work'), { withFileTypes: true })) {
    if (entry.isDirectory() && !slugs.has(entry.name)) rmSync(join(ROOT, 'work', entry.name), { recursive: true });
  }
}

write('index.html', homePage());
write('work/index.html', workIndex());
projects.forEach((project, i) => write(`work/${project.slug}/index.html`, projectPage(project, i)));
write('about/index.html', aboutPage());
write('contact/index.html', contactPage());
write('404.html', notFoundPage());
write('sitemap.xml', sitemap());
console.log(`Built homepage, work index, ${projects.length} project pages, about, contact, 404 and sitemap.`);
