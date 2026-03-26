import * as contentful from "contentful";
import type { Entry, EntryFieldTypes } from "contentful"

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

// Asset type for images
export interface AssetFields {
  title: EntryFieldTypes.Text
  description?: EntryFieldTypes.Text
  file: {
    url: string
    fileName: string
    contentType: string
    size: number
  }
}

// Author type
export interface AuthorFields {
  firstName: EntryFieldTypes.Text
  lastName: EntryFieldTypes.Text
  avatar: AssetFields
}

export interface AuthorSkeleton {
  contentTypeId: "author"
  fields: AuthorFields
}

// Article type
export interface ArticleFields {
  slug: EntryFieldTypes.Text
  title: EntryFieldTypes.Text
  date: EntryFieldTypes.Date
  description?: EntryFieldTypes.Text
  image?: AssetFields
  author?: AuthorFields
  readingTime?: EntryFieldTypes.Text
  page?: Entry<PageSkeleton>
  views?: EntryFieldTypes.Integer
  text?: {
    raw: string
  }
}

export interface ArticleSkeleton {
  contentTypeId: "article"
  fields: ArticleFields
}

export type Article = Entry<ArticleSkeleton>

// Page type
export interface PageFields {
  slug: EntryFieldTypes.Text
  title: EntryFieldTypes.Text
  position: EntryFieldTypes.Integer
  articles?: Array<Entry<ArticleSkeleton>>
}

export interface PageSkeleton {
  contentTypeId: "page"
  fields: PageFields
}

export type Page = Entry<PageSkeleton>