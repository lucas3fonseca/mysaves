import type { NextApiRequest, NextApiResponse } from 'next'

import { state, MySave } from '../../_utils/state'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MySave>
) {
  const id = req.query.id as string
  res.status(200).json(state[id])
}
