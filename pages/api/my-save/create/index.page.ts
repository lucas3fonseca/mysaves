import type { NextApiRequest, NextApiResponse } from 'next'
import shortUUID from 'short-uuid'

import { MySave, MySaveInfo } from '@/pages/global/interfaces'
import { generateMySave } from '../../_utils/generateMySave'
import {
  MySaveError,
  MySaveErrorType,
  ErrorResponse,
} from '../../_utils/MySaveError'

enum HttpRequestMethods {
  POST = 'POST',
  GET = 'GET',
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MySave | ErrorResponse>,
) {
  const mySaveInfo = req.body as MySaveInfo
  if (req.method === HttpRequestMethods.POST) {
    const id = shortUUID.generate()

    try {
      const mySave: MySave = await generateMySave(id, mySaveInfo)
      global.state[id] = mySave
      res.status(200).json(mySave)
      
    } catch (error: unknown) {
      if (error instanceof MySaveError) {
        res.status(500).json({ error: error.message })
      } else {
        res.status(500).json({
          error: new MySaveError(
            'Internal server error',
            MySaveErrorType.MySaveInternalServerError,
          ).message,
        })
      }
    }
  }
}
