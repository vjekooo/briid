import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import type { Options } from '@contentful/rich-text-html-renderer'

export const createRenderOptions = (): Options => ({
  renderMark: {
    [MARKS.BOLD]: (text) => `<b class="font-bold">${text}</b>`,
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node, next) => {
      const uri = node.data.uri
      return `<a href="${uri}" class="text-blue-600 underline hover:text-blue-800">${next(node.content)}</a>`
    },
    [BLOCKS.HEADING_1]: (node, next) => {
      return `<h1 class="h1 mb-6 uppercase">${next(node.content)}</h1>`
    },
    [BLOCKS.PARAGRAPH]: (node, next) => {
      return `<p class="text-md mb-4 leading-relaxed">${next(node.content)}</p>`
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const file = node.data.target?.fields?.file
      const title = node.data.target?.fields?.title || 'Embedded image'

      if (!file?.url) {
        return `<div class="my-4 rounded-lg border border-gray-200 p-4"><p class="text-gray-500">Image not found</p></div>`
      }

      const imageUrl = file.url.startsWith('//')
        ? `https:${file.url}`
        : file.url

      return `<figure class="my-8"><img src="${imageUrl}" alt="${title}" class="h-auto w-full max-w-full shadow-md" loading="lazy" /></figure>`
    },
  },
})
