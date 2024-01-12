export enum HttpRequestMethods {
  POST = 'POST',
  GET = 'GET',
}

export interface YoutubeVideoThumbnail {
  url: string
  width: number
  height: number
}

export interface YoutubeVideoSnippet {
  title: string
  description: string
  thumbnails: {
    standard: YoutubeVideoThumbnail
  }
}

export interface YoutubeVideoMetadata {
  id: string
  snippet: YoutubeVideoSnippet
}

export interface MySaveInfo { // app specific data
  title: string
  description: string
  videoUrl: string
  videoId: string
}

export interface CloudinaryThumbnail {
  publicId: string
  width: number
  height: number
  secureUrl: string
}

export interface MySave extends MySaveInfo {
  id: string
  deleted: boolean // we'll see if this works well
  cloudinaryThumbnail: CloudinaryThumbnail
  metadata: YoutubeVideoMetadata
}

export interface AppState {
  [id: string]: MySave
}