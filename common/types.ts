export type PaginationType = {
  totalPages: number
  currentPage: number
}

export type PostType = {
  mdxSource: string
  toc: any
  frontMatter: ExtendFrontMatterType
}

export type AuthorDetailsTypes = {
  '@type': string
  name: string
  avatar?: string
  twitter?: string
}

export type BasicFrontMatterType = {
  title: string
  date: string
  tags: string[]
  summary: string
  authors?: string[]
  images?: string[]
  draft: boolean
}

export interface ExtendFrontMatterType extends BasicFrontMatterType {
  slug: string
  fileName?: string
  date: string
  title: string
  images?: string[]
  tags: string[]
  summary: string
  readingTime?: string
  layout?: string
  authors?: string[]
  bibliography?: string
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
