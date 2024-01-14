import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<undefined>,
) {
  res.status(200).json(undefined)
}
