const projects = {
  ararush: {title:'Ararush',category:'3D / CHARACTER DESIGN',image:'ararush',alt:'A volcanic creature with glowing lava and a raised stone fist',description:'A creature brought into three dimensions: textured stone, glowing heat and an exaggerated silhouette. Part of my character design and 3D modelling archive.',source:'3dworks'},
  companion: {title:'Companion',category:'DIGITAL PAINTING',image:'companion',alt:'An armoured dragon alongside a warrior in an amber fantasy landscape',description:'A digital painting exploring the bond between a warrior and a fantastical companion, with warm light, armour and a shared silhouette.',source:'illustrations'},
  hydra: {title:'Swamp Hydra',category:'3D / CREATURE DESIGN',image:'hydra',alt:'A green armoured creature with horns and an open mouth',description:'A creature study exploring organic forms, layered armour and surface detail through 3D modelling.',source:'3dworks'},
  sunny: {title:'Sinister Sunny',category:'CHARACTER ILLUSTRATION',image:'sunny',alt:'A girl in a red dress holding a doll in a dark setting',description:'A character illustration with an unsettling edge. An exploration of expression, atmosphere and visual storytelling.',source:'illustrations'},
  '350z': {title:'Nissan 350Z',category:'3D / HARD SURFACE',image:'350z',alt:'A red Nissan 350Z rendered in a grey studio',description:'An automotive modelling study, from wireframe structure to a finished studio render. Explore the comparison on the homepage to see beneath the surface.',source:'3dworks'},
  wtfo: {title:'What the Flying Object',category:'ANIMATED SHORT FILM',image:'alien-wire',alt:'A wireframe model of the film’s alien mechanic',description:'A solo animated short about an alien mechanic struggling to operate the tractor beam of his UFO. I handled the project from concept through modelling, rigging and effects.',source:'projects',film:true}
};
const menuToggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.querySelector('span').textContent='+';}
menuToggle.addEventListener('click',()=>{const isOpen=navigation.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(isOpen));menuToggle.querySelector('span').textContent=isOpen?'−':'+';});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuToggle.focus();}});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  const category=button.dataset.filter;let count=0;
  document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  document.querySelectorAll('.project-card').forEach(card=>{card.hidden=category!=='all'&&card.dataset.category!==category;if(!card.hidden)count++;});
  document.querySelector('.project-grid').classList.toggle('filtered',category!=='all');
  document.querySelector('#filter-status').textContent=`Showing ${count} ${count===1?'project':'projects'}.`;
}));
const projectDialog=document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(card=>card.addEventListener('click',()=>{
  const p=projects[card.dataset.project];
  document.querySelector('#dialog-content').innerHTML=`<img class="dialog-image" src="assets/${p.image}.webp" alt="${p.alt}"><div class="dialog-info"><p class="section-label">${p.category}</p><h2 id="dialog-title">${p.title}</h2><p>${p.description}</p>${p.film?'<a class="dialog-play" href="https://www.youtube.com/watch?v=ilIMWmxm-Jc" target="_blank" rel="noopener noreferrer">Watch the short film on YouTube ↗</a>':''}<a class="text-link" href="https://mingjietan88.wixsite.com/mingkey/${p.source}" target="_blank" rel="noopener noreferrer">View in original portfolio <span aria-hidden="true">↗</span></a></div>`;
  projectDialog.showModal();document.body.classList.add('modal-open');
}));
[projectDialog].forEach(dialog=>{
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open');});
});
const range=document.querySelector('#comparison-range');
range.addEventListener('input',()=>{document.querySelector('.comparison').style.setProperty('--split',`${range.value}%`);range.setAttribute('aria-valuetext',`${range.value} percent wireframe visible`);});
document.querySelector('#year').textContent=new Date().getFullYear();

// Progressive enhancement: ordinary page scrolling, no scroll interception.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll('.intro .section-label, .intro h2, .intro-bottom, .section-heading, .project-card, .process-copy, .comparison, .film-heading, .film-preview, .contact-top');
const stage = document.querySelector('.showcase');
const stageCanvas = document.querySelector('.stage-canvas');
const stagePhoto = document.querySelector('.stage-photo');
const stageTitle = document.querySelector('.stage-title');
const star = document.querySelector('.orbit-star');
const track = document.querySelector('.discipline-track');
const progressLine = document.querySelector('.scroll-progress');
let revealObserver;
let motionFrame = 0;
let motionEnabled = false;
let manualReducedMotion = false;
const motionToggle = document.querySelector('.motion-toggle');
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function renderScrollMotion() {
  motionFrame = 0;
  if (!motionEnabled) return;
  const viewport = window.innerHeight;
  const scrollable = document.documentElement.scrollHeight - viewport;
  const pageProgress = scrollable > 0 ? clamp(window.scrollY / scrollable) : 0;
  progressLine.style.transform = `scaleX(${pageProgress})`;
  // Read only the two scene bounds; artwork cards are handled by the observer.
  const scene = stage.getBoundingClientRect();
  const mobile = window.innerWidth <= 700;
  const distance = Math.max(1, scene.height - viewport * (mobile ? .75 : 1));
  const sceneProgress = clamp(-scene.top / distance);
  if (scene.bottom > 0 && scene.top < viewport) {
    stageCanvas.style.transform = `scale(${(mobile ? .94 : .9) + sceneProgress * (mobile ? .06 : .1)})`;
    stagePhoto.style.transform = `scale(1.08) translateY(${sceneProgress * -3}%)`;
    stageTitle.style.transform = `translateY(${(1 - sceneProgress) * 25}px)`;
  }
  star.style.transform = `rotate(${-12 + Math.min(window.scrollY, viewport * 2) * .085}deg)`;
  const band = track.parentElement.getBoundingClientRect();
  if (band.top < viewport && band.bottom > 0) {
    const bandProgress = clamp((viewport - band.top) / (viewport + band.height));
    track.style.transform = `translateX(${-bandProgress * (mobile ? 180 : 430)}px)`;
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
    [stageCanvas, stagePhoto, stageTitle, star, track, progressLine].forEach(element => element.style.removeProperty('transform'));
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
  revealTargets.forEach((element) => {
    element.dataset.reveal = '';
    if (element.matches('.project-card.offset')) element.style.setProperty('--reveal-delay', '100ms');
    revealObserver.observe(element);
  });
  requestScrollMotion();
}
window.addEventListener('scroll', requestScrollMotion, { passive: true });
window.addEventListener('resize', requestScrollMotion, { passive: true });
motionPreference.addEventListener('change', configureMotion);
// Keyboard navigation never lands on visually hidden content.
document.addEventListener('focusin', event => event.target.closest('[data-reveal]')?.classList.add('is-visible'));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.project-card:not([hidden])').forEach(card => card.classList.add('is-visible'));
  requestScrollMotion();
}));
motionToggle.addEventListener('click', () => {
  manualReducedMotion = !manualReducedMotion;
  configureMotion();
});
configureMotion();
