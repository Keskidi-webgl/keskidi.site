/**
 * Model type for Media
 */
export type Media = {
  id: number
  description: string
  path: string
  size: string
  title: string
  uploaded_time: string
  url: string
}

/**
 * Data type for upload file media form
 */
export type DataFormUpload = {
  file: File|null
  title: string
  description: string
}
