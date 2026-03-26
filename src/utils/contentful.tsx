import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export const renderRichText = (document: any): string => {
  return documentToHtmlString(document)
}