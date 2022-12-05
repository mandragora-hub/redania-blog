import { GetStaticProps } from 'next'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { FrontMatter } from '@/common/types'

const DEFAULT_LAYOUT = 'AboutLayout'

export const getStaticProps: GetStaticProps = async () => {
  const aboutData = await getFileBySlug('authors', ['default'])
  return { props: { aboutData } }
}

type AboutPageProps = {
  aboutData: {
    mdxSource: string
    frontMatter: FrontMatter
  }
}

export default function About({ aboutData }: AboutPageProps) {
  const { mdxSource, frontMatter } = aboutData

  return (
    <MDXLayoutRenderer
      layout={(frontMatter.layout as string) || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
