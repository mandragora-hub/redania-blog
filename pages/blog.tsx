import { GetStaticProps } from 'next'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import { FrontMatter } from 'types'

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getAllFilesFrontMatter('blog')) as FrontMatter[]

  return { props: { posts } }
}

type BlogPageProps = {
  posts: FrontMatter[]
}

export default function Blog({ posts }: BlogPageProps) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout posts={posts} title="All Posts" />
    </>
  )
}
