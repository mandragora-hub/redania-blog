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
import { TocHeading, AuthorFrontMatter, PostFrontMatter } from 'types'
import DOMPurify from 'isomorphic-dompurify'
import path from 'path'

type PostLayoutProps = {
  frontMatter: PostFrontMatter
  toc: TocHeading[]
  authorDetails: AuthorFrontMatter[]
  next: PostFrontMatter
  prev: PostFrontMatter
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
  const { slug, fileName, date, title, images, imageCaption, tags, readingTime } = frontMatter

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
              <div className="flex space-x-2">
                {tags.map((tag, index) => (
                  <Tag key={index} text={tag} />
                ))}
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
            {images && (
              <div className="relative flex flex-col items-center">
                <img
                  className="my-4 mx-auto overflow-hidden rounded-lg object-cover shadow-lg md:w-3/4"
                  alt={path.parse(images[0]).name}
                  src={images[0]}
                />
                {imageCaption && (
                  <span
                    className="anchor-highlight text-base font-medium leading-6 text-gray-500 dark:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(imageCaption) }}
                  />
                )}
              </div>
            )}
            <div className="flex flex-col">
              <div
                className="border-2 border-day bg-day bg-opacity-50 dark:border-night dark:bg-night dark:bg-opacity-75 xl:grid xl:grid-cols-4 xl:gap-x-6"
                style={{ gridTemplateRows: 'auto 1fr' }}
              >
                <div
                  className={`prose max-w-none pt-10 pb-8 dark:prose-dark xl:row-span-2 ${
                    toc.length ? 'xl:col-span-3' : 'xl:col-span-4'
                  }`}
                >
                  {children}
                </div>
                {toc.length > 0 && (
                  <div className="sticky top-4 hidden xl:top-8 xl:block">
                    <TableOfContents toc={toc} />
                  </div>
                )}
              </div>
              <div className="border-b border-t border-gray-400 py-4 text-sm dark:border-gray-700">
                <Link href={discussUrl(slug)} rel="nofollow">
                  {'Discuss on Twitter'}
                </Link>
                {` • `}
                <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
              </div>
              <Comments />
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {(next || prev) && (
                  <div className="block space-y-8 py-8 xl:flex xl:justify-between xl:space-y-0 xl:py-4">
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
