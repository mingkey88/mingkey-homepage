// Shared by every page. Each feature only runs when its markup is present.

const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* storage unavailable */ } },
};

// Mobile navigation: a full-screen menu on small screens.
const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function setMenu(open) {
  navigation.classList.toggle('open', open);
  siteHeader.classList.toggle('menu-open', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}
menuToggle.addEventListener('click', () => setMenu(!navigation.classList.contains('open')));
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) { setMenu(false); menuToggle.focus(); }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

// Category filters (work index). Cards can belong to several categories.
const filterGroup = document.querySelector('.filters');
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.cards .card');
function applyFilter(category) {
  let count = 0;
  filterButtons.forEach(b => { b.classList.toggle('active', b.dataset.filter === category); b.setAttribute('aria-pressed', String(b.dataset.filter === category)); });
  projectCards.forEach(card => {
    card.hidden = category !== 'all' && !card.dataset.category.split(' ').includes(category);
    if (!card.hidden) { count++; card.classList.add('is-visible'); }
  });
  document.querySelector('#filter-status').textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}.`;
}
const filterFromHash = () => {
  const key = decodeURIComponent(location.hash.slice(1));
  return [...filterButtons].some(b => b.dataset.filter === key) ? key : 'all';
};
filterButtons.forEach(button => button.addEventListener('click', () => {
  applyFilter(button.dataset.filter);
  // The work index keeps the filter in the address so it can be shared.
  if (filterGroup.hasAttribute('data-sync-hash')) {
    history.replaceState(null, '', button.dataset.filter === 'all' ? location.pathname : `#${button.dataset.filter}`);
  }
}));
if (filterGroup?.hasAttribute('data-sync-hash')) {
  if (filterFromHash() !== 'all') applyFilter(filterFromHash());
  window.addEventListener('hashchange', () => applyFilter(filterFromHash()));
}

// Grid / list layout for project cards, remembered between pages.
document.querySelectorAll('.view-toggle').forEach(toggle => {
  const cards = toggle.closest('section').querySelector('.cards');
  const setView = view => {
    cards.classList.toggle('is-list', view === 'list');
    toggle.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === view)));
  };
  toggle.hidden = false;
  setView(storage.get('mingkey-view') === 'list' ? 'list' : 'grid');
  toggle.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    setView(b.dataset.view);
    storage.set('mingkey-view', b.dataset.view);
  }));
});

// Render / wireframe comparison
const range = document.querySelector('#comparison-range');
range?.addEventListener('input', () => {
  document.querySelector('.comparison').style.setProperty('--split', `${range.value}%`);
  range.setAttribute('aria-valuetext', `${range.value} percent wireframe visible`);
});

document.querySelector('#year').textContent = new Date().getFullYear();

// Copy email (contact page). Hidden unless the Clipboard API is available.
const copyButton = document.querySelector('.copy-email');
if (copyButton && navigator.clipboard) {
  const copyStatus = document.querySelector('.copy-status');
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copy);
      copyStatus.textContent = 'Copied to your clipboard.';
    } catch {
      copyStatus.textContent = `Couldn’t copy. The address is ${copyButton.dataset.copy}.`;
    }
  });
}

// Compose form: opens the visitor's email app with the message filled in.
// Nothing is sent from the page, and the status text says so.
const composeForm = document.querySelector('.compose-form');
composeForm?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(composeForm);
  const name = String(data.get('name')).trim();
  const body = `Hi Mingjie,\n\n${String(data.get('body')).trim()}\n\n${name}`;
  const url = `mailto:${composeForm.dataset.email}?subject=${encodeURIComponent(String(data.get('subject')).trim())}&body=${encodeURIComponent(body)}`;
  composeForm.querySelector('.compose-status').textContent = `Your email app should open with the message ready to send. If nothing happens, email ${composeForm.dataset.email} directly.`;
  window.location.href = url;
});

// Lightbox for case-study galleries. Without JavaScript the links open the image.
const lightboxLinks = [...document.querySelectorAll('[data-lightbox]')];
if (lightboxLinks.length) {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('aria-label', 'Image viewer');
  lightbox.innerHTML = `<div class="lightbox-bar"><span class="lightbox-count" aria-live="polite"></span><button class="lightbox-close" type="button">Close <span aria-hidden="true">×</span></button></div><figure class="lightbox-figure"><img alt=""><figcaption></figcaption></figure><div class="lightbox-nav"><button class="lightbox-prev" type="button"><span aria-hidden="true">←</span> Previous</button><button class="lightbox-next" type="button">Next <span aria-hidden="true">→</span></button></div>`;
  document.body.append(lightbox);
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('figcaption');
  const count = lightbox.querySelector('.lightbox-count');
  let current = 0;
  let opener = null;
  lightbox.classList.toggle('single', lightboxLinks.length === 1);
  function show(index) {
    current = (index + lightboxLinks.length) % lightboxLinks.length;
    const link = lightboxLinks[current];
    const thumb = link.querySelector('img');
    image.src = link.href;
    image.alt = thumb.alt;
    image.width = link.dataset.width;
    image.height = link.dataset.height;
    caption.textContent = link.dataset.caption;
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(lightboxLinks.length).padStart(2, '0')}`;
  }
  lightboxLinks.forEach((link, index) => link.addEventListener('click', event => {
    event.preventDefault();
    opener = link;
    show(index);
    lightbox.showModal();
    document.body.classList.add('modal-open');
  }));
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  let touchX = null;
  lightbox.addEventListener('touchstart', event => { touchX = event.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', event => {
    if (touchX === null || lightboxLinks.length < 2) return;
    const dx = event.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });
  lightbox.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    opener?.focus();
  });
}

// Progressive enhancement: ordinary page scrolling, no scroll interception.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll([
  '.split-copy', '.split-art', '.mission-art', '.mission-copy', '.label-row', '.work-head', '.card',
  '.disc-list li', '.behind-main', '.step-card', '.film-card', '.films-head', '.explore-head', '.band-body', '.work-foot',
  '.overview > *', '.project-lead', '.gallery-item', '.video-card', '.collage > a', '.statement', '.duo > a',
  '.toolkit-grid > *', '.contact-intro', '.contact-art', '.compose-grid > *',
].join(', '));
const heroImage = document.querySelector('.hero-bg');
const heroSection = heroImage?.closest('section');
const stage = document.querySelector('.showcase');
const stageCanvas = document.querySelector('.stage-canvas');
const stagePhoto = document.querySelector('.stage-photo');
const stageTitle = document.querySelector('.stage-title');
const drifters = [...document.querySelectorAll('[data-drift]')];
const driftSection = drifters[0]?.closest('section');
const progressLine = document.querySelector('.scroll-progress');
const motionToggle = document.querySelector('.motion-toggle');
const motionAnimated = [heroImage, stageCanvas, stagePhoto, stageTitle, progressLine, ...drifters].filter(Boolean);
let revealObserver;
let motionFrame = 0;
let motionEnabled = false;
let manualReducedMotion = storage.get('mingkey-motion') === 'off';
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function renderScrollMotion() {
  motionFrame = 0;
  if (!motionEnabled) return;
  const viewport = window.innerHeight;
  const mobile = window.innerWidth <= 760;
  const scrollable = document.documentElement.scrollHeight - viewport;
  progressLine.style.transform = `scaleX(${scrollable > 0 ? clamp(window.scrollY / scrollable) : 0})`;
  if (heroImage) {
    const box = heroSection.getBoundingClientRect();
    if (box.bottom > 0) heroImage.style.transform = `translateY(${clamp(-box.top / box.height) * 12}%) scale(1.06)`;
  }
  if (driftSection) {
    const box = driftSection.getBoundingClientRect();
    if (box.top < viewport && box.bottom > 0) {
      // Words start in place and drift apart as the section scrolls past.
      const progress = clamp((viewport - box.top) / (viewport + box.height));
      drifters.forEach(word => { word.style.transform = `translateX(${progress * Number(word.dataset.drift) * (mobile ? 36 : 140)}px)`; });
    }
  }
  if (stage) {
    // Read only the scene bounds; cards are handled by the observer.
    const scene = stage.getBoundingClientRect();
    const distance = Math.max(1, scene.height - viewport * (mobile ? .8 : 1));
    const sceneProgress = clamp(-scene.top / distance);
    if (scene.bottom > 0 && scene.top < viewport) {
      stageCanvas.style.transform = `scale(${(mobile ? .94 : .88) + sceneProgress * (mobile ? .06 : .12)})`;
      stagePhoto.style.transform = `scale(1.08) translateY(${sceneProgress * -3}%)`;
      stageTitle.style.transform = `translateY(${(1 - sceneProgress) * 30}px)`;
    }
  }
}
function requestScrollMotion() {
  if (motionEnabled && !motionFrame) motionFrame = requestAnimationFrame(renderScrollMotion);
}
function configureMotion() {
  revealObserver?.disconnect();
  if (motionFrame) cancelAnimationFrame(motionFrame);
  motionFrame = 0;
  motionEnabled = !motionPreference.matches && !manualReducedMotion && 'IntersectionObserver' in window;
  document.documentElement.classList.toggle('motion-paused', !motionEnabled);
  motionToggle.setAttribute('aria-pressed', String(motionEnabled));
  motionToggle.textContent = motionEnabled ? 'Motion on' : 'Motion off';
  motionToggle.disabled = motionPreference.matches;
  document.documentElement.classList.toggle('motion-ready', motionEnabled);
  if (!motionEnabled) {
    revealTargets.forEach(element => element.classList.add('is-visible'));
    motionAnimated.forEach(element => element.style.removeProperty('transform'));
    return;
  }
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: '0px 0px -25px 0px' });
  revealTargets.forEach(element => {
    element.dataset.reveal = '';
    if (element.matches('.cards:not(.is-list) .card:nth-child(even), .gallery-item:nth-child(even), .film-card:nth-child(2), .collage > a:nth-child(2)')) element.style.setProperty('--reveal-delay', '100ms');
    if (element.matches('.film-card:nth-child(3), .collage > a:nth-child(3)')) element.style.setProperty('--reveal-delay', '200ms');
    if (!element.classList.contains('is-visible')) revealObserver.observe(element);
  });
  requestScrollMotion();
}
window.addEventListener('scroll', requestScrollMotion, { passive: true });
window.addEventListener('resize', requestScrollMotion, { passive: true });
motionPreference.addEventListener('change', configureMotion);
// Keyboard navigation never lands on visually hidden content.
document.addEventListener('focusin', event => event.target.closest('[data-reveal]')?.classList.add('is-visible'));
filterButtons.forEach(button => button.addEventListener('click', requestScrollMotion));
motionToggle.addEventListener('click', () => {
  manualReducedMotion = !manualReducedMotion;
  storage.set('mingkey-motion', manualReducedMotion ? 'off' : 'on');
  configureMotion();
});
configureMotion();
