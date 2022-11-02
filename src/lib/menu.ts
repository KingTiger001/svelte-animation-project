// import { GET_STARTED_HREF } from '$lib/config'

interface Item {
  href: string
  title: string
  external?: boolean
}

export const items: Item[] = [
  { href: '/', title: 'Home' },
  // { href: GET_STARTED_HREF, title: 'Get Started', external: true },
  // { href: '/#howitworks', title: 'How It Works' },
  // { href: '', title: 'Savings Calculator' },
  // { href: '', title: 'About' },
  { href: '/privacy', title: 'Privacy Policy' },
  { href: '/terms', title: 'Terms of Service' },
  // { href: '', title: 'Cookie Policy' }
  { href: '/firefly', title: 'Firefly' },
  { href: '/contact', title: 'Contact' }
]
