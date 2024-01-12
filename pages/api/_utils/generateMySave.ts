import axios from 'axios'
import slugify from 'slugify'
import type { UploadApiResponse } from 'cloudinary'

import type {
  MySave,
  MySaveInfo,
  YoutubeVideoMetadata,
} from '@/pages/global/interfaces'
import cloudinary from '@/src/global/utils/cloudinary'
import { settings } from '../settings'
import { MySaveError, MySaveErrorType } from './MySaveError'

export const generateMySave = async (
  id: string,
  info: MySaveInfo,
): Promise<MySave> => {
  const youtubeListUrl = `
    ${settings.YOUTUBE_VIDEOS_API_BASE_URL}?part=id,snippet&id=${info.videoId}&key=${settings.GOOGLE_API_KEY}`

  const res = await axios.get(youtubeListUrl, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (res.status !== 200) {
    throw new MySaveError(
      `Unable to fetch YouTube video: ${info.videoId}`,
      MySaveErrorType.MySaveExternalApiError,
    )
  }

  const youtubeMetadata = res.data.items[0] as YoutubeVideoMetadata
  const youtubeThumbnail = youtubeMetadata.snippet.thumbnails.standard

  const slug = slugify(`${info.title}-${id}`, {
    lower: true,
    strict: true,
  })

  const uploaderRes: UploadApiResponse = await cloudinary.uploader.upload(youtubeThumbnail.url, {
    public_id: slug,
  })

  console.log(uploaderRes)

  const mySave: MySave = {
    id,
    ...info,
    deleted: false,
    cloudinaryThumbnail: {
      height: uploaderRes.height,
      width: uploaderRes.width,
      publicId: uploaderRes.public_id,
      secureUrl: uploaderRes.secure_url,
    },
    metadata: {
      id: youtubeMetadata.id,
      snippet: {
        title: youtubeMetadata.snippet.title,
        description: youtubeMetadata.snippet.title,
        thumbnails: {
          standard: youtubeThumbnail,
        },
      },
    },
  }

  return mySave
}
