import type { NextApiRequest, NextApiResponse } from 'next'

import { MySave, HttpRequestMethods } from '@/pages/global/interfaces'
import {
  MySaveError,
  MySaveErrorType,
  ErrorResponse,
} from '../../_utils/MySaveError'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MySave | ErrorResponse>,
) {
  const id = req.query.id as string

  if (!id || typeof id !== 'string') {
    res.status(404).json({
      error: new MySaveError(
        `Id not found: ${id}`,
        MySaveErrorType.MySaveNotFound,
      ).message,
    })
  }

  if (req.method === HttpRequestMethods.GET) {
    const mySave = global.state[id]

    if (!mySave) {
      res.status(404).json({
        error: new MySaveError(
          `Id not found: ${id}`,
          MySaveErrorType.MySaveNotFound,
        ).message,
      })
    }

    res.status(200).json(mySave)
  } else {
    res.status(404).json({
      error: new MySaveError(
        `Internal server error`,
        MySaveErrorType.MySaveInternalServerError,
      ).message,
    })
  }
}
