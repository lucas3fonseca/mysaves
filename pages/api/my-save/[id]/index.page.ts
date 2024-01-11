import type { NextApiRequest, NextApiResponse } from 'next'

import { MySave, MySaveInfo } from '@/pages/global/interfaces'
import { generateMySave } from '../../_utils/createMySave'
import { state } from '../../_utils/state'

enum HttpRequestMethods {
  POST = 'POST',
  GET = 'GET',
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MySave | null>
) {
  const id = req.query.id as string
  const mySaveInfo = req.body as MySaveInfo

  if (!id || typeof id !== 'string') {
    res.status(404).json(null)
  }

  if (req.method === HttpRequestMethods.POST) {

    try {
      const mySave = await generateMySave(id, mySaveInfo)
      state[id] = mySave

      res.status(200).json(mySave)

    } catch (error) {
      res.status(500).json(null)
    }

  } else {
    const mySave = state[id]

    if (!mySave) {
      res.status(404).json(null)
    }

    res.status(200).json(mySave)
  }
  
}
