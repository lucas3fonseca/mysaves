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
  // bootstrap some data
  if (!global.state) {
    global.state = {
      qDGN5iyjt4UKSsdvhnkLnP: {
        id: 'qDGN5iyjt4UKSsdvhnkLnP',
        videoId: 'BcpZUSbaiO4',
        title: 'When they take your spoon...',
        description:
          'Get My 12 Commandments to Start Speaking Any Language in 12 Weeks - http://victortalking.com',
        videoUrl: 'https://www.youtube.com/watch?v=BcpZUSbaiO4',
        deleted: false,
        metadata: {
          id: 'BcpZUSbaiO4',
          snippet: {
            title: 'When they take your spoon...',
            description:
              'Get My 12 Commandments to Start Speaking Any Language in 12 Weeks - http://victortalking.com',
            thumbnails: {
              standard: {
                url: 'https://i.ytimg.com/vi/BcpZUSbaiO4/sddefault.jpg',
                width: 640,
                height: 480,
              },
            },
          },
        },
      },
    }
    
  }


  res.status(200).json(undefined)
}
