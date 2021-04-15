export type Media = {
  id: number
  description: string
  path: string
  size: string
  title: string
  uploaded_time: string
  url: string
}

export type DataFormCreate = {
  file: File|null
  title: string
  description: string
}
