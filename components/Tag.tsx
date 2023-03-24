import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

type TagProps = {
  text: string
}

const Tag = ({ text }: TagProps) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <span className="inline-block rounded border border-gray-700 py-1 px-2 text-xs font-medium capitalize leading-tight">
        {text.split(' ').join('-')}
      </span>
    </Link>
  )
}

export default Tag
