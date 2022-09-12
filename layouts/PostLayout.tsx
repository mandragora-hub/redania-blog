import React from 'react'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import TableOfContents from '@/components/TableOfContents'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { TocHeading, AuthorDetailsTypes, FrontMatterType } from '@/common/types'

type PostLayoutProps = {
  frontMatter: FrontMatterType
  toc: TocHeading[]
  authorDetails: AuthorDetailsTypes[]
  next: FrontMatterType
  prev: FrontMatterType
  children: React.ReactNode
}

const editUrl = (fileName: string | undefined) => {
  if (!fileName) return ''
  return `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
}
const discussUrl = (slug: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export default function PostLayout({
  frontMatter,
  toc,
  authorDetails,
  next,
  prev,
  children,
}: PostLayoutProps) {
  const { slug, fileName, date, title, images, tags, readingTime } = frontMatter

  React.useEffect(() => {
    console.log(toc)
  })

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <div className="">
          <header className="flex flex-col items-start space-y-4 border-b border-double border-gray-400 py-4 dark:border-gray-700">
            <div>
              <PageTitle>{title}</PageTitle>
            </div>
            <div className="flex w-full flex-wrap place-content-between items-center gap-4">
              <div className="-mx-2">
                {tags.map((tag) => {
                  return (
                    <Link key={tag} href={`/tags${tag}`}>
                      <span className="hover:border-accent mx-2 inline-block rounded border border-gray-700 py-1 px-2 text-xs font-medium">
                        {tag}
                      </span>
                    </Link>
                  )
                })}
              </div>
              <dl>
                <div className="flex flex-row items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <dt className="sr-only">Published on</dt>
                  <dd>
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                  •<span>{readingTime.text}</span>
                </div>
              </dl>
            </div>
          </header>
          <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
            <div className="relative flex flex-col items-center">
              <img
                className="my-4 mx-auto overflow-hidden rounded-lg object-cover shadow-lg md:w-3/4"
                alt={'fsdf'}
                src="/static/images/time-machine.jpg"
              />
              <span className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                Photo by{' '}
                <a className="text-highlight" href="https://unsplash.com/@markusspiske">
                  Markus Spiske
                </a>{' '}
                on{' '}
                <a className="text-highlight" href="https://unsplash.com/photos/KTuHfak_EEk">
                  Unsplash
                </a>
              </span>
            </div>
            <div className="flex flex-col">
              <div
                className="border-day dark:border-night border-2 bg-day bg-opacity-50 dark:bg-night dark:bg-opacity-75 xl:grid xl:grid-cols-4 xl:gap-x-6"
                style={{ gridTemplateRows: 'auto 1fr' }}
              >
                <div className="prose max-w-none pt-10 pb-8 dark:prose-dark xl:col-span-3 xl:row-span-2">
                  {children}
                </div>
                <div className="hidden xl:block sticky top-4 xl:top-8">
                  <TableOfContents toc={toc} />
                </div>
              </div>
              <div className="border-b border-t border-gray-400 py-4 text-sm dark:border-gray-700">
                <Link href={discussUrl(slug)} rel="nofollow">
                  {'Discuss on Twitter'}
                </Link>
                {` • `}
                <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
              </div>
              <Comments frontMatter={frontMatter} />
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/blog"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
            {/* <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width="38px"
                          height="38px"
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.twitter.replace('https://twitter.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl> */}
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
