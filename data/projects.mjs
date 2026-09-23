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
        { image: 'ararush-painting', alt: 'Digital painting of Ararush, a lava creature striding through a fiery rocky landscape', caption: 'Ararush, original digital painting' },
        { image: 'ararush-painting-ai', alt: 'A lava-cracked stone creature roaring over a fiery rocky landscape', caption: 'Ararush painting, AI-regenerated' },
      ] },
    ],
    notice: 'One of the paintings is an AI-regenerated version of my original, shown next to it.',
    related: ['saikokira'],
  },
  {
    slug: 'companion',
    title: 'Companion',
    categories: ['illustration'],
    label: 'Digital painting / AI remaster',
    featured: true,
    summary: 'A digital painting of a warrior and a fantastical dragon companion in warm amber light.',
    intro: [
      'A digital painting exploring the bond between a warrior and a fantastical companion, with warm light, armour and a shared silhouette.',
    ],
    notice: 'The main image is an AI-regenerated version of my original painting, which is shown further down the page.',
    card: { image: 'companion-ai', alt: 'Companion: a dark knight beside a snarling black dragon in amber shadow' },
    hero: 'companion-ai',
    gallery: [
      { items: [
        { image: 'companion-ai', alt: 'A dark knight in black armour beside a snarling black dragon, in deep amber shadow', caption: 'Companion, AI-regenerated' },
      ] },
      { heading: 'The original', items: [
        { image: 'companion', alt: 'An armoured dragon alongside a warrior in a red cape, painted in warm amber tones', caption: 'Original digital painting' },
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
    label: 'Character illustration / AI remaster',
    featured: true,
    summary: 'A character illustration with an unsettling edge: a girl in a red dress clutching a small doll.',
    intro: [
      'A character illustration with an unsettling edge. An exploration of expression, atmosphere and visual storytelling.',
    ],
    notice: 'The main image is an AI-regenerated version of my original painting, which is shown further down the page.',
    card: { image: 'sunny-ai', alt: 'Sinister Sunny, a girl in a red dress holding a small toy and a knife', fit: 'contain', tone: 'night' },
    hero: 'sunny-ai',
    gallery: [
      { items: [
        { image: 'sunny-ai', alt: 'A barefoot girl with short auburn hair in a red dress, clutching a small toy and a knife, lit from behind in a dark room', caption: 'Sinister Sunny, AI-regenerated' },
      ] },
      { heading: 'The original', items: [
        { image: 'sunny', alt: 'A barefoot girl in a red dress holding a small doll, lit from behind in a dark room', caption: 'Original character illustration' },
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
    label: 'Character design / AI remaster',
    summary: 'A Spartan warrior, as a painted character illustration and as a 3D model.',
    intro: [
      'A Spartan warrior explored twice: as a painted character illustration with spear and shield, and as a 3D model.',
    ],
    notice: 'The main image is an AI-regenerated version of my original painting, which is shown further down the page with the 3D model.',
    card: { image: 'spartan-ai', alt: 'A Spartan warrior with a crested helmet, spear and round red shield', position: 'center 25%' },
    hero: 'spartan-ai',
    gallery: [
      { items: [
        { image: 'spartan-ai', alt: 'A Spartan warrior in a crested helmet and red cloak, holding a spear and a round red shield, in a misty haze', caption: 'Spartan, AI-regenerated' },
      ] },
      { heading: 'The originals', items: [
        { image: 'spartan-painting', alt: 'Painting of a Spartan warrior with a crested helmet, spear and shield, in a dusty golden haze', caption: 'Original digital painting' },
        { image: 'spartan', alt: '3D model of a Spartan warrior in a red cape and crested helmet', caption: 'Spartan in 3D' },
      ] },
    ],
  },
  {
    slug: 'vampire-hunter-kate',
    title: 'Vampire Hunter Kate',
    display: ['Vampire hunter', 'Kate'],
    categories: ['illustration'],
    label: 'Character illustration / AI remaster',
    summary: 'A character illustration of a vampire hunter in a wide-brimmed hat, red coat and tall boots.',
    intro: [
      'A character illustration of Kate, a vampire hunter in a wide-brimmed hat, red coat and tall boots.',
    ],
    notice: 'The main image is an AI-regenerated version of my original painting, which is shown further down the page.',
    card: { image: 'kate-ai', alt: 'Vampire Hunter Kate, a smiling woman in a wide-brimmed hat and red coat', position: 'center 20%' },
    hero: 'kate-ai',
    gallery: [
      { items: [
        { image: 'kate-ai', alt: 'A smiling woman in a wide-brimmed hat, red coat, corset and tall boots, hands on her hips', caption: 'Vampire Hunter Kate, AI-regenerated' },
      ] },
      { heading: 'The original', items: [
        { image: 'kate', alt: 'A vampire hunter with long dark hair, a wide-brimmed hat, red coat and tall boots, hands on her belt', caption: 'Original character illustration' },
      ] },
    ],
  },
  {
    slug: 'king-kong',
    title: 'King Kong',
    categories: ['illustration'],
    label: 'Character illustration / AI remaster',
    summary: 'An armoured gorilla warrior with a great axe, painted against a burning orange sky.',
    intro: [
      'An armoured gorilla warrior with a great axe, painted against a burning orange sky.',
    ],
    notice: 'The main image is an AI-regenerated version of my original painting, which is shown further down the page.',
    card: { image: 'king-kong-ai', alt: 'King Kong, a crowned gorilla warrior in gold armour holding an axe' },
    hero: 'king-kong-ai',
    gallery: [
      { items: [
        { image: 'king-kong-ai', alt: 'A crowned gorilla warrior in gold and black armour holding a great axe against an orange background', caption: 'King Kong, AI-regenerated' },
      ] },
      { heading: 'The original', items: [
        { image: 'king-kong', alt: 'A gorilla in gold and black armour holding a long axe, against an orange sky', caption: 'Original digital painting' },
      ] },
    ],
  },
  {
    slug: 'transformers-fan-art',
    title: 'Transformers Fan Art',
    display: ['Transformers', 'fan art'],
    categories: ['illustration'],
    label: 'Fan art / AI remaster',
    summary: 'A fan painting of Optimus Prime, inspired by Transformers: Dark of the Moon.',
    intro: [
      'A personal fan painting of Optimus Prime, inspired by Transformers: Dark of the Moon.',
    ],
    notice: ['The main image is an AI-regenerated version of my original painting, which is shown further down the page.', 'Transformers and Optimus Prime are trademarks of Hasbro. This is unofficial fan art.'],
    card: { image: 'transformers-ai', alt: 'Fan art of Optimus Prime striding through smoke with a glowing blade' },
    hero: 'transformers-ai',
    gallery: [
      { items: [
        { image: 'transformers-ai', alt: 'Optimus Prime striding through smoke and debris with a glowing blade, another robot and an explosion behind him', caption: 'Transformers fan art, AI-regenerated' },
      ] },
      { heading: 'The original', items: [
        { image: 'transformers', alt: 'Optimus Prime in red and blue armour, raising a fiery blade', caption: 'Original fan painting' },
      ] },
    ],
  },
  {
    slug: 'prosthetic-arm',
    title: 'Prosthetic Arm',
    display: ['Prosthetic', 'arm'],
    categories: ['illustration'],
    label: 'Character illustration / AI remaster',
    summary: 'A woman with a prosthetic arm crouching against a concrete wall beside a large rifle.',
    intro: [
      'A woman with a prosthetic arm crouching against a concrete wall beside a large rifle.',
    ],
    notice: 'This image is an AI-regenerated version of one of my original digital paintings.',
    card: { image: 'prosthetic-arm-ai', alt: 'Prosthetic Arm: a woman with a white prosthetic arm crouching barefoot against a concrete wall beside a large rifle' },
    hero: 'prosthetic-arm-ai',
    gallery: [
      { items: [
        { image: 'prosthetic-arm-ai', alt: 'A woman with a white prosthetic arm crouching barefoot against a concrete wall beside a large rifle', caption: 'Prosthetic Arm, AI-regenerated' },
      ] },
    ],
  },
  {
    slug: 'futuristic-tank',
    title: 'Futuristic Tank',
    display: ['Futuristic', 'tank'],
    categories: ['illustration'],
    label: 'Vehicle design / AI remaster',
    summary: 'A black and grey tank with orange stripes and clawed feet, parked on a rocky lakeshore below snowy mountains.',
    intro: [
      'A black and grey tank with orange stripes and clawed feet, parked on a rocky lakeshore below snowy mountains.',
    ],
    notice: 'This image is an AI-regenerated version of one of my original digital paintings.',
    card: { image: 'futuristic-tank-ai', alt: 'Futuristic Tank: a black and grey futuristic tank with orange stripes and clawed feet on a rocky lakeshore below snowy mountains' },
    hero: 'futuristic-tank-ai',
    gallery: [
      { items: [
        { image: 'futuristic-tank-ai', alt: 'A black and grey futuristic tank with orange stripes and clawed feet on a rocky lakeshore below snowy mountains', caption: 'Futuristic Tank, AI-regenerated' },
      ] },
    ],
  },
  {
    slug: 'waving-boy',
    title: 'Waving Boy',
    display: ['Waving', 'boy'],
    categories: ['illustration'],
    label: 'Character illustration / AI remaster',
    summary: 'A cheerful boy with black hair and a red T-shirt, waving hello.',
    intro: [
      'A cheerful boy with black hair and a red T-shirt, waving hello.',
    ],
    notice: 'This image is an AI-regenerated version of one of my original digital paintings.',
    card: { image: 'waving-boy-ai', alt: 'Waving Boy: a smiling boy with black hair in a red T-shirt waving, against a blue background', position: 'center 30%' },
    hero: 'waving-boy-ai',
    gallery: [
      { items: [
        { image: 'waving-boy-ai', alt: 'A smiling boy with black hair in a red T-shirt waving, against a blue background', caption: 'Waving Boy, AI-regenerated' },
      ] },
    ],
  },
  {
    slug: 'reptile-brute',
    title: 'Reptile Brute',
    display: ['Reptile', 'brute'],
    categories: ['illustration'],
    label: 'Creature design / AI remaster',
    summary: 'A muscular reptilian monster with a finned crest and clawed hands, standing in a glowing cave.',
    intro: [
      'A muscular reptilian monster with a finned crest and clawed hands, standing in a glowing cave.',
    ],
    notice: 'This image is an AI-regenerated version of one of my original digital paintings.',
    card: { image: 'reptile-brute-ai', alt: 'Reptile Brute: a muscular green reptilian monster with a finned crest and clawed hands, standing in a glowing cave', position: 'center 25%' },
    hero: 'reptile-brute-ai',
    gallery: [
      { items: [
        { image: 'reptile-brute-ai', alt: 'A muscular green reptilian monster with a finned crest and clawed hands, standing in a glowing cave', caption: 'Reptile Brute, AI-regenerated' },
      ] },
    ],
  },
  {
    slug: 'archer-fan-art',
    title: 'Archer Fan Art',
    display: ['Archer', 'fan art'],
    categories: ['illustration'],
    label: 'Fan art / AI remaster',
    summary: 'A hooded archer in gold and black armour drawing a bow with a glowing teal arrow, inspired by League of Legends.',
    intro: [
      'A hooded archer in gold and black armour drawing a bow with a glowing teal arrow, inspired by League of Legends.',
    ],
    notice: ['This image is an AI-regenerated version of one of my original digital paintings.', 'League of Legends is a trademark of Riot Games. This is unofficial fan art.'],
    card: { image: 'archer-ai', alt: 'Archer Fan Art: a hooded archer in gold and black armour drawing a bow with a glowing teal arrow' },
    hero: 'archer-ai',
    gallery: [
      { items: [
        { image: 'archer-ai', alt: 'A hooded archer in gold and black armour drawing a bow with a glowing teal arrow', caption: 'Archer Fan Art, AI-regenerated' },
      ] },
    ],
  },
  {
    slug: 'red-armour',
    title: 'Red Armour',
    display: ['Red', 'armour'],
    categories: ['illustration'],
    label: 'Illustration / AI remaster',
    summary: 'A soldier in red armour takes aim as a purple creature leaps through a burst of light, firing.',
    intro: [
      'A soldier in red armour takes aim as a purple creature leaps through a burst of light, firing.',
    ],
    notice: 'This image is an AI-regenerated version of one of my original digital paintings.',
    card: { image: 'red-armour-ai', alt: 'Red Armour: a soldier in red armour aiming a rifle as a purple creature leaps through a burst of light, firing', position: '35% center' },
    hero: 'red-armour-ai',
    gallery: [
      { items: [
        { image: 'red-armour-ai', alt: 'A soldier in red armour aiming a rifle as a purple creature leaps through a burst of light, firing', caption: 'Red Armour, AI-regenerated' },
      ] },
    ],
  },
  {
    slug: 'dragon-reaper',
    title: 'Dragon Reaper',
    display: ['Dragon', 'reaper'],
    categories: ['illustration'],
    label: 'Character illustration / AI remaster',
    summary: 'A hooded skeletal reaper with a scythe, a dragon rising behind him over a burning landscape.',
    intro: [
      'A hooded skeletal reaper with a scythe, a dragon rising behind him over a burning landscape.',
    ],
    notice: 'This image is an AI-regenerated version of one of my original digital paintings.',
    card: { image: 'dragon-reaper-ai', alt: 'Dragon Reaper: a hooded skeletal reaper holding a scythe, with a dragon rising behind him and a head half-buried at his feet', position: 'center 30%' },
    hero: 'dragon-reaper-ai',
    gallery: [
      { items: [
        { image: 'dragon-reaper-ai', alt: 'A hooded skeletal reaper holding a scythe, with a dragon rising behind him and a head half-buried at his feet', caption: 'Dragon Reaper, AI-regenerated' },
      ] },
    ],
  },
  {
    slug: 'fire-wolverine',
    title: 'Fire Wolverine',
    display: ['Fire', 'wolverine'],
    categories: ['illustration'],
    label: 'Creature design / AI remaster',
    summary: 'A snarling wolverine with yellow fur, purple horns and long claws, its back ablaze.',
    intro: [
      'A snarling wolverine with yellow fur, purple horns and long claws, its back ablaze.',
    ],
    notice: 'This image is an AI-regenerated version of one of my original digital paintings.',
    card: { image: 'fire-wolverine-ai', alt: 'Fire Wolverine: a snarling wolverine with yellow fur, purple horns and long claws, its back ablaze with flames' },
    hero: 'fire-wolverine-ai',
    gallery: [
      { items: [
        { image: 'fire-wolverine-ai', alt: 'A snarling wolverine with yellow fur, purple horns and long claws, its back ablaze with flames', caption: 'Fire Wolverine, AI-regenerated' },
      ] },
    ],
  },
  {
    slug: 'paladin-character-sheet',
    title: 'Paladin Character Sheet',
    display: ['Paladin', 'character sheet'],
    categories: ['illustration'],
    label: 'Character design / AI remaster',
    summary: 'A character sheet for a paladin in purple and gold armour: a portrait bust plus front, side and back views.',
    intro: [
      'A character sheet for a paladin in purple and gold armour: a portrait bust plus front, side and back views.',
    ],
    notice: 'This image is an AI-regenerated version of one of my original digital paintings.',
    card: { image: 'paladin-sheet-ai', alt: 'Paladin Character Sheet: character sheet of a female paladin in purple and gold armour with a long ponytail and arrows: a portrait plus front, side and back views', position: 'left center' },
    hero: 'paladin-sheet-ai',
    gallery: [
      { items: [
        { image: 'paladin-sheet-ai', alt: 'Character sheet of a female paladin in purple and gold armour with a long ponytail and arrows: a portrait plus front, side and back views', caption: 'Paladin Character Sheet, AI-regenerated' },
      ] },
    ],
  },
  {
    slug: 'pirate-character-sheet',
    title: 'Pirate Character Sheet',
    display: ['Pirate', 'character sheet'],
    categories: ['illustration'],
    label: 'Character design / AI remaster',
    summary: 'A character sheet for a pirate with a tricorn hat and twin swords: full figure, portrait and sword studies.',
    intro: [
      'A character sheet for a pirate with a tricorn hat and twin swords: full figure, portrait and sword studies.',
    ],
    notice: 'This image is an AI-regenerated version of one of my original digital paintings.',
    card: { image: 'pirate-sheet-ai', alt: 'Pirate Character Sheet: character sheet of a female pirate with a tricorn hat and twin swords: full figure, portrait and sword studies', position: 'center center' },
    hero: 'pirate-sheet-ai',
    gallery: [
      { items: [
        { image: 'pirate-sheet-ai', alt: 'Character sheet of a female pirate with a tricorn hat and twin swords: full figure, portrait and sword studies', caption: 'Pirate Character Sheet, AI-regenerated' },
      ] },
    ],
  },
  {
    slug: 'fire-sorceress',
    title: 'Fire Sorceress',
    display: ['Fire', 'sorceress'],
    categories: ['illustration'],
    label: 'Character illustration / AI remaster',
    summary: 'A red-haired woman holding a flame in her raised hand, her full figure walking out of smoke and fire beside her.',
    intro: [
      'A red-haired woman holding a flame in her raised hand, her full figure walking out of smoke and fire beside her.',
    ],
    notice: 'This image is an AI-regenerated version of one of my original digital paintings.',
    card: { image: 'fire-sorceress-ai', alt: 'Fire Sorceress: a red-haired woman holding a flame in her raised hand, with a smaller full-length figure of her walking out of smoke and fire', position: 'center 20%' },
    hero: 'fire-sorceress-ai',
    gallery: [
      { items: [
        { image: 'fire-sorceress-ai', alt: 'A red-haired woman holding a flame in her raised hand, with a smaller full-length figure of her walking out of smoke and fire', caption: 'Fire Sorceress, AI-regenerated' },
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
