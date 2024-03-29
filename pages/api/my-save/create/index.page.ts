import type { NextApiRequest, NextApiResponse } from 'next'
import shortUUID from 'short-uuid'

import {
  MySave,
  MySaveInfo,
  HttpRequestMethods,
} from '@/pages/global/interfaces'
import { generateMySave } from '../../_utils/generateMySave'
import { setState } from '../../_utils/kv'
import {
  MySaveError,
  MySaveErrorType,
  ErrorResponse,
} from '../../_utils/MySaveError'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MySave | ErrorResponse>,
) {
  const mySaveInfo = req.body as MySaveInfo
  if (req.method === HttpRequestMethods.POST) {
    const id = shortUUID.generate()

    try {
      const mySave: MySave = await generateMySave(id, mySaveInfo)
      await setState({ [id]: mySave })
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
  } else {
    res.status(501).send({ error: 'Unsupported request' })
  }
}
