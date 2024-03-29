import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { ParsedUrlQuery } from 'querystring'
import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { PostType, FrontMatter, PostFrontMatter } from 'types'

const DEFAULT_LAYOUT = 'PostLayout'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getFiles('blog')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

interface Params extends ParsedUrlQuery {
  slug: string[]
}

type BlogPageProps = {
  post: PostType
  authorFrontMatter: FrontMatter[]
  prev: FrontMatter
  next: FrontMatter
}

export const getStaticProps: GetStaticProps<BlogPageProps, Params> = async (context) => {
  const params = context.params!
  const allPosts = await getAllFilesFrontMatter('blog')
  const postIndex = allPosts.findIndex(
    (post) => formatSlug(post.slug as string) === params.slug.join('/')
  )
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const post = await getFileBySlug('blog', params.slug.join('/'))
  const authorList = (post.frontMatter.authors as string[]) || ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorFrontMatter = await Promise.all(authorPromise)

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts as PostFrontMatter[])
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return { props: { post, authorFrontMatter, prev, next } }
}

export default function Blog({
  post,
  authorFrontMatter,
  prev,
  next,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, toc, frontMatter } = post

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={(frontMatter.layout as string) || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorFrontMatter={authorFrontMatter[0]}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
