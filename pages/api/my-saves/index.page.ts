import type { NextApiRequest, NextApiResponse } from 'next'

import { AppState, HttpRequestMethods } from '@/pages/global/interfaces'

import { ErrorResponse } from '../_utils/MySaveError'
import { getAllState } from '../_utils/kv'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, unknown> | null | ErrorResponse>
) {
  if (req.method === HttpRequestMethods.GET) {
    const state = await getAllState()
    res.status(200).json(state)
  } else {
    res.status(501).json({ error: 'Unsupported request' })
  }
}
