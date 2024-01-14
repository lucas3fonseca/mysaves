import { VercelKV, createClient } from '@vercel/kv'

import { AppState, MySave } from '@/pages/global/interfaces'
import { settings } from '../settings'

const STATE_KEY = 'state'

export const kvClient = (): VercelKV => {
  const kvClient = createClient({
    url: settings.kvRestApiUrl,
    token: settings.kvRestApiToken,
  })

  return kvClient
}
 
export const getStateRecord = async (id: string) => {
  const client = kvClient()
  const state = await client.hget<MySave>(STATE_KEY, id)
  
  if (state) {
    return state
  } else {
    return null
  }
  
}

export const deleteStateRecord = async (id: string) => {
  const client = kvClient()
  await client.hdel('state', id)
}

export const getAllState = async () => {
  const client = kvClient()
  const state = await client.hgetall(STATE_KEY)
  
  if (state) {
    return state
  } else {
    return null
  }
  
}

export const setState = async (mySave: AppState) => {
  const client = kvClient()
  client.hset(STATE_KEY, mySave)
}