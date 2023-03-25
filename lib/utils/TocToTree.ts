import { TocHeading, TreeTocHeading } from 'types'

type MatchingCallbackType = (element: TreeTocHeading) => boolean

function searchNode(
  element: TreeTocHeading,
  matchingCallback: MatchingCallbackType
): TreeTocHeading | null {
  if (matchingCallback(element)) {
    return element
  } else if (element.children != null) {
    var i
    var result = null
    for (i = 0; result == null && i < element.children.length; i++) {
      result = searchNode(element.children[i], matchingCallback)
    }
    return result
  }
  return null
}

function searchTree(tree: TreeTocHeading[], matchingCallback: MatchingCallbackType) {
  for (const node of tree) {
    const parentTocElement = searchNode(node, matchingCallback)
    if (parentTocElement) return parentTocElement
  }
  return null
}

function processElement(
  tree: TreeTocHeading[],
  newTocElement: TreeTocHeading,
  relativeIndexTocElement: number | null
): number {
  const parent = searchTree(tree, (element) => element.index === relativeIndexTocElement)
  if (!parent) {
    tree.push(newTocElement)
    return newTocElement.index
  }

  if (newTocElement.depth > parent.depth) {
    newTocElement.parent = parent.index
    parent.children = [...parent.children, newTocElement]
    return newTocElement.index
  }

  return processElement(tree, newTocElement, parent.parent)
}

const TocToTree = (toc: TocHeading[]): TreeTocHeading[] => {
  let tree = new Array<TreeTocHeading>()
  let relativeIndexTocElement: number | null = null

  const superToc = toc.map((item, i) => {
    return { parent: null, index: i, children: [], ...item }
  })

  for (const tocElement of superToc) {
    if (!tocElement) return tree // remove undefined

    relativeIndexTocElement = processElement(tree, tocElement, relativeIndexTocElement)
  }

  return tree
}

export default TocToTree
