import type { NextApiRequest, NextApiResponse } from 'next'

import { AppState, HttpRequestMethods } from '@/pages/global/interfaces'

import { ErrorResponse } from '../_utils/MySaveError'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AppState | ErrorResponse>
) {
  if (req.method === HttpRequestMethods.GET) {
    res.status(200).json(global.state)
  } else {
    res.status(501).json({ error: 'Unsupported request' })
  }
  
}
