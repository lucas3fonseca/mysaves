import React from 'react'

export interface YoutubeVideoThumbnail {
  url: string
  width: number
  height: number
}

export interface YoutubeVideoSnippet {
  title: string
  description: string
  thumbnails: {
    default: YoutubeVideoThumbnail
    medium?: YoutubeVideoThumbnail
    high?: YoutubeVideoThumbnail
    standard?: YoutubeVideoThumbnail
    maxres?: YoutubeVideoThumbnail
  }
}

export interface YoutubeVideoMetadata {
  id: string
  snippet: YoutubeVideoSnippet
}

export interface MySave {
  id: string
  title: string
  description: string
  videoUrl: string
  deleted: boolean // we'll see if this works well
  metadata: YoutubeVideoMetadata
}

export interface GlobalContextState {
  [id: string]: MySave
}

export const GlobalContext = React.createContext<GlobalContextState>({})
