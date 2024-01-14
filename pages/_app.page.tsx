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
import { AppState, MySave } from './global/interfaces'

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps>

type AppPropsWithLayout = NextAppProps<{ nextSeoProps?: NextSeoProps }> & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [{ data, loading, error }] = useAxios(
    `${settings.apiBaseUrl}/my-saves`
  )

  if (error) {
    return { not_found: true }
  }


  if (loading) {
    return <></>
  } else {
    const appState: AppState = data
    const mySaves = appState ? Object.keys(appState).map((key) => appState[key]) : []
    return (
      <AppContextProvider mySaves={mySaves}>
        {pageProps.nextSeoProps ? (
          <NextSeo {...pageProps.nextSeoProps} />
        ) : null}
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
          {<Component {...pageProps} />}
        </main>
      </AppContextProvider>
    )
  }
}
