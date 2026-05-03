export const profile = {
  name: 'Mohamed Ahmed',
  role: 'Video Editor & Color Grading Artist',
  tagline:
    'A long-form scroll journey through visual transformation, mood, and precision post-production craft.',
  about:
    'I shape footage into emotional narratives through rhythm, grading, sound texture, and cinematic transition design using DaVinci Resolve as my core finishing tool. Every section is directed to feel immersive, intentional, and story-first.'
};

export const portraitImage =
  'https://res.cloudinary.com/dotredxrx/image/upload/q_auto/f_auto/v1777216098/my_photo00087537_t2lghn.png';

export const videoSources = {
  heroVideo: 'https://res.cloudinary.com/dotredxrx/video/upload/q_auto:best/f_auto/v1777111663/Lake_xprehu.mp4',
  featuredVideo: 'https://res.cloudinary.com/dotredxrx/video/upload/q_auto:best/f_auto/v1777111566/Bedroom_zkqrxl.mp4',
  beforeVideo: 'https://res.cloudinary.com/dotredxrx/video/upload/q_auto:best/f_auto/v1777111459/gas1_video-converter.com_g7trmg.mp4',
  afterVideo: 'https://res.cloudinary.com/dotredxrx/video/upload/q_auto:best/f_auto/v1777111469/gas2_video-converter.com_suw8q3.mp4',
  maskingVideo: 'https://res.cloudinary.com/dotredxrx/video/upload/q_auto:best/f_auto/v1777111644/Masking_o5hhml.mp4',
  motionVideo1: 'https://res.cloudinary.com/dotredxrx/video/upload/q_auto:best/f_auto/v1777111526/Road_jlqekt.mp4',
  motionVideo2: 'https://res.cloudinary.com/dotredxrx/video/upload/q_auto:best/f_auto/v1777111534/city_video-converter.com_vkch2x.mp4',
  showcaseVideo: 'https://res.cloudinary.com/dotredxrx/video/upload/q_auto:best/f_auto/v1777111502/bike-black_video-converter.com_arqtu1.mp4',
  bwVideo: 'https://res.cloudinary.com/dotredxrx/video/upload/q_auto:best/f_auto/v1777056389/bw_kpmapt.mp4',
  extraShowcaseVideo: 'https://res.cloudinary.com/dotredxrx/video/upload/q_auto:best/f_auto/v1777113944/Mountain_zxmajh.mp4'
};

export const videoShowcase = [
  {
    title: 'Bedroom — Featured Short Film',
    description: 'Featured short film project.',
    credit:
      'Credit: Editing, Color Grading, and Sound Design by Mohamed Ahmed. Cinematography by another creator.',
    src: videoSources.featuredVideo
  },
  {
    title: 'Lake',
    description: 'Calm landscape sequence with cinematic mood.',
    src: videoSources.heroVideo
  },
  {
    title: 'Bike Black',
    description: 'Black-and-white cinematic piece with contrast and texture.',
    src: videoSources.showcaseVideo
  },
  {
    title: 'Road',
    description: 'Movement, framing, and grading in open space.',
    src: videoSources.motionVideo1
  },
  {
    title: 'Mountain',
    description: 'Scenic sequence with scale, natural depth, and immersive grading.',
    src: videoSources.extraShowcaseVideo
  },
  {
    title: 'Gas Station — Green Mood',
    description: 'Standalone grade with a green tonal mood.',
    src: videoSources.beforeVideo
  },
  {
    title: 'Gas Station — Red Mood',
    description: 'Standalone grade with a red tonal mood.',
    src: videoSources.afterVideo
  },
  {
    title: 'BW — Motion & Editing Reel',
    description: 'Reel-style editing with transitions, movement, and text.',
    src: videoSources.bwVideo
  },
  {
    title: 'Masking',
    description: 'Masking and compositing precision showcase.',
    src: videoSources.maskingVideo
  }
];


export const heroShowcase = {
  title: 'Mountain',
  description: 'A scenic opening visual built around scale, natural depth, and immersive grading.',
  src: videoSources.extraShowcaseVideo
};

export const imageComparison = {
  title: 'Before / After',
  description:
    'A clear side-by-side transformation showing the difference between the original image and the final graded result.',
  beforeImage:
    'https://res.cloudinary.com/dotredxrx/image/upload/q_auto:best/f_auto/v1777116419/photo1_00087380_san36y.png',
  afterImage:
    'https://res.cloudinary.com/dotredxrx/image/upload/q_auto:best/f_auto/v1777116425/photo00087380_cnw9mt.png'
};

export const revealLines = [
  'I sculpt pace so every cut breathes with intent.',
  'I grade color to move emotion before dialogue begins.',
  'I design transitions that feel invisible yet unforgettable.'
];

export const gradingPanels = [
  {
    title: 'Noir Compression',
    description: 'Deep blacks, restrained highlights, and controlled skin tones for tense narrative sequences.'
  },
  {
    title: 'Golden Atmosphere',
    description: 'Soft warm roll-off with cinematic contrast for romantic and memory-driven scenes.'
  },
  {
    title: 'Neon Drift',
    description: 'Cool shadows and electric accents crafted for high-energy urban storytelling.'
  }
];

export const maskingPanels = [
  {
    kicker: 'Precision',
    title: 'Tracked Mask Choreography',
    text: 'Mask systems are timed to camera movement so attention shifts feel guided, not forced.'
  },
  {
    kicker: 'Narrative',
    title: 'Rhythm-Driven Transition Layers',
    text: 'Multiple blend layers and sound-led cuts create transitions that connect scenes with flow.'
  }
];

export const workMoments = [
  { kicker: 'Film Sequence', title: 'Midnight Street Transformation' },
  { kicker: 'Brand Story', title: 'Portrait-To-Product Motion Arc' },
  { kicker: 'Music Visual', title: 'Pulse Edit With Tonal Shift' },
  { kicker: 'Social Trailer', title: 'Fast Narrative Cutdown' }
];
