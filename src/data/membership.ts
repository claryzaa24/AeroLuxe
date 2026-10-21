import type { MembershipTier } from '@/types'

export const membershipTiers: MembershipTier[] = [
  {
    name: 'Silver',
    price: '$49',
    period: '/tahun',
    benefits: [
      'Akses lounge domestik',
      'Priority check-in',
      'Bonus 10% poin setiap penerbangan',
      'Bagasi tambahan 10kg',
      'Notifikasi harga terendah',
      'Customer support prioritas',
    ],
    highlighted: false,
    accentColor: '#C0C0C0',
  },
  {
    name: 'Gold',
    price: '$149',
    period: '/tahun',
    benefits: [
      'Akses lounge global 500+',
      'Priority boarding & check-in',
      'Bonus 25% poin setiap penerbangan',
      'Bagasi tambahan 20kg',
      'Upgrade gratis (subject to availability)',
      'Concierge 24/7 dedicated',
      'Akses Wi-Fi premium gratis',
      'Seat selection prioritas',
    ],
    highlighted: true,
    badge: 'Paling Populer',
    accentColor: '#D4AF37',
  },
  {
    name: 'Platinum',
    price: '$399',
    period: '/tahun',
    benefits: [
      'Semua benefit Gold',
      'Guaranteed upgrade ke Business Class',
      'Bonus 50% poin setiap penerbangan',
      'Bagasi unlimited',
      'Private terminal access',
      'Personal travel assistant',
      'Companion lounge pass',
      'Eksklusif event invitation',
    ],
    highlighted: false,
    accentColor: '#E5E4E2',
  },
]
