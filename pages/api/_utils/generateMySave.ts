import axios from 'axios'

import { MySave, MySaveInfo, YoutubeVideoMetadata } from '@/pages/global/interfaces'
import { settings } from '../settings'
import { MySaveError, MySaveErrorType } from './MySaveError'

export const generateMySave = async (id: string, info: MySaveInfo): Promise<MySave> => {
  const youtubeListUrl = `
    ${settings.YOUTUBE_VIDEOS_API_BASE_URL}?part=id,snippet&id=${info.videoId}&key=${settings.GOOGLE_API_KEY}`
  
  const res = await axios.get(youtubeListUrl, {
    headers: {
      Accept: 'application/json'
    }
  })

  if (res.status !== 200) {
    throw new MySaveError(`Unable to fetch YouTube video: ${info.videoId}`, MySaveErrorType.MySaveExternalApiError)
  }

  const youtubeMetadata = res.data.items[0] as YoutubeVideoMetadata
  const mySave: MySave = {
    id,
    ...info,
    deleted: false,
    metadata: {
      id: youtubeMetadata.id,
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