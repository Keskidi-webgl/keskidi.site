import {MEDIA_TYPE} from "~/core/enums";

/**
 * Model type for Media model
 */
export type Media = {
  id: number
  description: string
  path: string
  size: string
  title: string
  uploaded_time: string
  url: string
  type: MEDIA_TYPE
}

/**
 * Model type for Word model
 */
export type Word = {
  id?: number
  name?: string
  slug?: string
  definition?: WordDefinition
}

/**
 * Model type for Word model
 */
export type WordDefinition = {
  id?: number
  gender?: string
  definition?: string
  origin?: string
  phonetic?: string
  medias?: Array<Media>
}

/**
 * Data type for upload file media form
 */
export type DataFormUpload = {
  file: File|null
  title: string
  description: string
  type: string
}

/**
 * Data type for word create form
 */
export type DataFormCreateWord = {
  name: string
}
