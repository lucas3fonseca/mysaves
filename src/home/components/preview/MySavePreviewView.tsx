import Image from 'next/image'
import Link from 'next/link'

import type { MySave } from '@/pages/global/interfaces'

interface MySavePreviewViewProps {
  mySaves: MySave[]
}

export const MySavePreviewView = ({ mySaves }: MySavePreviewViewProps) => {
  return (
    <>
      {
        mySaves.map(({ cloudinaryThumbnail: { publicId, format, blurDataUrl }, id }) => {
          return (
            <div key={publicId}
              className='border rounded-xl mt-5
              hover:border-mysave-pink
            '>
              <Link
                key={publicId}
                href={`/my-save/${id}`}
                shallow
              >
                <Image
                  alt='thumbnail'
                  className='border-transparent rounded-xl w-full'
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
            </div>
          )
        })
      }
    </>
  )
}