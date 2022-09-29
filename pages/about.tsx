import { GetStaticProps } from 'next'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { FrontMatterType } from '@/common/types'

const DEFAULT_LAYOUT = 'AuthorLayout'

export const getStaticProps: GetStaticProps = async () => {
  const authorDetails = await getFileBySlug('authors', ['default'])
  return { props: { authorDetails } }
}

type AboutPageProps = {
  authorDetails: {
    mdxSource: string
    toc?: any
    frontMatter: FrontMatterType
  }
}

export default function About({ authorDetails }: AboutPageProps) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
