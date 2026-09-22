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
