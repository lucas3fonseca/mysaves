import { useGlobalContext } from 'src/global/hooks/useGlobalContext'
import { MySaveAction, MySaveActionType } from 'src/global/reducers/mySaveReducer'

import { CreateModal } from './CreateModal'
import { SaveInfo } from '../interfaces/create'


export const CreateContainer = () => {

  const saveVideo = (saveInfo: SaveInfo) => {
    // send it over to the server
  }

  return <CreateModal onSaveVideo={saveVideo} />
}