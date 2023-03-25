import { GetStaticPaths, GetStaticProps } from 'next'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import ListLayout from '@/layouts/ListLayout'
import { FrontMatter } from 'types'
import { ParsedUrlQuery } from 'querystring'

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPosts = await getAllFilesFrontMatter('blog')
  const totalPages = Math.ceil(totalPosts.length)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

interface Params extends ParsedUrlQuery {
  page: string
}

type ListLayoutProps = {
  posts: FrontMatter[]
}

export const getStaticProps: GetStaticProps<ListLayoutProps, Params> = async (context) => {
  const posts = await getAllFilesFrontMatter('blog')

  return {
    props: {
      posts,
    },
  }
}

export default function PostPage({ posts }: ListLayoutProps) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout posts={posts} title="All Posts" />
    </>
  )
}
