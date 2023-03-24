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

export type FrontMatter = {
  title: string
  date: string
  tags: string[]
  draft: boolean
  summary: string
  [key: string]: string | string[] | boolean | ReadTimeResults
}

export type PostType = {
  mdxSource: string
  toc: TocHeading[]
  frontMatter: FrontMatter
}

export interface PostFrontMatter extends FrontMatter {
  images: string[]
  imageCaption: string
  authors: string[]

  slug: string
  fileName: string
  readingTime: ReadTimeResults
}

export type AuthorFrontMatter = {
  name: string
  avatar: string
  occupation: string
  company: string
  email: string
  twitter: string
  linkedin: string
  github: string
}
