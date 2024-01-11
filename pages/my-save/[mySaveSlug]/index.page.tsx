import { ParsedUrlQuery } from 'querystring'
import { GetServerSideProps } from 'next'
import type { NextSeoProps } from 'next-seo'

import { DEFAULT_OPENGRAPH_IMAGE } from '@constants/openGraphImages'

interface MySavePageQuery extends ParsedUrlQuery {
  mySaveSlug: string
}

interface MySavePageProps {
  nextSeoProps: NextSeoProps
  mySaveSlug: string
}

export default function MySavePage({ mySaveSlug }: MySavePageProps) {
  return (
    <div>
      {mySaveSlug}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
MySavePageProps,
  MySavePageQuery
> = async ({ params }) => {
  const { mySaveSlug } = params ?? {}

  if (!mySaveSlug) {
    return { notFound: true }
  }

  const nextSeoProps: NextSeoProps = {
    title: `MySaves TODO: add title from server props`,
    description: `TODO: add description from server props`,
    openGraph: {
      title: `MySaves TODO: add title from server props`,
      description: `Check on the progress of the Creator League and view event brackets from erena.`,
      images: [
        {
          url: DEFAULT_OPENGRAPH_IMAGE,
          alt: 'MySaves',
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
      mySaveSlug,
      nextSeoProps,
    },
  }
}
