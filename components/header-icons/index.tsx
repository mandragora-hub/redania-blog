import Link from '../Link'
import BlogIcon from './archive.svg'
import SnippetIcon from './code.svg'
import TagIcon from './hashtag.svg'

// Icons taken from: https://heroicons.com/

const components = {
  Blog: BlogIcon,
  Snippets: SnippetIcon,
  Tags: TagIcon,
}

type HeaderIconProps = {
  kind: keyof typeof components
  href: string
  size?: number
}

const HeaderIcon = ({ kind, href, size = 5 }: HeaderIconProps) => {
  const HeaderSvg = components[kind]

  return (
    <Link
      className="hover-underline-animation inline-flex flex-row items-end p-2 font-medium text-gray-900 dark:text-gray-100"
      href={href}
    >
      <HeaderSvg className={`mr-2 h-${size} w-${size}`} />
      {kind}
    </Link>
  )
}

export default HeaderIcon
