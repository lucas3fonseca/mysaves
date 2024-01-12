import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import type { NextSeoProps } from 'next-seo'
import { ParsedUrlQuery } from 'querystring'

import { DEFAULT_OPENGRAPH_IMAGE } from '@constants/openGraphImages'
import { HomeLayout } from '@/src/home/components/HomeLayout'
import type { CloudinaryImage } from '@/src/global/interfaces/image'
import cloudinary from '@/src/global/utils/cloudinary'
import { getBase64ImageUrl } from '@/src/global/utils/generateBlurPlaceholder'

// init state -- only for demo purposes
if (!global.state) {
  global.state = {}
}

interface HomePageProps {
  images: CloudinaryImage[]
  nextSeoProps: NextSeoProps
}

export default function HomePage({ images }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(images)
  return (
    <HomeLayout />
  )
}

export const getServerSideProps: GetServerSideProps<HomePageProps, ParsedUrlQuery> = async ({ req }) => {
  const results = await cloudinary.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()
  let reducedResults: CloudinaryImage[] = []

  console.log(`folder: ${process.env.CLOUDINARY_FOLDER}`)

  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const blurImagePromises = results.resources.map((image: CloudinaryImage) => {
    return getBase64ImageUrl(image)
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }

  const nextSeoProps: NextSeoProps = {
    title: 'MySaves - Home',
    description: `Upload and share any YouTube Video.`,
    openGraph: {
      title: 'MySaves - Home',
      description: `Upload and share any YouTube Video.`,
      images: [
        {
          url: DEFAULT_OPENGRAPH_IMAGE,
          alt: 'MySaves logo',
        },
      ],
      site_name: 'MySaves',
    },
    twitter: {
      site: '@mysaves',
      cardType: 'summary_large_image',
    },
  }

  return {
    props: {
      nextSeoProps,
      images: reducedResults,
    },
  }
}

