export interface Service {
  title: string;
  description: string;
  accent: string;
  icon: string;
}

export interface HeroImage {
  src: string;
  alt: string;
}

export interface HeroConfig {
  eyebrow: string;
  headline: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: Array<{ value: string; label: string }>;
  images: HeroImage[];
}

export interface BusinessHours {
  day: string;
  time: string;
  closed?: boolean;
}

export interface AboutConfig {
  kicker: string;
  title: string;
  body: string;
  highlights: Array<{ title: string; description: string }>;
}

export interface ExperienceItem {
  label: string;
  description: string;
}

export interface SiteConfig {
  brand: string;
  location: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  bookingUrl: string;
  hero: HeroConfig;
  businessHours: BusinessHours[];
  services: Service[];
  about: AboutConfig;
  values: string[];
  experience: ExperienceItem[];
}

export const siteConfig: SiteConfig = {
  brand: 'ELARA GLOW STUDIO',
  location: 'El Paso, TX — west',
  email: 'hello@elaraglow.studio',
  instagram: '@elaraglowstudio',
  instagramUrl: 'https://instagram.com/elaraglowstudio',
  bookingUrl: 'https://elaraglowstudio.glossgenius.com/',
  businessHours: [
    { day: 'Monday', time: '2 PM - 7:30 PM' },
    { day: 'Tuesday', time: '2 PM - 7:30 PM' },
    { day: 'Wednesday', time: '2 PM - 7:30 PM' },
    { day: 'Thursday', time: '8 AM - 1:30 PM' },
    { day: 'Friday', time: '8 AM - 2 PM' },
    { day: 'Saturday', time: '9 AM - 3:30 PM' },
    { day: 'Sunday', time: 'Closed', closed: true },
  ],
  hero: {
    eyebrow: 'El Paso — West Side Studio · By Appointment',
    headline: 'Softness in\nevery detail.',
    sub: 'Refined body care & waxing treatments crafted for comfort, confidence and calm.',
    ctaPrimary: 'Book Your Treatment',
    ctaSecondary: 'Our Services',
    stats: [
      { value: '100%', label: 'Private Suite' },
      { value: 'Soft', label: 'Wax · Sensitive Skin' },
      { value: 'Calm', label: 'No-Rush Treatments' },
    ],
    images: [
      { src: '/elara_1.jpg', alt: 'Elara Glow Studio treatment detail — soft light and calm textures' },
      { src: '/elara_2.jpg', alt: 'Elara Glow Studio treatment moment — refined body care in progress' },
      { src: '/elara_3.jpg', alt: 'Elara Glow Studio private suite — serene west El Paso studio' },
      { src: '/elara_4.jpg', alt: 'Elara Glow Studio finishing touch — smooth, radiant skin' },
    ],
  },
  services: [
    {
      title: 'Brazilian Specialist',
      description:
        'Precise, gentle technique focused on comfort and long-lasting smoothness.',
      accent: '#335C53',
      icon: '◐',
    },
    {
      title: 'Body Waxing',
      description:
        'Full-body treatments — arms, legs, underarms, face — with skin-first care.',
      accent: '#6E6D3A',
      icon: '◑',
    },
    {
      title: 'Skin Comfort Treatments',
      description:
        'Pre- and post-wax support to soothe, hydrate and restore natural glow.',
      accent: '#A2B6A5',
      icon: '◒',
    },
  ],
  about: {
    kicker: 'Our Identity',
    title: 'Beauty in harmony with wellbeing.',
    body: 'Elara was created with the vision of transforming personal care into a refined and comforting experience, where beauty and wellbeing exist in harmony. Focused on body care and hair removal treatments, Elara approaches beauty through delicacy, precision and attention to detail. Every service is designed to provide not only visible results, but also a sense of comfort, confidence and self-connection.',
    highlights: [
      {
        title: 'Softness',
        description: 'Fluid lines, flowing form, marble calm.',
      },
      {
        title: 'Continuity',
        description: 'Care that honors renewal & self-connection.',
      },
    ],
  },
  values: [
    'Waxing',
    'Elegant',
    'Confidence',
    'Softness',
    'Harmony',
    'Skin',
    'Quality',
    'Renewal',
    'Change',
    'Feminine',
    'Aesthetic',
    'Wellness',
    'Detail',
    'Self-care',
  ],
  experience: [
    { label: 'Precision', description: 'Slow, intentional technique. No rushing.' },
    { label: 'Warmth', description: 'Warm towels, soft light, calm breath.' },
    { label: 'Privacy', description: 'Private suite, discreet care, just for you.' },
    { label: 'Aftercare', description: 'Guidance that keeps skin calm at home.' },
  ],
};

export const NAV_LINKS = [
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

export type NavId = (typeof NAV_LINKS)[number]['id'] | 'home';
