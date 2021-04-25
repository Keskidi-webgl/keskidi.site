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

export type DefinitionMedia = {
  id: number
  description: string
  path: string
  size: string
  title: string
  uploaded_time: string
  url: string
  type: MEDIA_TYPE

  caption: string
  source: string
  order: number
}

/**
 * Model type for Word model
 */
export type Word = {
  id?: number
  name?: string
  slug?: string
  definition: WordDefinition | null
  home_scenario?: WordHomeScenario | null
  expressions: Array<WordExpression>
  activity_data: WordActivityData | null
}

export type UserWordData = {
  id: number
  is_achieved: boolean
  name: string,
  slug: string
}

export type WordDefinition = {
  id?: number
  gender?: string
  definition?: string
  origin?: string
  phonetic?: string
  medias?: Array<DefinitionMedia>
}

export type WordHomeScenario = {
  id?: number
  content?: string
}

export type WordExpression = {
  id?: number
  content?: string
  audio?: Media
}

export type WordActivityData = {
  id?: number
  object_one?: string
  object_two?: string
  object_three?: string
  object_one_description?: string
  object_two_description?: string
  object_three_description?: string
  good_object?: string
}

/**
 * Data type for upload file media form
 */
export type DataFormUpload = {
  file: File | null
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
