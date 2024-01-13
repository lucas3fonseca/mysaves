import cloudinary from './cloudinary'

export const cloudinaryDestroy = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId)
}