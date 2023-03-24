import { GetStaticProps } from 'next'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { FrontMatter } from '@/common/types'

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getAllFilesFrontMatter('snippets')) as FrontMatter[]
  return { props: { posts } }
}

type SnippetsPageProps = {
  posts: FrontMatter[]
}

export default function Snippets({ posts }: SnippetsPageProps) {
  return (
    <>
      <PageSEO title={`Snippets - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout type="snippets" posts={posts} title="All snippets" />
    </>
  )
}
