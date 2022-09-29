import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

import svghast, { SvgIconType } from './utils/svghast'

type AcceptableCallout = {
  [key: string]: {
    cssClass: string
    iconClass: SvgIconType
  }
}

const acceptableCalloutTypes: AcceptableCallout = {
  note: { cssClass: '', iconClass: 'note' },
  tip: { cssClass: 'admonition-tip', iconClass: 'tip' },
  important: { cssClass: 'admonition-important', iconClass: 'important' },
  docs: { cssClass: 'admonition-docs', iconClass: 'docs' },
  warning: { cssClass: 'admonition-warning', iconClass: 'warning' },
  caution: { cssClass: 'admonition-caution', iconClass: 'caution' },
  quote: { cssClass: 'admonition-quote', iconClass: 'quote' },
  comment: { cssClass: 'admonition-comment', iconClass: 'comment' },
  question: { cssClass: 'admonition-question', iconClass: 'question' },
}

export default function remarkAdmonitions() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        if (!Object.keys(acceptableCalloutTypes).includes(node.name)) {
          return
        }

        const boxInfo = acceptableCalloutTypes[node.name as keyof typeof acceptableCalloutTypes]

        // Adding CSS classes according to the type.
        const data = node.data || (node.data = {})
        const tagName = node.type === 'textDirective' ? 'span' : 'div'
        data.hName = tagName
        data.hProperties = h(tagName, { class: `admonition ${boxInfo.cssClass}` }).properties

        // Creating the icon.
        const icon = h('span')
        const iconData = icon.data || (icon.data = {})
        iconData.hName = 'span'
        iconData.hProperties = h('span', {
          class: `admonition-icon`,
        }).properties
        icon.children = [svghast(boxInfo.iconClass)]

        // Creating the icon's column.
        const iconWrapper = h('div')
        const iconWrapperData = iconWrapper.data || (iconWrapper.data = {})
        iconWrapperData.hName = 'div'
        iconWrapperData.hProperties = h('div', { class: 'admonition-heading' }).properties
        iconWrapper.children = [icon]

        // Creating the content's column.
        const contentColWrapper = h('div')
        const contentColWrapperData = contentColWrapper.data || (contentColWrapper.data = {})
        contentColWrapperData.hName = 'div'
        contentColWrapperData.hProperties = h('div', { class: 'admonition-content' }).properties
        contentColWrapper.children = [...node.children] // Adding markdown's content block.

        // Creating the column's wrapper.
        // const columnsWrapper = h('div')
        // const columnsWrapperData = columnsWrapper.data || (columnsWrapper.data = {})
        // columnsWrapperData.hName = 'div'
        // columnsWrapperData.hProperties = h('div', { class: 'columns' }).properties
        // columnsWrapper.children = [iconWrapper, contentColWrapper]

        // Creating the wrapper for the callout's content.
        // const contentWrapper = h('div')
        // const wrapperData = contentWrapper.data || (contentWrapper.data = {})
        // wrapperData.hName = 'div'
        // wrapperData.hProperties = h('div', { class: 'message-body' }).properties
        // contentWrapper.children = [columnsWrapper]
        node.children = [iconWrapper, contentColWrapper]
      }
    })
  }
}
