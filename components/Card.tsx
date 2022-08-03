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
  <div className="md p-2" style={{ maxWidth: '544px' }}>
    <div className={`${imgSrc && 'h-full'}  overflow-hidden rounded-md`}>
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
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

        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
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
