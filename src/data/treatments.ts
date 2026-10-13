export type TreatmentCategory = 'Face' | 'Bikini & Brazilian' | 'Body' | 'Combos & Add-ons' | 'Lash';

export interface Treatment {
  slug: string;
  name: string;
  priceLabel: string;
  price: number;
  durationLabel: string;
  durationMin: number;
  description: string;
  image: string;
  imageAlt: string;
  category: TreatmentCategory;
  regularPriceLabel?: string;
  badge?: string;
  addOnLabel?: string;
}

export const TREATMENT_CATEGORIES: TreatmentCategory[] = [
  'Face',
  'Bikini & Brazilian',
  'Body',
  'Combos & Add-ons',
  'Lash',
];

export const TREATMENTS_BOOKING_URL = 'https://elaraglowstudio.glossgenius.com/services';

export const TREATMENTS: Treatment[] = [
  { slug: 'eyebrows', name: 'Eyebrows', priceLabel: '$20', price: 20, durationLabel: '30 min', durationMin: 30, description: 'Precise shaping and cleanup for balanced, defined brows.', image: '/treatments/eyebrows.jpg', imageAlt: 'Eyebrow waxing treatment at Elara Glow Studio', category: 'Face' },
  { slug: 'upper-lip', name: 'Upper lip', priceLabel: '$12', price: 12, durationLabel: '15 min', durationMin: 15, description: 'Quick, gentle upper-lip smoothing for sensitive skin.', image: '/treatments/lip.jpg', imageAlt: 'Upper lip waxing treatment', category: 'Face' },
  { slug: 'lower-lip', name: 'Lower lip', priceLabel: '$12', price: 12, durationLabel: '15 min', durationMin: 15, description: 'Detailed lower-lip cleanup with calming aftercare.', image: '/treatments/lip.jpg', imageAlt: 'Lower lip waxing treatment', category: 'Face' },
  { slug: 'chin', name: 'Chin', priceLabel: '$14', price: 14, durationLabel: '15 min', durationMin: 15, description: 'Smooth chin wax with skin-first technique.', image: '/treatments/chin.jpg', imageAlt: 'Chin waxing treatment', category: 'Face' },
  { slug: 'sideburns', name: 'Sideburns', priceLabel: '$15', price: 15, durationLabel: '25 min', durationMin: 25, description: 'Clean, soft sideburn refinement for a polished hairline.', image: '/treatments/face.jpg', imageAlt: 'Sideburn waxing treatment', category: 'Face' },
  { slug: 'cheeks', name: 'Cheeks', priceLabel: '$12', price: 12, durationLabel: '20 min', durationMin: 20, description: 'Gentle cheek smoothing for an even, radiant finish.', image: '/treatments/face.jpg', imageAlt: 'Cheek waxing treatment', category: 'Face' },
  { slug: 'nose', name: 'Nose', priceLabel: '$15', price: 15, durationLabel: '25 min', durationMin: 25, description: 'Inside nose and outside touch-up, done gently and safely.', image: '/treatments/face.jpg', imageAlt: 'Nose waxing treatment', category: 'Face' },
  { slug: 'ears', name: 'Ears', priceLabel: '$15', price: 15, durationLabel: '25 min', durationMin: 25, description: 'Detailed outer-ear cleanup with gentle care.', image: '/treatments/ears.jpg', imageAlt: 'Ear waxing treatment', category: 'Face' },
  { slug: 'neck', name: 'Neck', priceLabel: '$15', price: 15, durationLabel: '25 min', durationMin: 25, description: 'Neckline smoothing for a clean, comfortable feel.', image: '/treatments/face.jpg', imageAlt: 'Neck waxing treatment', category: 'Face' },
  { slug: 'full-face', name: 'Full face', priceLabel: '$55', price: 55, durationLabel: '45 min', durationMin: 45, description: 'Complete facial wax — includes eyebrows — for total smoothness.', image: '/treatments/face.jpg', imageAlt: 'Full face waxing treatment', category: 'Face' },
  { slug: 'brazilian', name: 'Brazilian (Female Anatomy Only)', priceLabel: '$65', price: 65, durationLabel: '30 min', durationMin: 30, description: 'Our signature precise, gentle Brazilian for long-lasting smoothness.', image: '/treatments/front_bikini.jpg', imageAlt: 'Brazilian wax treatment', category: 'Bikini & Brazilian' },
  { slug: 'front-bikini', name: 'Front Bikini (Female Anatomy Only)', priceLabel: '$55', price: 55, durationLabel: '25 min', durationMin: 25, description: 'Everything in the front is waxed, the back is left alone.', image: '/treatments/front_bikini.jpg', imageAlt: 'Front bikini wax treatment', category: 'Bikini & Brazilian' },
  { slug: 'bikini-line', name: 'Bikini line (Female Anatomy Only)', priceLabel: '$40', price: 40, durationLabel: '20 min', durationMin: 20, description: 'Neat bikini-line cleanup, perfect for swim and self-care.', image: '/treatments/front_bikini.jpg', imageAlt: 'Bikini line wax treatment', category: 'Bikini & Brazilian' },
  { slug: 'full-butt', name: 'Full butt (Female Anatomy Only)', priceLabel: '$30', price: 30, durationLabel: '25 min', durationMin: 25, description: 'Full butt wax with private, discreet care.', image: '/treatments/full_butt.jpg', imageAlt: 'Full butt wax treatment', category: 'Bikini & Brazilian' },
  { slug: 'hydro-jelly-mask', name: 'Hydro jelly mask (Female Anatomy)', priceLabel: '$20', price: 20, durationLabel: '10 min', durationMin: 10, description: 'Mask will calm, repair and invigorate the skin post wax.', image: '/treatments/hydro_jelly_mask.jpg', imageAlt: 'Hydro jelly mask post-wax treatment', category: 'Bikini & Brazilian' },
  { slug: 'full-back', name: 'Full back', priceLabel: '$60', price: 60, durationLabel: '35 min', durationMin: 35, description: 'Complete back smoothing with soothing aftercare.', image: '/treatments/full_back.jpg', imageAlt: 'Full back wax treatment', category: 'Body' },
  { slug: 'half-back', name: 'Half back', priceLabel: '$25', price: 25, durationLabel: '25 min', durationMin: 25, description: 'Choose upper back or lower back.', image: '/treatments/full_back.jpg', imageAlt: 'Half back wax treatment', category: 'Body' },
  { slug: 'shoulders', name: 'Shoulders', priceLabel: '$20', price: 20, durationLabel: '15 min', durationMin: 15, description: 'Shoulder smoothing for an even, clean finish.', image: '/treatments/full_back.jpg', imageAlt: 'Shoulder wax treatment', category: 'Body' },
  { slug: 'chest', name: 'Chest', priceLabel: '$20+', price: 20, durationLabel: '15+ min', durationMin: 15, description: 'Chest wax — price varies by coverage.', image: '/treatments/full_back.jpg', imageAlt: 'Chest wax treatment', category: 'Body' },
  { slug: 'full-arms', name: 'Full Arms', priceLabel: '$50', price: 50, durationLabel: '45 min', durationMin: 45, description: 'Full-arm smoothing from shoulder to wrist.', image: '/treatments/full_arm.jpg', imageAlt: 'Full arm wax treatment', category: 'Body' },
  { slug: 'half-arm', name: 'Half Arm', priceLabel: '$40', price: 40, durationLabel: '35 min', durationMin: 35, description: 'Choose lower or upper arm.', image: '/treatments/full_arm.jpg', imageAlt: 'Half arm wax treatment', category: 'Body' },
  { slug: 'underarms', name: 'Underarms', priceLabel: '$25', price: 25, durationLabel: '20 min', durationMin: 20, description: 'Underarm wax for lasting freshness and smoothness.', image: '/treatments/under_arms.jpg', imageAlt: 'Underarm wax treatment', category: 'Body' },
  { slug: 'full-leg', name: 'Full leg', priceLabel: '$85', price: 85, durationLabel: '50 min', durationMin: 50, description: 'Full-leg wax for silky, long-lasting results.', image: '/treatments/half_legs.jpg', imageAlt: 'Full leg wax treatment', category: 'Body' },
  { slug: 'half-legs', name: 'Half legs', priceLabel: '$65', price: 65, durationLabel: '35 min', durationMin: 35, description: 'Choose upper or lower leg.', image: '/treatments/half_legs.jpg', imageAlt: 'Half leg wax treatment', category: 'Body' },
  { slug: 'inner-thighs', name: 'Inner thighs', priceLabel: '$15', price: 15, durationLabel: '15 min', durationMin: 15, description: 'Targeted inner-thigh smoothing with gentle technique.', image: '/treatments/half_legs.jpg', imageAlt: 'Inner thigh wax treatment', category: 'Body' },
  { slug: 'stomach-strip', name: 'Stomach strip', priceLabel: '$10', price: 10, durationLabel: '10 min', durationMin: 10, description: 'Quick stomach-strip cleanup, perfect add-on.', image: '/treatments/stomach.jpg', imageAlt: 'Stomach strip wax treatment', category: 'Body' },
  { slug: 'full-stomach', name: 'Full stomach', priceLabel: '$30', price: 30, durationLabel: '30 min', durationMin: 30, description: 'Complete stomach smoothing with calm aftercare.', image: '/treatments/stomach.jpg', imageAlt: 'Full stomach wax treatment', category: 'Body' },
  { slug: 'combo-brows-lip-chin', name: 'Eyebrows, upper lip & chin', priceLabel: '$41', price: 41, durationLabel: '35 min', durationMin: 35, description: 'Face-frame trio — brows, lip and chin in one visit.', image: '/treatments/eyebrows.jpg', imageAlt: 'Eyebrows upper lip and chin combo', category: 'Combos & Add-ons' },
  { slug: 'combo-lip-chin-nose', name: 'Upper lip, chin & nose', priceLabel: '$36', price: 36, durationLabel: '30 min', durationMin: 30, description: 'Detail combo for a fully polished finish.', image: '/treatments/chin.jpg', imageAlt: 'Upper lip chin and nose combo', category: 'Combos & Add-ons' },
  { slug: 'combo-lips', name: 'Upper lip & lower lip', priceLabel: '$20', price: 20, durationLabel: '25 min', durationMin: 25, description: 'Complete lip-area smoothing in one sitting.', image: '/treatments/lip.jpg', imageAlt: 'Upper and lower lip combo', category: 'Combos & Add-ons' },
  { slug: 'combo-brazilian-butt', name: 'Brazilian & full butt (Female Anatomy)', priceLabel: '$90', price: 90, durationLabel: '40 min', durationMin: 40, description: 'Signature Brazilian paired with full butt for total confidence.', image: '/treatments/full_butt.jpg', imageAlt: 'Brazilian and full butt combo', category: 'Combos & Add-ons' },
  { slug: 'combo-brazilian-stomach', name: 'Brazilian & stomach strip (Female)', priceLabel: '$70', price: 70, durationLabel: '30 min', durationMin: 30, description: 'Brazilian plus stomach-strip detail.', image: '/treatments/stomach.jpg', imageAlt: 'Brazilian and stomach strip combo', category: 'Combos & Add-ons' },
  { slug: 'combo-brazilian-thigh', name: 'Brazilian & inner thigh (Female)', priceLabel: '$80', price: 80, durationLabel: '35 min', durationMin: 35, description: 'Brazilian paired with inner-thigh smoothing.', image: '/treatments/half_legs.jpg', imageAlt: 'Brazilian and inner thigh combo', category: 'Combos & Add-ons' },
  { slug: 'korean-lash-lift', name: 'Korean Lash Lift', priceLabel: '$60', price: 60, regularPriceLabel: '$80', badge: 'Limited Time', durationLabel: '60 min', durationMin: 60, description: 'Enhance your natural lashes with a customized lift designed to create a beautiful curl. Lifted. Defined. Effortlessly beautiful — opens & brightens the eyes with no extensions needed.', image: '/treatments/face.jpg', imageAlt: 'Korean lash lift in El Paso, TX — lifted natural lashes', category: 'Lash', addOnLabel: '+$10 with tint' },
  { slug: 'korean-lash-lift-tint', name: 'Korean Lash Lift + Tint', priceLabel: '$70', price: 70, regularPriceLabel: '$90', badge: 'Limited Time', durationLabel: '75 min', durationMin: 75, description: 'Korean lash lift paired with a lash tint for extra definition — wake up ready, no mascara needed. Low-maintenance beauty.', image: '/treatments/face.jpg', imageAlt: 'Korean lash lift with tint in El Paso, TX', category: 'Lash', addOnLabel: 'Includes tint' },
];