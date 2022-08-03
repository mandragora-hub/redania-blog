import { GetStaticProps } from 'next'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import Card from '@/components/Card'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import NewsletterForm from '@/components/NewsletterForm'
import { FrontMatterType } from '@/common/types'

const MAX_DISPLAY = 6

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }: { posts: FrontMatterType[] }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      {/* Greeting */}
      <div className="space-y-2 pt-6 pb-8 md:space-y-4">
        <h1>Hey, I'm Dhanraj 👋🏾</h1>
        <div className="space-y-2 pt-3 pb-4">
          <p>I write code.</p>
          <p>For the web. And mobile.</p>
          <p>Also sometimes for the toaster.</p>
        </div>
        <p>I'm also on that bird app.</p>
      </div>
      {/* Recent Post */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Recent Post
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 2xl:grid-cols-3">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <article key={slug} className="py-4">
                <Card
                  title={title}
                  date={date}
                  description={summary}
                  imgSrc={'/static/images/time-machine.jpg'}
                  href={'f'}
                />
              </article>
            )
          })}
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
