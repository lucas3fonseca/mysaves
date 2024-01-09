import '@/styles/globals.css'
import type { AppProps as NextAppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import type { NextSeoProps } from 'next-seo'
import NextNProgress from 'nextjs-progressbar'

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = NextAppProps<{ nextSeoProps?: NextSeoProps }> & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  console.log('App')
  const getLayout =
    Component.getLayout ??
    ((page) => <>{page}</>)

  return (
    <>
      <NextNProgress color='#00CC9B' options={{ showSpinner: false }} />
      {pageProps.nextSeoProps ? (
        <NextSeo {...pageProps.nextSeoProps} />
      ) : null}
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
