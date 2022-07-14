export type PaginationType = {
  totalPages: number
  currentPage: number
}

export type PostType = {
  mdxSource: string
  toc: any
  frontMatter: FrontMatterType
}

export type AuthorDetailsTypes = {
  '@type': string
  name: string
  avatar?: string
  twitter?: string
}

export type FrontMatterType = {
  slug: string
  fileName?: string
  date?: string
  title?: string
  images?: string[]
  tags?: string[]
  summary?: string
  readingTime?: string
  layout?: string
  authors?: string[]
  draft?: boolean
}

export type AuthorFrontMatterTypes = {
  name: string
  avatar: string
  occupation: string
  company: string
  email: string
  twitter: string
  linkedin: string
  github: string
}
