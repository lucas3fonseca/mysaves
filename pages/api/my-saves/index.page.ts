import type { NextApiRequest, NextApiResponse } from 'next'

import { AppState } from '@/pages/global/interfaces'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AppState>
) {
  res.status(200).json(global.state)
}
