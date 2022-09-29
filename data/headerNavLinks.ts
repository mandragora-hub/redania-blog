type HeaderNavLinksType = {
  href: string
  kind: 'Blog' | 'Snippet' | 'Tags'
}

const headerNavLinks: HeaderNavLinksType[] = [
  { href: '/blog', kind: 'Blog' },
  { href: '/Snippet', kind: 'Snippet' },
  { href: '/tags', kind: 'Tags' },
]

export default headerNavLinks
