import { ParsedUrlQuery } from 'querystring'
import { GetServerSideProps } from 'next'
import type { NextSeoProps } from 'next-seo'
import axios from 'axios'
import { useContext } from 'react'

import { settings } from '@/pages/global/settings'
import type { MySave } from '@/pages/global/interfaces'
import { MySaveLayout } from '@/src/mySave/components/MySaveLayout'
import { GlobalContext } from '@/src/global/contexts/GlobalContext'

interface MySavePageQuery extends ParsedUrlQuery {
  id: string
}

interface MySavePageProps {
  nextSeoProps: NextSeoProps
  mySaveId: string
}

export default function MySavePage({ mySaveId }: MySavePageProps) {
  return (
    <MySaveLayout mySaveId={mySaveId} />
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

  const res = await axios.get(`${settings.apiBaseUrl}/my-save/${id}`)

  if (res.status !== 200) {
    return { notFound: true }
  }

  const mySave: MySave = res.data
  console.log('mysave: ', mySave)

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
      mySaveId: id,
      nextSeoProps,
    },
  }
}
