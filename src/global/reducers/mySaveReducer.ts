import * as short from 'short-uuid'

import { GlobalContextState } from '../contexts/GlobalContext'

export enum MySaveActionType {
  CREATE = 'create',
  DELETE = 'delete',
}

export interface MySaveCreatePayload {
  title: string
  description: string
  video_url: string
}

export interface MySaveDeletePayload {
  id: number
}

export interface MySaveAction {
  kind: MySaveActionType
  payload: MySaveCreatePayload | MySaveDeletePayload
}

export const mySaveReducer = (
  state: GlobalContextState,
  action: MySaveAction,
): GlobalContextState => {
  if (action.kind === MySaveActionType.CREATE) {
    const { mySaves } = state
    const payload = action.payload as MySaveCreatePayload
    const id = mySaves.length - 1 // the array element is it's ID, makes things simpler for now

    mySaves.push({
      id,
      deleted: false,
      ...payload,
    })
    return { mySaves }
  }

  if (action.kind === MySaveActionType.DELETE) {
    const { mySaves } = state
    const payload = action.payload as MySaveDeletePayload
    mySaves[payload.id].deleted = true

    return { mySaves }
  }

  return state
}
