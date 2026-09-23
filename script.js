// Shared by every page. Each feature only runs when its markup is present.

// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('span').textContent = '+';
}
menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('span').textContent = isOpen ? '−' : '+';
});
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuToggle.focus(); }
});

// Category filters. Cards can belong to several categories.
const filterGroup = document.querySelector('.filters');
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-grid .project-card');
function applyFilter(category) {
  let count = 0;
  filterButtons.forEach(b => { b.classList.toggle('active', b.dataset.filter === category); b.setAttribute('aria-pressed', String(b.dataset.filter === category)); });
  projectCards.forEach(card => {
    card.hidden = category !== 'all' && !card.dataset.category.split(' ').includes(category);
    if (!card.hidden) { count++; card.classList.add('is-visible'); }
  });
  document.querySelector('.project-grid').classList.toggle('filtered', category !== 'all');
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
  '.intro .section-label', '.intro h2', '.intro-bottom', '.section-heading', '.project-card', '.process-copy', '.comparison',
  '.film-heading', '.film-preview', '.contact-top', '.page-lede', '.project-intro', '.project-lead', '.gallery-heading',
  '.gallery-item', '.video-card', '.next-project', '.about-feature > *', '.discipline-list li', '.toolkit > *',
  '.contact-panel > *', '.contact-art',
].join(', '));
const stage = document.querySelector('.showcase');
const stageCanvas = document.querySelector('.stage-canvas');
const stagePhoto = document.querySelector('.stage-photo');
const stageTitle = document.querySelector('.stage-title');
const star = document.querySelector('.orbit-star');
const track = document.querySelector('.discipline-track');
const progressLine = document.querySelector('.scroll-progress');
const motionToggle = document.querySelector('.motion-toggle');
const motionAnimated = [stageCanvas, stagePhoto, stageTitle, star, track, progressLine].filter(Boolean);
let revealObserver;
let motionFrame = 0;
let motionEnabled = false;
let manualReducedMotion = false;
try { manualReducedMotion = localStorage.getItem('mingkey-motion') === 'off'; } catch { /* storage unavailable */ }
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function renderScrollMotion() {
  motionFrame = 0;
  if (!motionEnabled) return;
  const viewport = window.innerHeight;
  const mobile = window.innerWidth <= 700;
  const scrollable = document.documentElement.scrollHeight - viewport;
  progressLine.style.transform = `scaleX(${scrollable > 0 ? clamp(window.scrollY / scrollable) : 0})`;
  if (stage) {
    // Read only the scene bounds; artwork cards are handled by the observer.
    const scene = stage.getBoundingClientRect();
    const distance = Math.max(1, scene.height - viewport * (mobile ? .75 : 1));
    const sceneProgress = clamp(-scene.top / distance);
    if (scene.bottom > 0 && scene.top < viewport) {
      stageCanvas.style.transform = `scale(${(mobile ? .94 : .9) + sceneProgress * (mobile ? .06 : .1)})`;
      stagePhoto.style.transform = `scale(1.08) translateY(${sceneProgress * -3}%)`;
      stageTitle.style.transform = `translateY(${(1 - sceneProgress) * 25}px)`;
    }
  }
  if (star) star.style.transform = `rotate(${-12 + Math.min(window.scrollY, viewport * 2) * .085}deg)`;
  if (track) {
    const band = track.parentElement.getBoundingClientRect();
    if (band.top < viewport && band.bottom > 0) {
      const bandProgress = clamp((viewport - band.top) / (viewport + band.height));
      track.style.transform = `translateX(${-bandProgress * (mobile ? 180 : 430)}px)`;
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
    if (element.matches('.project-card.offset, .index-grid .project-card:nth-child(3n+2), .gallery-item:nth-child(even)')) element.style.setProperty('--reveal-delay', '100ms');
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
  try { localStorage.setItem('mingkey-motion', manualReducedMotion ? 'off' : 'on'); } catch { /* storage unavailable */ }
  configureMotion();
});
configureMotion();
