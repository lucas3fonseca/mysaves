import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { ROUTES } from 'src/global/routes'

export const CreateButtonView = () => {
  return (
    <>
      <div className='container flex h-20 items-center justify-between'>
        <Link href={ROUTES.CREATE}>
          Save any YouTube video!
        </Link>
      </div>
    </>
  )
}
