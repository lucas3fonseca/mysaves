import '@/styles/globals.css'
import type { AppProps as NextAppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import type { NextSeoProps } from 'next-seo'
import NextNProgress from 'nextjs-progressbar'

import { cn } from '@utils/cn'
import { AppContextProvider } from 'src/global/components/context/AppContextProvider'
import { inter, poppins } from './global/fonts'

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
  const getLayout =
    Component.getLayout ??
    ((page) => <>{page}</>)

  return (
    <AppContextProvider>
      <NextNProgress color='#00CC9B' options={{ showSpinner: false }} />
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
        {getLayout(<Component {...pageProps} />)}
      </main>
    </AppContextProvider>
  )
}
