// Single source of truth for every project on the site.
// After editing, run `node tools/build.mjs` to regenerate the work index,
// case-study pages, homepage project grid and sitemap.
//
// Images are referenced by name: "companion" means assets/companion.webp
// (full size) and assets/thumbs/companion.webp (grid size). Create both with
// tools/optimize-images.py.
//
// Keep copy truthful: descriptions come from the original portfolio or
// describe what is visible in the artwork. Do not add clients, dates, awards
// or credits that have not been verified with Mingjie.

export const site = {
  name: 'Mingkey',
  owner: 'Mingjie Tan',
  url: 'https://mingkey88.github.io/mingkey-homepage/',
  email: 'mingjie.tan88@gmail.com',
};

export const categories = {
  '3d': '3D & sculpture',
  illustration: 'Illustration',
  design: 'Graphic design',
  motion: 'Motion',
};

// Order here is the order on the work index. `featured` projects also appear
// on the homepage, in this order.
export const projects = [
  {
    slug: 'ararush',
    title: 'Ararush',
    categories: ['3d', 'illustration'],
    label: '3D / Character design',
    featured: true,
    summary: 'A volcanic creature of cracked stone and glowing lava, as a digital painting and as a 3D model.',
    intro: [
      'Ararush is a hulking creature built from cracked stone and molten heat. It appears in my archive twice: once as a digital painting, and again brought into three dimensions with textured rock and glowing lava.',
    ],
    card: { image: 'ararush', alt: 'Ararush, a volcanic creature with glowing lava and a raised stone fist' },
    hero: 'ararush',
    gallery: [
      { items: [
        { image: 'ararush', alt: 'Ararush in 3D: a stone creature with glowing lava cracks, holding a molten sphere', caption: 'Ararush in 3D' },
        { image: 'ararush-painting', alt: 'Digital painting of Ararush, a lava creature striding through a fiery rocky landscape', caption: 'Ararush, digital painting' },
      ] },
    ],
    related: ['saikokira'],
  },
  {
    slug: 'companion',
    title: 'Companion',
    categories: ['illustration'],
    label: 'Digital painting',
    featured: true,
    summary: 'A digital painting of a warrior and a fantastical dragon companion in warm amber light.',
    intro: [
      'A digital painting exploring the bond between a warrior and a fantastical companion, with warm light, armour and a shared silhouette.',
    ],
    card: { image: 'companion', alt: 'Companion, a fantasy warrior and dragon illustration' },
    hero: 'companion',
    gallery: [
      { items: [
        { image: 'companion', alt: 'An armoured dragon alongside a warrior in a red cape, painted in warm amber tones', caption: 'Companion' },
      ] },
    ],
  },
  {
    slug: 'swamp-hydra',
    title: 'Swamp Hydra',
    categories: ['3d'],
    label: '3D / Digital sculpture',
    featured: true,
    summary: 'A horned swamp creature digitally sculpted and textured in Mudbox.',
    intro: [
      'A digital sculpt made in Autodesk Mudbox and textured in Mudbox. Layered armour plates, horns and an open jaw explore organic form and surface detail.',
    ],
    facts: [
      { term: 'Tools', detail: 'Autodesk Mudbox' },
    ],
    card: { image: 'hydra', alt: 'Swamp Hydra, a horned creature with layered green armour' },
    hero: 'hydra',
    videos: [
      { platform: 'youtube', id: 'Df1Sz7spdX0', title: 'Swamp Hydralisk Video', thumb: 'video-hydra', alt: 'Frame from the Swamp Hydra video showing the creature’s head in profile' },
    ],
    gallery: [
      { items: [
        { image: 'hydra', alt: 'Swamp Hydra seen head-on, with a spiked crest and armoured shoulders', caption: 'Front view' },
        { image: 'hydra-2', alt: 'Swamp Hydra in three-quarter view with its jaw open', caption: 'Three-quarter view' },
        { image: 'hydra-3', alt: 'Side profile of the Swamp Hydra’s long, spined head', caption: 'Profile' },
        { image: 'hydra-4', alt: 'The Swamp Hydra seen from behind, showing its curved dorsal plates', caption: 'Rear view' },
      ] },
    ],
  },
  {
    slug: 'sinister-sunny',
    title: 'Sinister Sunny',
    categories: ['illustration'],
    label: 'Character illustration',
    featured: true,
    summary: 'A character illustration with an unsettling edge: a girl in a red dress clutching a small doll.',
    intro: [
      'A character illustration with an unsettling edge. An exploration of expression, atmosphere and visual storytelling.',
    ],
    card: { image: 'sunny', alt: 'Sinister Sunny, a girl in a red dress holding a small doll', fit: 'contain', tone: 'night' },
    hero: 'sunny',
    gallery: [
      { items: [
        { image: 'sunny', alt: 'A barefoot girl in a red dress holding a small doll, lit from behind in a dark room', caption: 'Sinister Sunny' },
      ] },
    ],
  },
  {
    slug: 'nissan-350z',
    title: 'Nissan 350Z',
    categories: ['3d'],
    label: '3D / Hard surface',
    featured: true,
    summary: 'A 3D car model built in 3ds Max and rendered with mental ray.',
    intro: [
      'A 3D car model made in Autodesk 3ds Max and rendered with NVIDIA mental ray: an automotive modelling study, from wireframe structure to a finished studio render.',
    ],
    facts: [
      { term: 'Tools', detail: 'Autodesk 3ds Max, NVIDIA mental ray' },
    ],
    card: { image: '350z', alt: 'A red Nissan 350Z model in a grey studio environment' },
    hero: '350z',
    videos: [
      { platform: 'youtube', id: 'EltDg5dhV0I', title: '350z', thumb: 'video-350z', alt: 'Frame from the 350Z video showing the car from the rear' },
    ],
    gallery: [
      { items: [
        { image: '350z', alt: 'A red Nissan 350Z rendered from the front three-quarter angle in a grey studio', caption: 'Studio render, front' },
        { image: '350z-rear', alt: 'The red 350Z rendered from the rear three-quarter angle', caption: 'Studio render, rear' },
        { image: 'car-wire', alt: 'Wireframe view of the Nissan 350Z model', caption: 'Wireframe' },
      ] },
    ],
  },
  {
    slug: 'what-the-flying-object',
    title: 'What the Flying Object',
    display: ['What the', 'flying object'],
    categories: ['motion', '3d'],
    label: 'Animated short film',
    featured: true,
    summary: 'A solo animated short about an alien mechanic trying to operate the tractor beam of his UFO.',
    intro: [
      'A solo project. This short animated film is about an alien mechanic who desperately tries to operate the tractor beam of his UFO.',
      'I handled everything, from the concept through to the modelling, rigging and effects.',
    ],
    facts: [
      { term: 'Role', detail: 'Solo: concept, modelling, rigging and effects' },
      { term: 'Character', detail: 'Modelled in 3ds Max, textured in Photoshop' },
    ],
    card: { image: 'alien-wire', alt: 'Wireframe of the alien mechanic from What the Flying Object', fit: 'contain' },
    indexCard: { image: 'video-wtfo', alt: 'The alien mechanic beside a glowing tractor beam inside his UFO' },
    hero: 'video-wtfo',
    videos: [
      { platform: 'youtube', id: 'ilIMWmxm-Jc', title: 'WTFO', label: 'Watch the film', thumb: 'video-wtfo', alt: 'Still from the film: the alien mechanic at a console beside a glowing tractor beam', note: 'Best watched in HD.' },
      { platform: 'youtube', id: 'BSt10vJLwTQ', title: 'Alien Mechanic', label: 'Character video', thumb: 'video-alien-mechanic', alt: 'The Alien Mechanic 3D model against a black background' },
    ],
    gallery: [
      {
        heading: 'Character development',
        text: 'The alien mechanic is the film’s main character.',
        items: [
          { image: 'alien-mechanic', alt: 'Painted character art of the alien mechanic: a green alien in welding goggles, red cap, vest, tool belt and boots', caption: 'The alien mechanic' },
          { image: 'alien-sketches', alt: 'Pencil sketches exploring different body shapes and outfits for the character', caption: 'Variations' },
          { image: 'alien-turnaround', alt: 'Front, side and back turnaround of the alien mechanic', caption: 'Turnaround' },
          { image: 'alien-action', alt: 'Three poses: the mechanic scratching his head with a tool, raising it proudly, and standing startled in heart-print boxer shorts', caption: 'Action poses' },
          { image: 'alien-emotes', alt: 'Three facial expression studies of the alien mechanic', caption: 'Expressions' },
        ],
      },
      {
        heading: 'The world',
        items: [
          { image: 'wtfo-environment', alt: 'Painted interior of the UFO bay: the mechanic stands under the saucer beside a sign reading “Today’s job: beam”', caption: 'Environment concept' },
          { image: 'wtfo-ufo', alt: '3D render of a flying saucer held by robotic arms in a hangar lit with cyan lights', caption: 'UFO hangar, 3D' },
          { image: 'wtfo-hangar', alt: '3D render of the hangar looking out through a wide window onto a starfield', caption: 'Hangar interior, 3D' },
        ],
      },
      {
        heading: 'The model',
        items: [
          { image: 'alien-tpose', alt: '3D render of the alien mechanic model in a T-pose', caption: 'Model in T-pose' },
          { image: 'alien-wire', alt: 'Wireframe view of the alien mechanic model in a T-pose', caption: 'Wireframe' },
        ],
      },
    ],
  },
  {
    slug: 'dohva',
    title: 'Dohva',
    display: ['Dohva', 'dragon sculpt'],
    categories: ['3d'],
    label: 'Traditional sculpture',
    summary: 'A dragon sculpted in Sculpey clay: one half in full detail, the other revealing its anatomy.',
    intro: [
      'A traditional sculpt made with Sculpey clay and then baked.',
      'Half of the dragon is finished in full detail. The other half shows the anatomy underneath.',
    ],
    facts: [
      { term: 'Medium', detail: 'Sculpey polymer clay, baked' },
    ],
    card: { image: 'dohva-1', alt: 'Dohva, a clay dragon sculpture with folded wings on a rocky base' },
    hero: 'dohva-3',
    videos: [
      { platform: 'youtube', id: 'grxExYOStyw', title: 'Dragon Sculpture', thumb: 'video-dohva', alt: 'Frame from the dragon sculpture video showing the clay dragon on its base' },
    ],
    gallery: [
      { items: [
        { image: 'dohva-1', alt: 'The clay dragon from its detailed side, covered in scales, with wings folded', caption: 'Detailed side' },
        { image: 'dohva-2', alt: 'The dragon from its anatomical side, with muscles and ribs exposed', caption: 'Anatomy side' },
        { image: 'dohva-3', alt: 'The dragon facing forward with both wings spread over a rocky base', caption: 'Front view' },
      ] },
    ],
  },
  {
    slug: 'spartan',
    title: 'Spartan',
    categories: ['illustration', '3d'],
    label: 'Character design',
    summary: 'A Spartan warrior, as a painted character illustration and as a 3D model.',
    intro: [
      'A Spartan warrior explored twice: as a painted character illustration with spear and shield, and as a 3D model.',
    ],
    card: { image: 'spartan-painting', alt: 'Painting of a Spartan warrior with a crested helmet, spear and round shield', position: 'center 20%' },
    hero: 'spartan-painting',
    gallery: [
      { items: [
        { image: 'spartan-painting', alt: 'Painting of a Spartan warrior with a crested helmet, spear and shield, in a dusty golden haze', caption: 'Spartan, digital painting' },
        { image: 'spartan', alt: '3D model of a Spartan warrior in a red cape and crested helmet', caption: 'Spartan in 3D' },
      ] },
    ],
  },
  {
    slug: 'vampire-hunter-kate',
    title: 'Vampire Hunter Kate',
    display: ['Vampire hunter', 'Kate'],
    categories: ['illustration'],
    label: 'Character illustration',
    summary: 'A character illustration of a vampire hunter in a wide-brimmed hat, red coat and tall boots.',
    intro: [
      'A character illustration of Kate, a vampire hunter in a wide-brimmed hat, red coat and tall boots.',
    ],
    card: { image: 'kate', alt: 'Vampire Hunter Kate, a woman in a wide-brimmed hat and red coat', position: 'center 12%' },
    hero: 'kate',
    gallery: [
      { items: [
        { image: 'kate', alt: 'A vampire hunter with long dark hair, a wide-brimmed hat, red coat and tall boots, hands on her belt', caption: 'Vampire Hunter Kate' },
      ] },
    ],
  },
  {
    slug: 'king-kong',
    title: 'King Kong',
    categories: ['illustration'],
    label: 'Character illustration',
    summary: 'An armoured gorilla warrior with a great axe, painted against a burning orange sky.',
    intro: [
      'An armoured gorilla warrior with a great axe, painted against a burning orange sky.',
    ],
    card: { image: 'king-kong', alt: 'King Kong, an armoured gorilla warrior holding an axe' },
    hero: 'king-kong',
    gallery: [
      { items: [
        { image: 'king-kong', alt: 'A gorilla in gold and black armour holding a long axe, against an orange sky', caption: 'King Kong' },
      ] },
    ],
  },
  {
    slug: 'transformers-fan-art',
    title: 'Transformers Fan Art',
    display: ['Transformers', 'fan art'],
    categories: ['illustration'],
    label: 'Fan art / Digital painting',
    summary: 'A fan painting of Optimus Prime, inspired by Transformers: Dark of the Moon.',
    intro: [
      'A personal fan painting of Optimus Prime, inspired by Transformers: Dark of the Moon.',
    ],
    notice: 'Transformers and Optimus Prime are trademarks of Hasbro. This is unofficial fan art.',
    card: { image: 'transformers', alt: 'Fan painting of Optimus Prime wielding a glowing blade' },
    hero: 'transformers',
    gallery: [
      { items: [
        { image: 'transformers', alt: 'Optimus Prime in red and blue armour, raising a fiery blade', caption: 'Transformers fan art' },
      ] },
    ],
  },
  {
    slug: 'fatman',
    title: 'The FatMan Project',
    display: ['The FatMan', 'project'],
    categories: ['3d'],
    label: '3D / Environment',
    summary: 'Two renders of a dim, lived-in living room: a man slumped in an armchair, and the television corner.',
    intro: [
      'Two interior renders from a 3D scene: a heavy-set man slumped in an armchair in a dim living room, and the room’s television corner.',
    ],
    card: { image: 'fatman', alt: 'A 3D render of a heavy-set man slumped in an armchair in a dim living room' },
    hero: 'fatman',
    gallery: [
      { items: [
        { image: 'fatman', alt: 'A heavy-set man in a vest slumped in an armchair beside a fireplace, lit by a single lamp', caption: 'Living room' },
        { image: 'console', alt: 'A dim room with an old television, speakers and a magazine on a wooden floor', caption: 'Television corner' },
      ] },
    ],
  },
  {
    slug: 'poster-trial',
    title: 'Poster Trial',
    display: ['Poster', 'trial'],
    categories: ['design'],
    label: 'Graphic design / Trial project',
    summary: 'A trial run at poster making, with web banners and tablet app screens for a video app.',
    intro: [
      'A trial run at making posters, built around the SPH Razor video app. The set also includes web banners and tablet app screens.',
    ],
    notice: 'A poster-making trial rather than client work. SPH Razor branding belongs to its owner.',
    card: { image: 'ad-download', alt: 'Poster headed “Download the new SPH Razor app”, with phones and a QR code', position: 'center 30%' },
    hero: 'banner-set',
    gallery: [
      {
        heading: 'Posters',
        items: [
          { image: 'ad-scan', alt: 'Poster: a silhouetted face looking at a phone displaying a QR code, with the SPH Razor logo', caption: 'Scan to watch' },
          { image: 'ad-phones', alt: 'Poster: two smartphones showing the SPH Razor app above a QR code', caption: 'On every screen' },
          { image: 'ad-download', alt: 'Poster headed “Download the new SPH Razor app”, with phones, a QR code and app store badges', caption: 'Download the app' },
        ],
      },
      {
        heading: 'Banners and app screens',
        items: [
          { image: 'banner-set', alt: 'A sheet of SPH Razor web banners in several sizes with the line “Entertainment on the go”', caption: 'Web banner set' },
          { image: 'banner-skyscraper', alt: 'A small vertical banner reading “Entertainment on the go” with the SPH Razor logo', caption: 'Vertical banner' },
          { image: 'app-screen', alt: 'A dark tablet app screen with recommended videos and a featured story', caption: 'Tablet app screen' },
          { image: 'app-tablet', alt: 'A white tablet on a café table showing the video app', caption: 'The app on a tablet' },
        ],
      },
    ],
  },
  {
    slug: 'saikokira',
    title: 'Saikokira — Pachinko vs Ararush',
    display: ['Saikokira', 'Pachinko vs Ararush'],
    categories: ['motion'],
    label: 'Group 2D short film',
    summary: 'A 2D short film made with a group of friends, with Mingjie as the effects artist.',
    intro: [
      'A 2D short film made with a group of friends. As the effects artist, I animated the effects in the film as well as some of the character shots.',
    ],
    facts: [
      { term: 'Role', detail: 'Effects artist; effects animation and some character shots' },
      { term: 'Team', detail: 'Samuel Kambey, Wilson Halim, Bobbie Teo, Weatherly Tan, Chris Ong and Mingjie Tan' },
      { term: 'Film made with', detail: 'Digicel FlipBook, Toon Boom, Photoshop, After Effects and Premiere Pro' },
    ],
    card: { image: 'video-saikokira', alt: 'Title card reading “Iron Fist” in fiery letters, from Saikokira', fit: 'contain', tone: 'black' },
    hero: 'video-saikokira',
    videos: [
      { platform: 'vimeo', id: '84110618', title: 'Saikokira - Pachinko vs Ararush', label: 'Watch the film', thumb: 'video-saikokira', alt: 'Title card reading “Iron Fist” in fiery letters', note: 'Hosted on Samuel Kambey’s Vimeo channel.' },
    ],
    related: ['ararush'],
  },
];
