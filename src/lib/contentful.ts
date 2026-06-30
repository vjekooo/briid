import * as contentful from 'contentful'
import type { Asset, Entry, EntryFieldTypes } from 'contentful'
import type { Document } from '@contentful/rich-text-types'

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: 'cdn.contentful.com',
})

export interface ArticleFields {
  slug: EntryFieldTypes.Text
  title: EntryFieldTypes.Text
  date: EntryFieldTypes.Date
  description?: EntryFieldTypes.Text
  image?: Asset
  author?: EntryFieldTypes.Text
  readingTime?: EntryFieldTypes.Text
  page?: Entry<PageSkeleton>
  views?: EntryFieldTypes.Integer
  text?: {
    nodeType: 'document'
    data: Record<string, never>
    content: unknown[]
  }
}

export interface ArticleSkeleton {
  contentTypeId: 'article'
  fields: ArticleFields
}

export interface Article {
  slug: string
  title: string
  date: string
  description?: string
  image?: Asset
  author?: string
  readingTime?: string
  page?: Entry<PageSkeleton>
  views?: number
  text?: Document
}

export interface PageFields {
  slug: EntryFieldTypes.Text
  title: EntryFieldTypes.Text
  position: EntryFieldTypes.Integer
  articles?: Array<Entry<ArticleSkeleton>>
}

export interface PageSkeleton {
  contentTypeId: 'page'
  fields: PageFields
}

export type Page = Entry<PageSkeleton>
