import { visit, Node, Parent } from 'unist-util-visit'
import sizeOf from 'image-size'
import fs from 'fs'
import { Literal } from 'unist'

type ImageNode = Parent & {
  url: string
  alt: string
  name: string
  attributes: (Literal & { name: string })[]
}

// type customNode = Parent & {
//   name: string
//   attributes: (Literal & { name: string })[]
// }

function imageToFigure(imageNode: ImageNode) {
  ;(imageNode.type = 'mdxJsxFlowElement'),
    (imageNode.name = 'img'),
    (imageNode.attributes = [
      {
        type: 'mdxJsxAttribute',
        name: 'className',
        value: 'object-cover md:max-w-3/4 rounded-lg shadow-lg overflow-hidden mx-auto',
      },
      { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
      { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
    ])

  const figureCaptionNode = {
    type: 'mdxJsxFlowElement',
    name: 'figcaption',
    attributes: [
      { type: 'mdxJsxAttribute', name: 'className', value: 'text-gray-500 dark:text-gray-400' },
    ],
    children: [
      {
        type: 'text',
        value: imageNode.alt || '',
      },
    ],
  }

  const figureNode = {
    type: 'mdxJsxFlowElement',
    name: 'figure',
    attributes: [
      { type: 'mdxJsxAttribute', name: 'className', value: 'relative flex flex-col items-center' },
    ],
    children: [imageNode, figureCaptionNode],
  }

  return figureNode
}

function imageToNextImage(imageNode: ImageNode) {
  // only local files
  const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`)

  // Convert original node to next/image
  ;(imageNode.type = 'mdxJsxFlowElement'),
    (imageNode.name = 'Image'),
    (imageNode.attributes = [
      { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
      { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
      { type: 'mdxJsxAttribute', name: 'width', value: dimensions.width },
      { type: 'mdxJsxAttribute', name: 'height', value: dimensions.height },
    ])
}

export default function remarkImgToJsx() {
  return (tree: Node) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      (node: any) =>
        node.type === 'paragraph' && node.children.some((n: Node) => n.type === 'image'),
      (node: any) => {
        const imageNode = node.children.find((n: Node) => n.type === 'image') as ImageNode

        // Change node type from p to div to avoid nesting error
        node.type = 'mdxJsxFlowElement'
        node.name = 'div'
        node.attributes = [
          { type: 'mdxJsxAttribute', name: 'className', value: 'flex flex-col items-center' },
        ]

        if (!fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          node.children = [imageToFigure(imageNode)]
        } else {
          node.children = [imageToNextImage(imageNode)]
        }
      }
    )
  }
}
