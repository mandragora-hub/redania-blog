import { TocHeading, TreeTocHeading } from 'types'
import React from 'react'
import useReadingProgress from '@/hooks/useReadingProgress'
import useScrollSpy from '@/hooks/useScrollSpy'
import TocToTree from '@/lib/utils/TocToTree'

// Hide progress bar when progress pages is lower that lower bound
const LOWER_BOUND = 5

const PagescrollProgress = () => {
  const progress = useReadingProgress()
  const [hide, setHide] = React.useState(false)

  React.useEffect(() => {
    if (progress >= LOWER_BOUND) {
      setHide(false)
    } else {
      setHide(true)
    }
  }, [progress])

  return (
    <div
      className="pagescroll-progress-wrapper bg-gray-300 dark:bg-gray-500"
      style={{ opacity: hide ? '0' : '0.5' }}
    >
      <div
        className="pageScroll-progress-track bg-gray-500 dark:bg-gray-300"
        style={{ height: `${progress}%` }}
      ></div>
    </div>
  )
}

type TocLinkProps = {
  tocElement: TreeTocHeading
  currentSection?: string | null | undefined
  maxDepth: number
}

const TocLink = ({ tocElement, currentSection, maxDepth }: TocLinkProps) => {
  const { value, url, depth, children } = tocElement

  const [active, setActive] = React.useState<boolean>(false)

  React.useEffect(() => {
    setActive(
      currentSection === url.replace('#', '') ||
        children.find((child) => currentSection == child.url.replace('#', '')) !== undefined
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection])

  return (
    <div className="transition-all duration-500 ease-in-out">
      <a className={active ? 'current-active-section' : ''} href={url}>
        <p className="relative pl-2" data-before="❯">
          {value}
        </p>
      </a>
      {depth < maxDepth && (
        <div className="mt-1 ml-4 space-y-1">
          {children.map((node) => (
            <TocLink
              key={node.value}
              currentSection={currentSection}
              tocElement={node}
              maxDepth={maxDepth}
            />
          ))}
        </div>
      )}
    </div>
  )
}

type TableOfContentsProps = {
  toc: TocHeading[]
  maxDepth?: number
}

const TableOfContents = ({ toc, maxDepth = 2 }: TableOfContentsProps) => {
  const currentSection = useScrollSpy()

  return (
    <div className="mb-4 px-2 pl-10 text-sm tracking-tight text-gray-500 dark:text-gray-500">
      <p className="mb-4 text-xl font-bold">On this pages</p>
      <div className="mt-1 transform space-y-1 transition duration-500 ease-in-out">
        <PagescrollProgress />
        {TocToTree(toc).map((node) => (
          <TocLink
            key={node.value}
            maxDepth={maxDepth}
            currentSection={currentSection}
            tocElement={node}
          />
        ))}
      </div>
    </div>
  )
}

export default TableOfContents
