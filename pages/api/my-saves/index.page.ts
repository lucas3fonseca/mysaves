import type { NextApiRequest, NextApiResponse } from 'next'

import { state, AppState } from '../_utils/state'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AppState>
) {
  res.status(200).json(state)
}
