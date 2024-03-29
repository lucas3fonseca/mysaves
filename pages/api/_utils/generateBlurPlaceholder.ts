// taken from cloudinary example
import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'

import type { CloudinaryImage } from '../../global/interfaces'

const cache = new Map<CloudinaryImage, string>()

export const getBase64ImageUrl = async (
  image: CloudinaryImage,
): Promise<string> => {
  let url = cache.get(image)
  if (url) {
    return url
  }
  const response = await fetch(`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.publicId}.${image.format}`)
  const buffer = await response.arrayBuffer()
  const minified = await imagemin.buffer(Buffer.from(buffer), {
    plugins: [imageminJpegtran()],
  })

  url = `data:image/jpeg;base64,${Buffer.from(minified).toString('base64')}`
  cache.set(image, url)
  return url
}
