type HeaderNavLinksType = {
  href: string
  kind: 'Blog' | 'Snippets' | 'Tags'
}

const headerNavLinks: HeaderNavLinksType[] = [
  { href: '/blog', kind: 'Blog' },
  { href: '/snippets', kind: 'Snippets' },
  { href: '/tags', kind: 'Tags' },
]

export default headerNavLinks
