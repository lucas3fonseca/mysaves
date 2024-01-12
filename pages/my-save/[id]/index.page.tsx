import { ParsedUrlQuery } from 'querystring'
import { GetServerSideProps } from 'next'
import type { NextSeoProps } from 'next-seo'
import axios from 'axios'

import { settings } from '@/pages/global/settings'
import type { MySave } from '@/pages/global/interfaces'
import { MySaveLayout } from '@/src/mySave/components/MySaveLayout'

interface MySavePageQuery extends ParsedUrlQuery {
  id: string
}

interface MySavePageProps {
  nextSeoProps: NextSeoProps
  mySave: MySave
}

export default function MySavePage({ mySave }: MySavePageProps) {
  return (
    <MySaveLayout mySave={mySave} />
  )
}

export const getServerSideProps: GetServerSideProps<
  MySavePageProps,
  MySavePageQuery
> = async ({ params }) => {
  const { id } = params ?? {}

  if (!id) {
    return { notFound: true }
  }

  const res = await axios.get(`${settings.API_BASE_URL}/my-save/${id}`)

  if (res.status !== 200) {
    return { notFound: true }
  }

  const mySave: MySave = res.data

  const nextSeoProps: NextSeoProps = {
    title: `MySaves | ${mySave.title}`,
    description: `${mySave.description}`,
    openGraph: {
      title: `MySaves | ${mySave.title}`,
      description: `${mySave.description}`,
      images: [
        {
          url: `${mySave.cloudinaryThumbnail.secureUrl}`,
          alt: `${mySave.cloudinaryThumbnail.secureUrl}`,
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
      mySaveSlug: id,
      nextSeoProps,
      mySave,
    },
  }
}
