import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import { FrontMatter } from '@/common/types'
import BlogPostCard from '@/components/BlogPostCard'
import SnippetPostCard from '@/components/SnippetPostCard'

type ListLayoutProps = {
  posts: FrontMatter[]
  title: string
  type?: 'blog' | 'snippets'
}

export default function ListLayout({ posts, title, type = 'blog' }: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // display post if no searchValue is specified
  const displayPosts = !searchValue ? posts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-8 py-6 md:grid-cols-2 xl:grid-cols-3">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug } = frontMatter
            return (
              <li key={slug as string}>
                <article className="h-full w-full [&>*]:h-full">
                  {type == 'blog' ? (
                    <BlogPostCard href={`/blog/${slug}`} {...frontMatter} />
                  ) : (
                    <SnippetPostCard href={`/snippets/${slug}`} {...frontMatter} />
                  )}
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
