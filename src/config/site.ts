export interface Service {
  title: string;
  description: string;
  accent: string;
  icon: string;
  image: string;
  imageAlt: string;
  priceHint: string;
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
  address: string;
  addressShort: string;
  mapsUrl: string;
  directionsUrl: string;
  embedUrl: string;
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
  location: '600 Sunland Park Dr Ste 1-600, El Paso, TX 79912',
  address: '600 Sunland Park Dr Ste 1-600, El Paso, TX 79912',
  addressShort: '600 Sunland Park Dr, Ste 1-600',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=600%20Sunland%20Park%20Dr%20Ste%201-600%20El%20Paso%20TX%2079912',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=600%20Sunland%20Park%20Dr%20Ste%201-600%2C%20El%20Paso%2C%20TX%2079912',
  embedUrl:
    'https://www.google.com/maps?q=600%20Sunland%20Park%20Dr%20Ste%201-600%2C%20El%20Paso%2C%20TX%2079912&output=embed',
  email: 'hello@elaraglow.studio',
  instagram: '@elaraglowstudio',
  instagramUrl: 'https://instagram.com/elaraglowstudio',
  bookingUrl: 'https://elaraglowstudio.glossgenius.com/services',
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
    sub: 'Refined body care & waxing treatments crafted for comfort, confidence and calm. Book a full body wax, face wax, or Brazilian wax in El Paso, TX — private West Side suite by appointment.',
    ctaPrimary: 'Book Your Treatment',
    ctaSecondary: 'Our Services',
    stats: [
      { value: '100%', label: 'Private Suite' },
      { value: 'Wax', label: 'All Skin Types' },
      { value: 'Swift', label: 'Technique · Skin-First' },
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
      title: 'Full Body Wax',
      description:
        'Full-body waxing with skin-first care — smooth, long-lasting results in a private suite.',
      accent: '#6E6D3A',
      icon: '◑',
      image: '/treatments/half_legs.jpg',
      imageAlt: 'Full body wax in El Paso, TX at Elara Glow Studio',
      priceHint: 'From $10 · 10 min',
    },
    {
      title: 'Face Wax',
      description:
        'Precise, gentle face waxing for sensitive skin — brows, lip, chin and full face.',
      accent: '#A2B6A5',
      icon: '◒',
      image: '/treatments/face.jpg',
      imageAlt: 'Face wax in El Paso, TX at Elara Glow Studio',
      priceHint: 'From $12 · 15 min',
    },
    {
      title: 'Brazilian Wax',
      description:
        'Our signature Brazilian — precise, gentle, focused on comfort and long-lasting smoothness.',
      accent: '#335C53',
      icon: '◐',
      image: '/treatments/front_bikini.jpg',
      imageAlt: 'Brazilian wax in El Paso, TX at Elara Glow Studio',
      priceHint: 'From $40 · 20 min',
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
    { label: 'Precision', description: 'Precise, efficient technique. Kind to skin.' },
    { label: 'Smoothness', description: 'That post-wax smoothness — soft skin, calm finish, lasting glow.' },
    { label: 'Privacy', description: 'Private suite, discreet care, just for you.' },
    { label: 'Aftercare', description: 'Guidance that keeps skin calm at home.' },
  ],
};

export const NAV_LINKS = [
  { id: 'services', label: 'Services', href: '/#services' },
  { id: 'treatments', label: 'Treatments', href: '/treatments' },
  { id: 'about', label: 'About', href: '/#about' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
] as const;

export type NavId = (typeof NAV_LINKS)[number]['id'] | 'home';
