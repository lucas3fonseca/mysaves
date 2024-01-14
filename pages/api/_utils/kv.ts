import { VercelKV, createClient } from '@vercel/kv'

import { AppState, MySave } from '@/pages/global/interfaces'
import { settings } from '../settings'

export const kvClient = (): VercelKV => {
  const kvClient = createClient({
    url: settings.kvRestApiUrl,
    token: settings.kvRestApiToken,
  })

  return kvClient
}
 
export const getStateRecord = async (id: string) => {
  const client = kvClient()
 
  const state = await client.hget<MySave>('state', id)
  
  if (state) {
    return state
  } else {
    return null
  }
  
}

export const getAllState = async () => {
  const client = kvClient()
  const state = await client.hgetall('state')
  
  if (state) {
    return state
  } else {
    return null
  }
  
}

export const setState = async (mySave: AppState) => {
  const client = kvClient()
  client.hset('state', mySave)
}