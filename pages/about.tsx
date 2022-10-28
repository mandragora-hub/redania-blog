import { GetStaticProps } from 'next'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { FrontMatterType } from '@/common/types'

const DEFAULT_LAYOUT = 'AboutLayout'

export const getStaticProps: GetStaticProps = async () => {
  const aboutData = await getFileBySlug('authors', ['default'])
  return { props: { aboutData } }
}

type AboutPageProps = {
  aboutData: {
    mdxSource: string
    frontMatter: FrontMatterType
  }
}

export default function About({ aboutData }: AboutPageProps) {
  const { mdxSource, frontMatter } = aboutData

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
