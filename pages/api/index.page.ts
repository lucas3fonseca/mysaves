import type { NextApiRequest, NextApiResponse } from 'next'

/*
 * Data stored in memory for this project, a re-deploy will wipe everything
 * This is pre-populated with some data for demo purposes.
 *
 * Need to hook into global namespace since the routes are bundled separately
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<undefined>,
) {
  // init state
  if (!global.state) {
    global.state = {}
  }

  res.status(200).json(undefined)
}
