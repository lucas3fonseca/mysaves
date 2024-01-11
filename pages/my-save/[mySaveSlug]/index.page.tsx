import { ParsedUrlQuery } from 'querystring'
import { GetServerSideProps } from 'next'
import type { NextSeoProps } from 'next-seo'
import axios from 'axios'

import { settings } from '@/pages/global/settings'
import { MySave } from '@/pages/global/interfaces'

interface MySavePageQuery extends ParsedUrlQuery {
  mySaveSlug: string
}

interface MySavePageProps {
  nextSeoProps: NextSeoProps
  mySave: MySave
}

export default function MySavePage({ mySave }: MySavePageProps) {
  return (
    <div>
      <div>{JSON.stringify(mySave)}</div>
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
  
  const res = await axios.get(`${settings.API_BASE_URL}/my-save/${mySaveSlug}`)

  if (res.status !== 200) {
    return { notFound: true }
  }

  const mySave: MySave = res.data

  const nextSeoProps: NextSeoProps = {
    title: `MySaves ${mySave.title}`,
    description: `${mySave.description}`,
    openGraph: {
      title: `MySaves ${mySave.title}`,
      description: `${mySave.description}`,
      images: [
        {
          url: `${mySave.metadata.snippet.thumbnails.standard}`,
          alt: `${mySave.metadata.snippet.title}`,
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
      mySave,
    },
  }
}
