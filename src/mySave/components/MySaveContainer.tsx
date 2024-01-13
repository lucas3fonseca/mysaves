import { FormEvent, useContext, useState } from 'react'
import { useRouter } from 'next/router'

import { GlobalContext, AppContext } from '@/src/global/contexts/GlobalContext'
import { MySave } from '@/pages/global/interfaces'

import { MySaveView } from './MySaveView'
import { ROUTES } from '@/src/global/routes'

interface MySaveContainerProps {
  mySaveId: string
}

export const MySaveContainer = ({ mySaveId }: MySaveContainerProps) => {
  const appState: AppContext = useContext(GlobalContext)
  const router = useRouter()

  const onNextMySave = (index: number) => {
    const { mySaves } = appState
  
    if (mySaves) {
      if (mySaves.length - 1 === index) {
        // loop back around
        return router.push(`${ROUTES.MY_SAVE}/${mySaves[0].id}`)
      }
      
      return router.push(`${ROUTES.MY_SAVE}/${mySaves[index + 1].id}`)
    }
  }

  if (appState) {
    const { mySaves } = appState
    const index = mySaves.findIndex((mySave: MySave) => mySave.id === mySaveId)

    return (
      <MySaveView
        mySave={mySaves[index]}
        onNextMySave={() => onNextMySave(index)}
      />
    )
  } else {
    return <></>
  }
}