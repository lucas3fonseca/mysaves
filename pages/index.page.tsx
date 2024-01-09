import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import type { NextSeoProps } from 'next-seo'
import { Inter, Poppins } from 'next/font/google'

import { cn } from '@utils/cn'
import { DEFAULT_OPENGRAPH_IMAGE } from '@constants/openGraphImages'
import { Header } from '@components/layouts/Header'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export default function HomePage({} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('index')
  return (
    <main
      className={cn(
        'min-h-screen font-sans antialiased',
        inter.variable,
        poppins.variable,
      )}
    >
      <Header />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async ({ req }) => {
  const nextSeoProps: NextSeoProps = {
    title: 'Home - MySaves',
    description: `Upload and Share YouTube Videos.`,
    openGraph: {
      title: 'Home - MySaves',
      description: `Upload and Share YouTube Videos.`,
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

