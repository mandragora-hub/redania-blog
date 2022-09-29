import { visit } from 'unist-util-visit'
import BananaSlug from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import { Heading } from 'mdast'
import { Parent } from 'unist'
import { TocHeading } from '@/common/types'

type OptionsProps = {
  exportRef: TocHeading[]
}

export default function remarkTocHeadings(options: OptionsProps) {
  return (tree: Parent) =>
    visit(tree, 'heading', (node: Heading) => {
      const textContent = toString(node)
      options.exportRef.push({
        value: textContent,
        url: '#' + BananaSlug.slug(textContent),
        depth: node.depth,
      })
    })
}
