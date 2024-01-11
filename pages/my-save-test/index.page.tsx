import { GetServerSideProps } from 'next'
import type { NextSeoProps } from 'next-seo'
import axios from 'axios'

import { DEFAULT_OPENGRAPH_IMAGE } from '@constants/openGraphImages'
import { settings } from '@/pages/global/settings'

interface MySavePageProps {
  nextSeoProps: NextSeoProps
}

export default function MySavePage({ }: MySavePageProps) {
  return (
    <div>
      <div>HELLO TEST</div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  MySavePageProps
> = async ({}) => {

  const res = await axios.get(settings.API_URL)
  const data = res.data
  console.log('### res: ', data)

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
      nextSeoProps,
    },
  }
}
