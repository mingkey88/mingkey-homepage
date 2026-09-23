#!/usr/bin/env node
// Generates the static pages from data/projects.mjs. No dependencies.
//
//   node tools/build.mjs
//
// Writes work/, work/<slug>/, about/, contact/, 404.html and sitemap.xml,
// and refreshes the project grid between the build markers in index.html.
// The output is committed; GitHub Pages serves it as plain static files.

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, categories, projects } from '../data/projects.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Bump when styles.css or script.js change so browsers skip stale caches.
const VERSION = 'site-3';
const BASE_PATH = new URL(site.url).pathname; // "/mingkey-homepage/"
const mailto = `mailto:${site.email}`;

const esc = (value = '') => String(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = n => String(n).padStart(2, '0');
const write = (path, html) => {
  mkdirSync(dirname(join(ROOT, path)), { recursive: true });
  writeFileSync(join(ROOT, path), html);
};

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

// Grid-sized image with the full-size file as a high-density alternative.
function img(name, alt, p, { sizes = '(max-width: 700px) 100vw, 50vw', lazy = true, full = false, attrs = '' } = {}) {
  const fullFile = `assets/${name}.webp`;
  const thumbFile = `assets/thumbs/${name}.webp`;
  const big = webpSize(fullFile);
  const small = webpSize(thumbFile);
  const src = full ? fullFile : thumbFile;
  const { w, h } = full ? big : small;
  const srcset = !full && big.w > small.w ? ` srcset="${p}${thumbFile} ${small.w}w, ${p}${fullFile} ${big.w}w" sizes="${sizes}"` : '';
  return `<img src="${p}${src}"${srcset} alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'}${attrs}>`;
}

// ---------------------------------------------------------------- layout

function head({ title, description, path, image, p, type = 'website', noindex = false }) {
  const url = site.url + path;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#eeeee6">
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
  <link rel="stylesheet" href="${p}styles.css?v=${VERSION}">
  <script src="${p}script.js?v=${VERSION}" defer></script>
</head>`;
}

function header(p, current) {
  const link = (href, label, key, extra = '') =>
    `<a href="${p}${href}"${current === key ? ' aria-current="page"' : ''}>${label}${extra}</a>`;
  return `  <div class="scroll-progress" aria-hidden="true"></div>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" id="top">
    <a class="wordmark" href="${p}" aria-label="Mingkey home">mingkey<span class="brand-dot" aria-hidden="true">✳</span></a>
    <span class="header-note">INDEPENDENT MIND. UNEXPECTED IDEAS.</span>
    <button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu <span aria-hidden="true">+</span></button>
    <nav id="navigation" aria-label="Main navigation">${link('work/', 'Work', 'work')}${link('about/', 'About', 'about')}${link('contact/', 'Let’s talk', 'contact', ' <span aria-hidden="true">↗</span>')}</nav>
  </header>`;
}

function footer(p, { slim = false } = {}) {
  const contact = slim ? '' : `<div class="contact-top"><p class="section-label">LET’S SEE WHERE AN IDEA CAN GO.</p><a href="${mailto}" class="contact-title">GOT A<br><em>WHAT IF?</em><span aria-hidden="true">↗</span></a><div class="contact-details"><a href="${mailto}">${site.email}</a><span>Based in Singapore.<br>Open to a good conversation.</span></div></div>`;
  return `  <footer class="contact section-pad${slim ? ' footer-slim' : ''}" id="contact">${contact}<div class="footer-bottom"><a href="${p}" class="wordmark">mingkey<span class="brand-dot" aria-hidden="true">✳</span></a><nav class="footer-nav" aria-label="Footer"><a href="${p}work/">Work</a><a href="${p}about/">About</a><a href="${p}contact/">Contact</a></nav><span>© <span id="year">2026</span> ${site.owner}</span><button class="motion-toggle" type="button" aria-pressed="true">Motion on</button><a href="#top">Back to top <span aria-hidden="true">↑</span></a></div></footer>`;
}

function page({ depth, current, main, footerOptions, ...meta }) {
  const p = meta.absolute ? BASE_PATH : '../'.repeat(depth);
  return `${head({ ...meta, p })}
<body>
${header(p, current)}
  <main id="main">
${main(p)}
  </main>
${footer(p, footerOptions)}
</body>
</html>
`;
}

// Title lines: all but the last are upright, the last is italic serif.
function displayTitle(project) {
  // Default: last word on its own italic line, e.g. "Swamp / Hydra."
  const words = project.title.split(' ');
  const lines = project.display || (words.length > 1 ? [words.slice(0, -1).join(' '), words.at(-1)] : words);
  return lines.map((line, i) => {
    const text = esc(line);
    const inner = i === lines.length - 1 ? `<em>${text}<span class="title-period">.</span></em>` : text;
    return `<span class="hero-line"><span>${inner}</span></span>`;
  }).join('');
}

// ---------------------------------------------------------------- cards

function projectCard(project, index, p, { home = false } = {}) {
  const card = (!home && project.indexCard) || project.card;
  const classes = ['project-image', card.fit === 'contain' && 'fit-contain', card.tone && `tone-${card.tone}`].filter(Boolean).join(' ');
  const cats = home ? project.categories[0] : project.categories.join(' ');
  const style = card.position ? ` style="--position:${card.position}"` : '';
  const sizes = home ? '(max-width: 700px) 100vw, 50vw' : '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw';
  return `<a class="project-card${home && index % 2 ? ' offset' : ''}" href="${p}work/${project.slug}/" data-category="${cats}"><span class="${classes}"${style}>${img(card.image, card.alt, p, { sizes })}<span class="project-open" aria-hidden="true">↗</span></span><span class="project-caption"><span><span class="project-number">${pad(index + 1)}</span><strong>${esc(project.title)}</strong></span><span>${esc(project.label.toUpperCase())}</span></span></a>`;
}

function filterButtons(list, { counts = true } = {}) {
  const count = key => list.filter(project => project.categories.includes(key)).length;
  const buttons = [`<button class="active" data-filter="all" aria-pressed="true">All work${counts ? ` <sup>${pad(list.length)}</sup>` : ''}</button>`];
  for (const [key, label] of Object.entries(categories)) {
    if (count(key)) buttons.push(`<button data-filter="${key}" aria-pressed="false">${esc(label)}${counts ? ` <sup>${pad(count(key))}</sup>` : ''}</button>`);
  }
  return buttons.join('');
}

// ---------------------------------------------------------------- work index

function workIndex() {
  return page({
    depth: 1,
    current: 'work',
    path: 'work/',
    title: 'Work — Mingkey',
    description: `All ${projects.length} projects by Singapore CG artist Mingjie Tan: characters, creatures, 3D models, a clay sculpture, digital paintings, graphic design and animated short films.`,
    image: 'companion',
    main: p => `    <section class="page-hero" aria-labelledby="page-title">
      <div class="hero-topline"><span class="eyebrow"><span class="small-dot"></span> INDEX / ${pad(projects.length)} PROJECTS</span><span class="eyebrow">3D, ILLUSTRATION,<br>DESIGN AND MOTION.</span></div>
      <h1 class="page-title" id="page-title"><span class="hero-line"><span>All the</span></span><span class="hero-line"><span><em>work<span class="title-period">.</span></em></span></span></h1>
      <p class="page-lede">Characters, creatures, machines, paintings and films. Every project from the archive, from the first sketch to the final frame.</p>
    </section>
    <section class="work work-index section-pad" aria-label="Projects">
      <div class="filters" role="group" aria-label="Filter projects" data-sync-hash>${filterButtons(projects)}</div>
      <p class="sr-only" id="filter-status" role="status" aria-live="polite">Showing ${projects.length} projects.</p>
      <div class="project-grid index-grid">
        ${projects.map((project, i) => projectCard(project, i, p)).join('\n        ')}
      </div>
    </section>`,
  });
}

// ---------------------------------------------------------------- case studies

function videoUrl(video) {
  return video.platform === 'vimeo' ? `https://vimeo.com/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`;
}
const platformName = video => (video.platform === 'vimeo' ? 'Vimeo' : 'YouTube');

function videoCard(video, p) {
  return `<a class="video-card" href="${videoUrl(video)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(`Watch ${video.title} on ${platformName(video)} (opens a new tab)`)}"><span class="video-thumb">${img(video.thumb, video.alt, p)}<span class="play-symbol" aria-hidden="true">▶</span></span><span class="video-caption"><span><strong>${esc(video.label || video.title)}</strong>${video.note ? `<span>${esc(video.note)}</span>` : ''}</span><span>${platformName(video)} ↗</span></span></a>`;
}

function projectPage(project, index) {
  const total = projects.length;
  const next = projects[(index + 1) % total];
  const videos = project.videos || [];
  const heroVideo = videos.find(video => video.thumb === project.hero);
  const otherVideos = videos.filter(video => video !== heroVideo);
  // The lead image opens the lightbox too, so drop it from the gallery below.
  const groups = (project.gallery || [])
    .map(group => ({ ...group, items: group.items.filter(item => item.image !== project.hero) }))
    .filter(group => group.items.length);
  const heroItem = (project.gallery || []).flatMap(group => group.items).find(item => item.image === project.hero);
  const heroAlt = heroItem?.alt || project.card.alt;
  const related = (project.related || []).map(slug => projects.find(other => other.slug === slug)).filter(Boolean);

  const facts = [
    { term: 'Discipline', detail: esc(project.label) },
    ...(project.facts || []).map(fact => ({ term: esc(fact.term), detail: esc(fact.detail) })),
    { term: 'Filed under', detail: project.categories.map(key => `<a href="../#${key}">${esc(categories[key])}</a>`).join(', ') },
    ...(related.length ? [{ term: 'See also', detail: related.map(other => `<a href="../${other.slug}/">${esc(other.title)}</a>`).join(', ') }] : []),
  ];

  let counter = 0;
  const galleryItem = (item, p) => {
    counter += 1;
    const full = webpSize(`assets/${item.image}.webp`);
    return `<figure class="gallery-item"><a class="gallery-link" href="${p}assets/${item.image}.webp" data-lightbox data-caption="${esc(item.caption)}" data-width="${full.w}" data-height="${full.h}" aria-label="${esc(`View larger: ${item.caption}`)}"><span class="gallery-frame">${img(item.image, item.alt, p, { attrs: full.w < 700 ? ' class="native"' : '' })}</span></a><figcaption><span class="project-number">${pad(counter)}</span>${esc(item.caption)}</figcaption></figure>`;
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
      const heroFull = webpSize(`assets/${project.hero}.webp`);
      const lead = heroVideo
        ? `<a class="film-preview project-film" href="${videoUrl(heroVideo)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(`Watch ${heroVideo.title} on ${platformName(heroVideo)} (opens a new tab)`)}">${img(project.hero, heroVideo.alt, p, { full: true, lazy: false })}<span class="film-play"><span class="play-symbol" aria-hidden="true">▶</span><span>${esc(heroVideo.label || 'Watch')} on ${platformName(heroVideo)} ↗</span></span><span class="film-caption"><span>${esc(project.title.toUpperCase())}</span><span>${heroVideo.note ? esc(heroVideo.note.toUpperCase()) : ''}</span></span></a>`
        : `<a class="lead-link" href="${p}assets/${project.hero}.webp" data-lightbox data-caption="${esc(heroItem?.caption || project.title)}" data-width="${heroFull.w}" data-height="${heroFull.h}" aria-label="${esc(`View larger: ${project.title}`)}">${img(project.hero, heroAlt, p, { full: true, lazy: false })}<span class="lead-zoom" aria-hidden="true">＋</span></a>`;
      const gallery = groups.map((group, g) => `
    <section class="gallery-group section-pad" aria-labelledby="gallery-${g}">
      <div class="gallery-heading"><p class="section-label">${pad(g + 1)} / ${groups.length > 1 ? 'IN DETAIL' : 'GALLERY'}</p><h2 id="gallery-${g}">${esc(group.heading || 'More views')}</h2>${group.text ? `<p>${esc(group.text)}</p>` : ''}</div>
      <div class="gallery-grid${group.items.length === 1 ? ' single' : ''}">${group.items.map(item => galleryItem(item, p)).join('')}</div>
    </section>`).join('');
      const videoSection = otherVideos.length ? `
    <section class="project-videos section-pad${otherVideos.length === 1 ? ' single' : ''}" aria-labelledby="videos-title">
      <div class="gallery-heading"><p class="section-label">IN MOTION</p><h2 id="videos-title">${otherVideos.length > 1 ? 'Videos' : 'Watch the video'}</h2></div>
      <div class="video-grid">${otherVideos.map(video => videoCard(video, p)).join('')}</div>
    </section>` : '';
      return `    <section class="page-hero project-hero" aria-labelledby="page-title">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../">Work</a><span aria-hidden="true">/</span><span aria-current="page">${esc(project.title)}</span></nav>
      <div class="hero-topline"><span class="eyebrow"><span class="small-dot"></span> PROJECT ${pad(index + 1)} / ${pad(total)}</span><span class="eyebrow">${esc(project.label.toUpperCase())}</span></div>
      <h1 class="page-title" id="page-title">${displayTitle(project)}</h1>
      <div class="project-intro">
        <div class="project-lede">${project.intro.map(text => `<p>${esc(text)}</p>`).join('')}${project.notice ? `<p class="small-print">${esc(project.notice)}</p>` : ''}</div>
        <dl class="project-facts">${facts.map(fact => `<div><dt>${fact.term}</dt><dd>${fact.detail}</dd></div>`).join('')}</dl>
      </div>
    </section>
    <div class="project-lead">${lead}</div>${videoSection}${gallery}
    <nav class="next-project" aria-label="Next project"><a href="../${next.slug}/"><span class="section-label">NEXT PROJECT / ${pad(((index + 1) % total) + 1)}</span><span class="next-title">${esc(next.title)} <span aria-hidden="true">→</span></span></a><a class="text-link" href="../">All work <span aria-hidden="true">↗</span></a></nav>`;
    },
  });
}

// ---------------------------------------------------------------- about

function aboutPage() {
  const disciplines = [
    ['Character design', 'Creatures, heroes and one very stressed alien mechanic, from rough sketch to turnaround.', 'work/what-the-flying-object/'],
    ['Illustration', 'Digital paintings with warm light, strong silhouettes and a little menace.', 'work/#illustration'],
    ['3D modelling & sculpture', 'Characters, creatures and cars built in 3D, and a dragon sculpted in clay.', 'work/#3d'],
    ['Motion', 'A solo animated short, and effects animation for a film made with friends.', 'work/#motion'],
    ['Graphic design', 'A poster trial, web banners and app screens.', 'work/#design'],
  ];
  const tools = ['Adobe Photoshop', 'Adobe After Effects', 'Adobe Premiere', 'Autodesk 3ds Max', 'Autodesk Mudbox', 'Sculpey clay'];
  return page({
    depth: 1,
    current: 'about',
    path: 'about/',
    title: 'About Mingjie Tan — Mingkey',
    description: 'Mingjie Tan is a CG artist from Singapore working across character design, illustration, 3D modelling, motion graphics and graphic design, and a digital marketing executive and web developer at achates360.',
    image: 'alien-mechanic',
    main: p => `    <section class="page-hero" aria-labelledby="page-title">
      <div class="hero-topline"><span class="eyebrow"><span class="small-dot"></span> ABOUT / MINGJIE TAN</span><span class="eyebrow">BASED IN SINGAPORE<br>THINKING BEYOND IT.</span></div>
      <h1 class="page-title" id="page-title"><span class="hero-line"><span>Hi, I’m</span></span><span class="hero-line"><span><em>Mingjie<span class="title-period">.</span></em></span></span></h1>
      <p class="page-lede">CG artist from Singapore. Currently a digital marketing executive and web developer at achates360.</p>
    </section>
    <section class="intro about-intro section-pad" aria-labelledby="about-title">
      <div class="section-label"><span class="small-dot"></span> THE SHORT VERSION</div>
      <div class="intro-main"><h2 id="about-title">A CG artist<br><em>from Singapore.</em></h2><div class="intro-bottom"><p>I’m Mingjie, and I make characters, creatures and the worlds they live in. My work runs across character design, illustration, 3D modelling, motion graphics and graphic design, often all on the same project. These days I’m also a digital marketing executive and web developer at achates360. Thank you for visiting. If you’d like to work together, drop me an email.</p><a class="text-link" href="${p}contact/">Get in touch <span aria-hidden="true">↗</span></a></div></div>
    </section>
    <section class="about-feature section-pad" aria-labelledby="feature-title">
      <a class="about-art" href="${p}work/what-the-flying-object/">${img('alien-mechanic', 'Painted character art of the alien mechanic from What the Flying Object', p, { sizes: '(max-width: 700px) 100vw, 40vw' })}</a>
      <div class="about-feature-copy"><p class="section-label">01 / WHAT I DO</p><h2 id="feature-title">One idea,<br><em>many forms.</em></h2><p>The alien mechanic from my short film exists as a painting, pencil variations, a turnaround, expression and action sheets, a rigged 3D model and, finally, a character on screen. One idea, carried all the way from sketch to film.</p><a class="text-link" href="${p}work/what-the-flying-object/">See how he was made <span aria-hidden="true">↗</span></a></div>
    </section>
    <section class="disciplines section-pad" aria-labelledby="disciplines-title">
      <div class="section-heading"><div><p class="section-label">02 / DISCIPLINES</p><h2 id="disciplines-title">Things<br><em>I make.</em></h2></div></div>
      <ol class="discipline-list">${disciplines.map(([name, text, href], i) => `<li><a href="${p}${href}"><span class="project-number">${pad(i + 1)}</span><strong>${name}</strong><span>${text}</span><span class="discipline-arrow" aria-hidden="true">↗</span></a></li>`).join('')}</ol>
    </section>
    <div class="discipline-strip" aria-hidden="true"><div class="discipline-track"><span>SKETCH</span><span>✳</span><span>MODEL</span><span>✳</span><span>PAINT</span><span>✳</span><span>ANIMATE</span><span>✳</span><span>SKETCH</span><span>✳</span><span>MODEL</span></div></div>
    <section class="toolkit section-pad" aria-labelledby="tools-title">
      <div><p class="section-label">03 / TOOLKIT</p><h2 id="tools-title">Tools across<br><em>the archive.</em></h2></div>
      <div><p>The software and materials used across the projects on this site.</p><ul class="tool-list">${tools.map(tool => `<li>${tool}</li>`).join('')}</ul></div>
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
    footerOptions: { slim: true },
    main: p => `    <section class="page-hero contact-page" aria-labelledby="page-title">
      <div class="hero-topline"><span class="eyebrow"><span class="small-dot"></span> CONTACT / SAY HELLO</span><span class="eyebrow">BASED IN SINGAPORE.<br>OPEN TO A GOOD CONVERSATION.</span></div>
      <h1 class="page-title" id="page-title"><span class="hero-line"><span>Got a</span></span><span class="hero-line"><span><em>what if?</em></span></span></h1>
      <div class="contact-panel">
        <div class="contact-email"><p class="section-label">EMAIL IS THE BEST WAY TO REACH ME</p><a class="contact-address" href="${mailto}?subject=${subject}">${site.email}</a><div class="contact-actions"><a class="pill-link" href="${mailto}?subject=${subject}">Write an email <span aria-hidden="true">↗</span></a><button class="pill-link copy-email" type="button" data-copy="${site.email}" hidden>Copy address</button><span class="copy-status" role="status" aria-live="polite"></span></div></div>
        <div class="contact-notes"><p class="section-label">A GOOD FIRST MESSAGE</p><ol><li><span class="project-number">01</span>The idea, character or world you have in mind.</li><li><span class="project-number">02</span>Where it will live: screen, print, film or something else.</li><li><span class="project-number">03</span>Any timing I should know about.</li></ol></div>
      </div>
    </section>
    <section class="contact-art" aria-label="From the archive">
      <a href="${p}work/companion/">${img('companion', 'Companion: an armoured dragon alongside a warrior, painted in warm amber tones', p, { sizes: '100vw' })}<span class="stage-caption"><span>FROM THE ARCHIVE / COMPANION</span><span>SEE THE PROJECT ↗</span></span></a>
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
    footerOptions: { slim: true },
    main: p => `    <section class="page-hero not-found" aria-labelledby="page-title">
      <div class="hero-topline"><span class="eyebrow"><span class="small-dot"></span> ERROR 404</span><span class="eyebrow">NOTHING TO BEAM UP HERE.</span></div>
      <h1 class="page-title" id="page-title"><span class="hero-line"><span>This page</span></span><span class="hero-line"><span><em>flew off<span class="title-period">.</span></em></span></span></h1>
      <p class="page-lede">The page you were looking for isn’t here. It may have moved when the portfolio was rebuilt.</p>
      <div class="contact-actions"><a class="pill-link" href="${p}">Back to the homepage <span aria-hidden="true">↗</span></a><a class="pill-link" href="${p}work/">See all work <span aria-hidden="true">↗</span></a></div>
    </section>`,
  });
}

// ---------------------------------------------------------------- homepage + sitemap

function updateHomepage() {
  const file = join(ROOT, 'index.html');
  const featured = projects.filter(project => project.featured);
  const cards = featured.map((project, i) => projectCard(project, i, '', { home: true })).join('\n        ');
  let html = readFileSync(file, 'utf8');
  const pattern = /(<!-- build:featured -->)[\s\S]*?(<!-- \/build:featured -->)/;
  if (!pattern.test(html)) throw new Error('index.html is missing the build:featured markers');
  html = html.replace(pattern, `$1\n        ${cards}\n        $2`)
    .replace(/(styles\.css|script\.js)\?v=[\w-]+/g, `$1?v=${VERSION}`);
  writeFileSync(file, html);
}

function sitemap() {
  const paths = ['', 'work/', ...projects.map(project => `work/${project.slug}/`), 'about/', 'contact/'];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(path => `  <url><loc>${site.url}${path}</loc></url>`).join('\n')}
</urlset>
`;
}

// ---------------------------------------------------------------- run

const slugs = new Set();
for (const project of projects) {
  if (slugs.has(project.slug)) throw new Error(`Duplicate slug: ${project.slug}`);
  slugs.add(project.slug);
  for (const key of project.categories) if (!categories[key]) throw new Error(`${project.slug}: unknown category ${key}`);
}

// Remove case-study folders for projects that no longer exist.
if (existsSync(join(ROOT, 'work'))) {
  for (const entry of readdirSync(join(ROOT, 'work'), { withFileTypes: true })) {
    if (entry.isDirectory() && !slugs.has(entry.name)) rmSync(join(ROOT, 'work', entry.name), { recursive: true });
  }
}

write('work/index.html', workIndex());
projects.forEach((project, i) => write(`work/${project.slug}/index.html`, projectPage(project, i)));
write('about/index.html', aboutPage());
write('contact/index.html', contactPage());
write('404.html', notFoundPage());
write('sitemap.xml', sitemap());
updateHomepage();
console.log(`Built ${projects.length} project pages, work index, about, contact, 404, sitemap and homepage grid.`);
