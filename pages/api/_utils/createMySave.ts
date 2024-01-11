import axios from 'axios'

import { MySave, MySaveInfo, YoutubeVideoMetadata } from '@/pages/global/interfaces'
import { settings } from '../settings'

export const generateMySave = async (id: string, info: MySaveInfo): Promise<MySave> => {
  const youtubeListUrl = `
    ${settings.YOUTUBE_VIDEOS_API_BASE_URL}?part=id,snippet&id=${id}&key=${settings.GOOGLE_API_KEY}`
  
  const res = await axios.get(youtubeListUrl, {
    headers: {
      Accept: 'application/json'
    }
  })

  if (res.status !== 200) {
    throw Error(`Unable to fetch YouTube video: ${id}`)
  }

  const youtubeMetadata = res.data as YoutubeVideoMetadata
  const mySave: MySave = {
    id,
    ...info,
    deleted: false,
    metadata: {
      id,
      snippet: {
        title: youtubeMetadata.snippet.title,
        description: youtubeMetadata.snippet.title,
        thumbnails: {
          standard: youtubeMetadata.snippet.thumbnails.standard
        },
      }
    }
  }

  return mySave
}