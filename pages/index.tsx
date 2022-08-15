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
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Greeting */}
        <div className="space-y-2 pt-6 pb-8 md:space-y-4">
          <h1 className="text-4xl font-extrabold">
            Hey, I'm{' '}
            <Link
              className="bg-growing-underline bg-gradient-to-r from-yellow-200 to-yellow-200"
              href="/about"
            >
              Mandragora
            </Link>{' '}
            <span className="wave" role="img">
              👋🏼
            </span>
          </h1>
          <div className="space-y-2 pt-3 pb-4">
            <p>I write code.</p>
            <p>For the web. And mobile.</p>
            <p>Also sometimes for the toaster.</p>
          </div>
          <p>I'm also on that bird app.</p>
        </div>
        {/* Recent Post */}
        <div className="mx-auto">
          <div className="my-4 flex flex-col">
            <span className="text-4xl font-bold leading-9 tracking-tight text-gray-800 dark:text-gray-100">
              Recent Post
            </span>
            <span className="bg-accent mb-4 inline-block h-0.5 w-20 rounded"></span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <article key={slug}>
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
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="my-8 flex justify-end text-2xl font-bold leading-6">
          <Link href="/blog" className="hover-underline-animation p-4" aria-label="all posts">
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
