import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="border-t border-gray-400 dark:border-gray-700">
      <div className="my-8 flex flex-col items-center justify-between sm:flex-row">
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <a
            className="icon-link"
            target="_blank"
            rel="noopener noreferrer"
            href={siteMetadata.github}
          >
            Github
          </a>
          <div>{` • `}</div>
          <a
            className="icon-link"
            target="_blank"
            rel="noopener noreferrer"
            href={siteMetadata.linkedin}
          >
            Linkedin
          </a>
          <div>{` • `}</div>
          <a
            className="icon-link"
            target="_blank"
            rel="noopener noreferrer"
            href={siteMetadata.twitter}
          >
            Twitter
          </a>
          <div>{` • `}</div>
          <a
            className="icon-link"
            target="_blank"
            rel="noopener noreferrer"
            href={siteMetadata.youtube}
          >
            RSS Feed
          </a>
        </div>
      </div>
    </footer>
  )
}
