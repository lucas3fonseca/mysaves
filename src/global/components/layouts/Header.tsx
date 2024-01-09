import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { ROUTES } from 'src/global/routes'

const DEFAULT_TITLE = 'MySaves'

interface HeaderProps {
  title?: string
}

export const Header = ({ title, children }: React.PropsWithChildren & HeaderProps) => {
  return (
    <>
      <header className='bg-slate-100 sticky top-0 z-50 border-b border-slate-400'>
        <div className='container flex h-20 items-center justify-between'>
          <Link href={ROUTES.HOME}>
            <div className='flex items-center'>
              <Image
                src='/vercel.svg'
                width={157}
                height={42}
                alt='MySaves Logo'
                priority
              />
              <h1 className='text-black font-medium pl-5'>{title ? title : DEFAULT_TITLE}</h1>
            </div>
          </Link>
        </div>
      </header>
      {children}
    </>
  )
}
