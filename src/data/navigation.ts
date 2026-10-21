import type { NavItem, FooterColumn } from '@/types'

export const navItems: NavItem[] = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Destinasi', href: '#destinations' },
  { label: 'Layanan', href: '#features' },
  { label: 'Loyalty', href: '#membership' },
  { label: 'FAQ', href: '#how-it-works' },
]

export const footerColumns: FooterColumn[] = [
  {
    title: 'Perusahaan',
    links: [
      { label: 'Tentang Kami', href: '#' },
      { label: 'Karir', href: '#' },
      { label: 'Newsroom', href: '#' },
      { label: 'Investor Relations', href: '#' },
    ],
  },
  {
    title: 'Layanan',
    links: [
      { label: 'Pesan Tiket', href: '#' },
      { label: 'Check-in Online', href: '#' },
      { label: 'Status Penerbangan', href: '#' },
      { label: 'Bagasi', href: '#' },
    ],
  },
  {
    title: 'Program',
    links: [
      { label: 'AeroLuxe Loyalty', href: '#membership' },
      { label: 'Mitra Maskapai', href: '#' },
      { label: 'Korporat', href: '#' },
      { label: 'Grup & Charter', href: '#' },
    ],
  },
  {
    title: 'Bantuan',
    links: [
      { label: 'Pusat Bantuan', href: '#' },
      { label: 'Hubungi Kami', href: '#' },
      { label: 'Kebijakan Privasi', href: '#' },
      { label: 'Syarat & Ketentuan', href: '#' },
    ],
  },
]
