/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Details from './Details'
import Pre from './Pre'
import Table from './Table'
import { BlogNewsletterForm } from './NewsletterForm'
import { MDXComponents as MDXComponentsBasicProps } from 'mdx/types'
import { TocHeading, FrontMatter } from '@/common/types'

export type MDXComponentsWrapperProps = {
  layout?: string
  components: any
}

// export interface MDXComponentsProps extends MDXComponentsBasicProps {
//   // a: any
//   // pre: any
// }

export const MDXComponents: MDXComponentsBasicProps = {
  Image,
  TOCInline,
  Details,
  // @ts-ignore
  a: CustomLink,
  pre: Pre,
  table: Table,
  BlogNewsletterForm: BlogNewsletterForm,
  wrapper: ({ components, layout, ...rest }: MDXComponentsWrapperProps) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}

export type MDXLayoutRendererProps = {
  layout: string
  mdxSource: string
  frontMatter: FrontMatter
  toc?: TocHeading[]
  authorFrontMatter?: FrontMatter
  prev?: FrontMatter
  next?: FrontMatter
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: MDXLayoutRendererProps) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
