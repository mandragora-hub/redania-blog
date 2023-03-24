import Link from './Link'
import formatDate from '@/lib/utils/formatDate'
import { FrontMatter } from '@/common/types'
import Tag from './Tag'

type Props = {
  href: string
} & FrontMatter

const SnippetPostCard = ({ title, summary, href, date, tags }: Props) => (
  <div className="hover:border-snippet-card-animation w-full rounded-lg border bg-slate-50 p-4 transition duration-150 hover:scale-105 dark:bg-night dark:bg-opacity-50">
    <Link className="block transform overflow-hidden" href={href} aria-label={`Link to ${title}`}>
      <div className="py-4">
        <h2 className="mb-3 text-2xl font-bold leading-8">{title}</h2>
        <div className="flex items-center justify-between gap-2">
          <Tag text={tags[0]} />
          <time className="text-base font-semibold" dateTime={date}>
            {formatDate(date)}
          </time>
        </div>

        <p className="text-sm tracking-wider text-gray-600 dark:text-gray-300">{summary}</p>
      </div>
    </Link>
  </div>
)

export default SnippetPostCard
