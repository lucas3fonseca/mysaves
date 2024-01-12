import Image from 'next/image'
import Link from 'next/link'

import type { CloudinaryImage } from '@/pages/global/interfaces'

interface MySavePreviewViewProps {
  images: {
    id: string
    image: CloudinaryImage
  }[]
}

export const MySavePreviewView = ({ images }: MySavePreviewViewProps) => {
  return (
    <>
      {
        images.map(({ image: { publicId, format, blurDataUrl }, id }) => {
          return (
            <Link
              key={publicId}
              href={`/my-save/${id}`}
              shallow
            >
              <Image
                alt='thumbnail'
                className='
               transform rounded-lg brightness-90 transition
               will-change-auto group-hover:brightness-110'
                style={{ transform: 'translate3d(0, 0, 0)' }}
                placeholder='blur'
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${publicId}.${format}`}
                width={720}
                height={480}
                sizes='(max-width: 640px) 100vw,
              (max-width: 1280px) 50vw,
              (max-width: 1536px) 33vw,
              25vw'
              />
            </Link>
          )
        })
      }
    </>
  )
}