import type { NextApiRequest, NextApiResponse } from 'next'

import { MySave, HttpRequestMethods } from '@/pages/global/interfaces'
import { MySaveError, MySaveErrorType } from '../../_utils/MySaveError'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MySave | MySaveError>
) {
  const id = req.query.id as string

  if (!id || typeof id !== 'string') {
    res.status(404).json(new MySaveError(`Id not found: ${id}`, MySaveErrorType.MySaveNotFound))
  }

  if (req.method === HttpRequestMethods.GET) {
    const mySave = global.state[id]
    if (!mySave) {
      res.status(404).json(new MySaveError(`Id not found: ${id}`, MySaveErrorType.MySaveNotFound))
    }

    res.status(200).json(mySave)
  } else {
    res.status(404).json(new MySaveError(`Internal server error`, MySaveErrorType.MySaveInternalServerError))
  }
}
