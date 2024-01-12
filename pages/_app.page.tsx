import '@/styles/globals.css'
import type { AppProps as NextAppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import type { NextSeoProps } from 'next-seo'
import useAxios from 'axios-hooks'

import { cn } from '@utils/cn'
import { AppContextProvider } from '@/src/global/components/context/AppContextProvider'
import { poppins } from './global/fonts'
import { settings } from './global/settings'
import { AppState } from './global/interfaces'

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
  const [{ data, loading, error }] = useAxios(
    `${settings.API_BASE_URL}/my-saves`
  )

  if (error) {
    return { not_found: true }
  }

  const getLayout =
    Component.getLayout ??
    ((page) => <>{page}</>)

  return (
    <AppContextProvider state={data as AppState}>
      <NextSeo {...pageProps.nextSeoProps} />
      {/* Need to find a better way to get fonts in headlessui/react */}
      <style jsx global>{
        `
          :root {
          --font-inter: ${poppins.style.fontFamily};
          }
      `}
      </style>
      <main
        className={cn(
          'min-h-screen font-sans antialiased',
          poppins.variable,
        )}
      >
        {loading ? <div>loading...</div> : getLayout(<Component {...pageProps} />)}
      </main>
    </AppContextProvider>
  )
}
