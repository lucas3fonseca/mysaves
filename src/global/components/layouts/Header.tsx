import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { ROUTES } from 'src/global/routes'

import { CreateContainer } from 'src/create/components/CreateContainer'

export const Header = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <header className='bg-black sticky top-0 z-50 border-b border-slate-400'>
        <div className='container flex h-20 items-center justify-between'>
          <Link href={ROUTES.HOME}>
            <div className='flex items-center'>
              <Image
                src='/mysave2.svg'
                width={147}
                height={42}
                alt='MySaves Logo'
                priority
                className='sm-w-5 md:h-100 md-h-50'
              />
            </div>
          </Link>
          <CreateContainer />
        </div>
      </header>
      {children}
    </>
  )
}
