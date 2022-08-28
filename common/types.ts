import type { ReadTimeResults } from 'reading-time'

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
  images?: string[]
  draft?: boolean
}

export interface ExtendFrontMatterType extends BasicFrontMatterType {
  slug: string
  fileName?: string
  readingTime: ReadTimeResults
  layout?: string
  authors?: string[]
  bibliography?: string
}

export type FrontMatterType = ExtendFrontMatterType

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
