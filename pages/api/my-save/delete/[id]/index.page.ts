import type { NextApiRequest, NextApiResponse } from 'next'

import { HttpRequestMethods, type MySave } from '@/pages/global/interfaces'
import { cloudinaryDestroy } from '../../../_utils/cloudinaryDestroy'
import {
  MySaveError,
  MySaveErrorType,
  ErrorResponse,
} from '../../../_utils/MySaveError'

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

    const mySave: MySave = global.state[id]
    if (!mySave) {
      res.status(404).json({
        error: new MySaveError(
          `Id not found: ${id}`,
          MySaveErrorType.MySaveNotFound,
        ).message,
      })
    }

    try {

      await cloudinaryDestroy(mySave.cloudinaryThumbnail.publicId)
      delete global.state[id]
      res.status(200).json({ id })

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
