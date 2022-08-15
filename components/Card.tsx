import Image from './Image'
import Link from './Link'
import formatDate from '@/lib/utils/formatDate'

type Props = {
  title: string
  date: string
  description: string
  imgSrc?: string
  href?: string
}

const Card = ({ title, description, imgSrc, href, date }: Props) => (
  <div className="max-w-full">
    <div className={`${imgSrc && 'h-full'}`}>
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <div className="relative max-h-4 overflow-hidden rounded-lg pb-60">
              <Image
                alt={title}
                src={imgSrc}
                layout="fill" // required
                objectFit="cover" // change to suit your needs
              />
            </div>
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="h-56 max-w-full object-cover object-center"
            width={544}
            height={306}
          />
        ))}
      <div className="space-y-2 py-2">
        <div className="flex items-center justify-between">
          <div className="rounded border border-gray-400 py-1.5 px-2.5 font-medium hover:bg-gray-100">
            Tags
          </div>
          <h2 className="text-base font-semibold">
            <time dateTime={date}>{formatDate(date)}</time>
          </h2>
        </div>

        <h2 className="mb-3 text-2xl font-bold leading-8">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  </div>
)

export default Card
