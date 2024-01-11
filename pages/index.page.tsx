import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import type { NextSeoProps } from 'next-seo'

import { DEFAULT_OPENGRAPH_IMAGE } from '@constants/openGraphImages'
import { HomeLayout } from 'src/home/components/HomeLayout'

global.state = {
  qDGN5iyjt4UKSsdvhnkLnP: {
    id: 'qDGN5iyjt4UKSsdvhnkLnP',
    videoId: 'BcpZUSbaiO4',
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
          standard: {
            url: 'https://i.ytimg.com/vi/BcpZUSbaiO4/sddefault.jpg',
            width: 640,
            height: 480,
          },
        },
      },
    },
  },
}

export default function HomePage({ }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <HomeLayout />
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async ({ req }) => {
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
    },
  }
}

