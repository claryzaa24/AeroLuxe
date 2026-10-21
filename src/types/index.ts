export interface NavItem {
  label: string
  href: string
}

export interface Feature {
  icon: string
  title: string
  description: string
  highlighted?: boolean
}

export interface Destination {
  id: number
  name: string
  country: string
  image: string
  images: string[]
  price: number
  currency: string
  category: 'domestik' | 'internasional' | 'populer'
}

export interface Testimonial {
  id: number
  name: string
  avatar: string
  rating: number
  quote: string
  role: string
}

export interface Step {
  number: string
  title: string
  description: string
  icon: string
  details?: {
    subtitle: string
    features: string[]
  }
}

export interface MembershipTier {
  name: string
  price: string
  period: string
  benefits: string[]
  highlighted: boolean
  badge?: string
  accentColor: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
  prefix?: string
}

export interface FloatingCardData {
  type: 'deal' | 'loyalty' | 'rating' | 'award'
  title: string
  subtitle?: string
  value?: string
  icon?: string
}

export interface FooterColumn {
  title: string
  links: { label: string; href: string }[]
}
