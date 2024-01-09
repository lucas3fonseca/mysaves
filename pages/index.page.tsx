import Image from 'next/image'
import { Inter, Poppins } from 'next/font/google'

import { cn } from 'pages/global/utils/_cn'

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

export default function Home() {
  return (
    <main
      className={cn(
        'min-h-screen font-sans antialiased',
        inter.variable,
        poppins.variable,
      )}
    >
      <div>Place Holder</div>
    </main>
  )
}
