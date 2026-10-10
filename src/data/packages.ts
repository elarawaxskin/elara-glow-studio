export interface PackageInclude {
  label: string;
  detail: string;
  image: string;
}

export interface GlowPackage {
  slug: string;
  name: string;
  tagline: string;
  priceLabel: string;
  price: number;
  regularPriceLabel: string;
  regularPrice: number;
  saveLabel: string;
  perVisitLabel: string;
  description: string;
  includes: PackageInclude[];
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export const PACKAGES_BOOKING_URL = 'https://elaraglowstudio.glossgenius.com/shop/packages';

export const PACKAGES: GlowPackage[] = [
  {
    slug: '3-month-smooth-package',
    name: '3-Month Smooth Package',
    tagline: 'Most loved · Stay smooth all season',
    priceLabel: '$265',
    price: 265,
    regularPriceLabel: '$300',
    regularPrice: 300,
    saveLabel: 'Save $35',
    perVisitLabel: '≈ $88 / visit',
    description:
      '3 Brazilian + 3 underarm + 3 stomach strip. One calm routine for head-to-toe smoothness — book, glow, repeat.',
    includes: [
      {
        label: '3× Brazilian',
        detail: 'Signature gentle Brazilian',
        image: '/treatments/front_bikini.jpg',
      },
      {
        label: '3× Underarm',
        detail: 'Fresh & smooth',
        image: '/treatments/under_arms.jpg',
      },
      {
        label: '3× Stomach strip',
        detail: 'Quick polish add-on',
        image: '/treatments/stomach.jpg',
      },
    ],
    image: '/treatments/front_bikini.jpg',
    imageAlt: '3-Month Smooth Package — Brazilian, underarm and stomach strip wax bundle in El Paso, TX',
    featured: true,
  },
  {
    slug: '3-brazilian-package',
    name: '3 Brazilian Package',
    tagline: 'Commit to smooth',
    priceLabel: '$175',
    price: 175,
    regularPriceLabel: '$195',
    regularPrice: 195,
    saveLabel: 'Save $20',
    perVisitLabel: '≈ $58.30 / service',
    description:
      '3 Brazilian wax appointments in one bundle. Our signature precise, gentle Brazilian — long-lasting smoothness for less.',
    includes: [
      {
        label: '3× Brazilian',
        detail: 'Signature gentle Brazilian',
        image: '/treatments/front_bikini.jpg',
      },
    ],
    image: '/treatments/front_bikini.jpg',
    imageAlt: '3 Brazilian Package — three Brazilian wax appointments in El Paso, TX',
  },
];
