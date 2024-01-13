import useAxios from 'axios-hooks'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { GlobalContext, AppContext } from '@/src/global/contexts/GlobalContext'
import { MySave } from '@/pages/global/interfaces'
import { settings } from '@/pages/global/settings'
import { GlobalDispatchContext } from '@/src/global/contexts/GlobalDispatchContext'

import { MySaveView } from './MySaveView'
import { ROUTES } from '@/src/global/routes'

interface MySaveContainerProps {
  mySaveId: string
}

export const MySaveContainer = ({ mySaveId }: MySaveContainerProps) => {
  const appState: AppContext = useContext(GlobalContext)
  const dispatch = useContext(GlobalDispatchContext)
  const [indexToRemove, setIndexToRemove] = useState<null | number>(null)
  const router = useRouter()
  const [{ data, loading, error }, executeDelete] =
    useAxios<string>(
      {
        method: 'DELETE'
      },
      { manual: true }
    )

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

  const onRemoveMySave = async (index: number) => {
    const { mySaves } = appState
    const removedId = await executeDelete({
      url: `${settings.apiBaseUrl}/my-save/delete/${mySaves[index].id}`,
    })

    if (!removedId) {
      return
    }

    setIndexToRemove(index)
  }

  useEffect(() => {
    if (indexToRemove !== null) {
      const { mySaves } = appState
      mySaves.splice(indexToRemove, 1)
      dispatch(mySaves)
      router.push('/')
    }

  }, [indexToRemove, appState, dispatch, router])

  if (appState) {
    const { mySaves } = appState
    const index = mySaves.findIndex((mySave: MySave) => mySave.id === mySaveId)
    return (
      <MySaveView
        mySave={mySaves[index]}
        onNextMySave={() => onNextMySave(index)}
        onRemoveMySave={() => { onRemoveMySave(index) }}
      />
    )
  } else {
    return <></>
  }
}