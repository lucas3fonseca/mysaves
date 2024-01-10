import { useState } from 'react'

import { useGlobalContext } from 'src/global/hooks/useGlobalContext'
import { useMySaveDispatchContext } from 'src/global/hooks/useMySaveDispatchContext'
import { MySaveAction, MySaveActionType } from 'src/global/reducers/mySaveReducer'

import { CreateModal } from './CreateModal'
import { SaveInfo } from '../interfaces/create'


export const CreateContainer = () => {
  const { mySaves } = useGlobalContext()
  const dispatch = useMySaveDispatchContext()

  console.log(mySaves)

  const saveVideo = (saveInfo: SaveInfo) => {
    dispatch!({
      kind: MySaveActionType.CREATE,
      payload: {
        ...saveInfo
      }
    })
  }

  return <CreateModal onSaveVideo={saveVideo} />
}