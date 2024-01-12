import axios from 'axios'
import slugify from 'slugify'
import type { UploadApiResponse } from 'cloudinary'

import type {
  CloudinaryImage,
  MySave,
  MySaveInfo,
  YoutubeVideoMetadata,
} from '../../global/interfaces'
import cloudinary from './cloudinary'
import { settings } from '../settings'
import { MySaveError, MySaveErrorType } from './MySaveError'
import { getBase64ImageUrl } from './generateBlurPlaceholder'

export const generateMySave = async (
  id: string,
  info: MySaveInfo,
): Promise<MySave> => {
  const youtubeListUrl = `
    ${settings.youtubeVideosApiBaseUrl}?part=id,snippet&id=${info.videoId}&key=${settings.googleApiKey}`

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

  const uploaderRes: UploadApiResponse = await cloudinary.uploader.upload(
    youtubeThumbnail.url,
    {
      folder: settings.cloudinaryFolder,
      public_id: slug,
    },
  )


  const image: CloudinaryImage = {
    height: uploaderRes.height,
    width: uploaderRes.width,
    publicId: uploaderRes.public_id,
    secureUrl: uploaderRes.secure_url,
    format: uploaderRes.format,
  }

  const blurImage = await getBase64ImageUrl(image)
  image.blurDataUrl = blurImage

  const mySave: MySave = {
    id,
    ...info,
    deleted: false,
    cloudinaryThumbnail: image,
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
