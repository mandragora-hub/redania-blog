import type { ReadTimeResults } from 'reading-time'

export type TocHeading = {
  value: string
  url: string
  depth: number
}

export type TreeTocHeading = {
  parent: number | null
  index: number
  value: string
  url: string
  depth: number
  children: Array<TreeTocHeading>
}

export type PaginationType = {
  totalPages: number
  currentPage: number
}

export type PostType = {
  mdxSource: string
  toc: TocHeading[]
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
  imageCaption?: string
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
