import type { NextApiRequest, NextApiResponse } from 'next'
import shortUUID from 'short-uuid'

import type { MySave, MySaveInfo } from '@/pages/global/interfaces'
import { generateMySave } from '../../../_utils/generateMySave'
import {
  MySaveError,
  MySaveErrorType,
  ErrorResponse,
} from '../../../_utils/MySaveError'

enum HttpRequestMethods {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ id: string } | ErrorResponse>,
) {
  const id = req.query.id as string

  if (req.method === HttpRequestMethods.DELETE) {
    if (!id || typeof id !== 'string') {
      res.status(404).json({
        error: new MySaveError(
          `Id not found: ${id}`,
          MySaveErrorType.MySaveNotFound,
        ).message,
      })
    }

    const mySave = global.state[id]
    if (!mySave) {
      res.status(404).json({
        error: new MySaveError(
          `Id not found: ${id}`,
          MySaveErrorType.MySaveNotFound,
        ).message,
      })
    }

    delete global.state[id]
    res.status(200).json({ id })
    
  } else {
    res.status(501).send({ error: 'Unsupported request' })
  }
}
