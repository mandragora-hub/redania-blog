import { TocHeading } from '@/common/types'
import React from 'react'
import useReadingProgress from '@/hooks/useReadingProgress'
import useScrollSpy from '@/hooks/useScrollSpy'
import _ from 'lodash'

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

// const SubLevel = ({ depth, tocElement }) => {
//   if (!tocElement) return
//   if (tocElement.depth <= depth) return

//   return <div className="mt-1 ml-4 space-y-1"></div>
// }

type TocLinkProps = {
  tocElement: TocHeading
  activeSection?: boolean | null | undefined
}

const TocLink = ({ tocElement, activeSection = false }: TocLinkProps) => {
  const { value, url, depth } = tocElement

  return (
    <div className="transition-all duration-500 ease-in-out">
      <a className={activeSection ? 'current-active-section' : ''} href={url}>
        <p className="relative pl-2" data-before="❯">
          {value}
        </p>
      </a>
      {/* <SubLevel depth={depth} tocElement={array[index + 1]} /> */}
    </div>
  )
}

type TableOfContentsProps = {
  toc: TocHeading[]
  minLevel?: number
}

const TableOfContents = ({ toc, minLevel = 2 }: TableOfContentsProps) => {
  const activeSection = useScrollSpy()

  React.useEffect(() => {
    const tree = []
    let lastTocElement: any = {}
    let lastTocDepth = 0

    for (var i = 0; i <= toc.length; i++) {
      const tocElement = _.head(toc)
      if (!tocElement) return // remove undefined

      if (lastTocDepth <= tocElement.depth) {
        lastTocDepth = tocElement?.depth || 0

        lastTocElement = { children: [], ...tocElement }

        tree.push(lastTocElement)
      } else {
        if (tocElement.depth > lastTocDepth) {
          lastTocDepth = tocElement.depth
          lastTocElement.children.push(tocElement)
        }
      }
    }
    console.log(toc[1])
  }, [toc])

  return (
    <div className="mb-4 px-2 pl-10 text-sm tracking-tight text-gray-500 dark:text-gray-500">
      <p className="mb-4 text-xl font-bold">On this pages</p>
      <div className="mt-1 transform space-y-1 transition duration-500 ease-in-out">
        <PagescrollProgress />
        {toc.map((tocElement, index, array) => (
          <TocLink
            key={tocElement.value}
            activeSection={activeSection === tocElement.value.toLowerCase()}
            tocElement={tocElement}
          />
        ))}
      </div>
    </div>
  )
}

export default TableOfContents
