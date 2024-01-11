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

export interface AppState {
  [id: string]: MySave
}

// Data stored in memory for this project
export const state: AppState = {
  BcpZUSbaiO4: {
    id: 'BcpZUSbaiO4',
    title: 'When they take your spoon...',
    description:
      'Get My 12 Commandments to Start Speaking Any Language in 12 Weeks - http://victortalking.com',
    videoUrl: 'https://www.youtube.com/watch?v=BcpZUSbaiO4',
    deleted: false,
    metadata: {
      id: 'BcpZUSbaiO4',
      snippet: {
        title: 'When they take your spoon...',
        description:
          'Get My 12 Commandments to Start Speaking Any Language in 12 Weeks - http://victortalking.com',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/BcpZUSbaiO4/default.jpg',
            width: 120,
            height: 90,
          },
        },
      },
    },
  },
}
