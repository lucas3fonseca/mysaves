import type { NextApiRequest, NextApiResponse } from 'next'

import { MySave, HttpRequestMethods } from '@/pages/global/interfaces'
import {
  MySaveError,
  MySaveErrorType,
  ErrorResponse,
} from '../../_utils/MySaveError'
import { getStateRecord } from '../../_utils/kv'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MySave | ErrorResponse>,
) {
  const id = req.query.id as string

  if (req.method === HttpRequestMethods.GET) {
    if (!id || typeof id !== 'string') {
      res.status(404).json({
        error: new MySaveError(
          `Id not found: ${id}`,
          MySaveErrorType.MySaveNotFound,
        ).message,
      })
    }

    const mySave = await getStateRecord(id)
    if (!mySave) {
      res.status(404).json({
        error: new MySaveError(
          `Id not found: ${id}`,
          MySaveErrorType.MySaveNotFound,
        ).message,
      })
    } else {
      res.status(200).json(mySave)
    }

  } else {
    res.status(501).json({ error: 'Unsupported request' })
  }
}
