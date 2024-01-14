import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import type { NextSeoProps } from 'next-seo'
import { ParsedUrlQuery } from 'querystring'

import { DEFAULT_OPENGRAPH_IMAGE } from '@constants/openGraphImages'
import { HomeLayout } from '@/src/home/components/HomeLayout'

interface HomePageProps {
  nextSeoProps: NextSeoProps
}

export default function HomePage({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <></>
  )
}

export const getServerSideProps: GetServerSideProps<HomePageProps, ParsedUrlQuery> = async ({ req }) => {
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

