import Image from './Image'
import Link from './Link'
import formatDate from '@/lib/utils/formatDate'

type Props = {
  title: string
  date: string
  description: string
  imgSrc: string
  href: string
}

const Card = ({ title, description, imgSrc, href, date }: Props) => (
  <div className="bg-day dark:bg-night group w-full bg-opacity-50 dark:bg-opacity-50">
    <Link
      className="c-card block transform overflow-hidden rounded-lg bg-transparent transition duration-500 group-hover:scale-105"
      href={href}
      aria-label={`Link to ${title}`}
    >
      <div className="relative max-h-4 overflow-hidden rounded-lg pb-60">
        <Image
          className="absolute inset-0 h-full w-full transform object-cover opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-100 dark:opacity-70"
          alt={title}
          src={imgSrc}
          layout="fill" // required
          objectFit="cover" // change to suit your needs
        />
      </div>

      <div className="space-y-2 py-4">
        <div className="inline-flex w-full items-center justify-between">
          <span className="inline-block rounded border border-gray-700 py-1.5 px-2.5 text-xs font-medium hover:bg-gray-100">
            Tags
          </span>
          <time className="text-base font-semibold" dateTime={date}>
            {formatDate(date)}
          </time>
        </div>

        <h2 className="mb-3 text-2xl font-bold leading-8">{title}</h2>
        <p className="text-sm tracking-wider text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </Link>
  </div>
)

export default Card
