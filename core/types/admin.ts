/**
 * Model type for Media
 */
import {MEDIA_TYPE} from "~/core/enums";

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
 * Data type for upload file media form
 */
export type DataFormUpload = {
  file: File|null
  title: string
  description: string
  type: string
}
