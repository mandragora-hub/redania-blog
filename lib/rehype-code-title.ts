// @ts-nocheck

import { visit } from 'unist-util-visit'

export default function rehypeCodeTitles() {
  return (tree: any) =>
    visit(
      tree,
      (node, _index, parent) => node.tagName === 'code' && parent.tagName === 'pre',
      (node, _index, parent) => {
        const meta = node?.data?.meta
        if (!meta) return

        const codeMeta = meta.split(/(\s+)/).filter((e: string) => e.trim().length > 0)
        let map = new Map<string, string>()

        codeMeta.forEach((e: string) => {
          if (!e.includes('=')) return

          const s = e.split('=')
          map.set(s[0], s[1] ? s[1].replace(/['"]+/g, '') : '')
        })

        parent.properties = { ...Object.fromEntries(map) }
      }
    )
}
