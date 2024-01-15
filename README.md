# MySaves

## Local Development

### Prerequisites

You will need a cloudinary account, a YouTube developer account, and a Vercel account with a deployed Vercel KV store.

You will also need a local `.env.local` file with the following variables:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=
YOUTUBE_VIDEOS_API_BASE_URL=
GOOGLE_API_KEY=
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
```
Commands:
```bash
npm install
npm run build
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser to see the result.

## Deployed on Vercel

The app is deployed on Vercel and can be found here [MySaves](https://mysaves-eight.vercel.app)

## Storage

Due to time constraints all persistent state is being stored in [Vercel KV](https://vercel.com/docs/storage/vercel-kv) store instead of a database.

## Future Improvements

- The server state should be moved to a database to more efficiently retrieve the data, sort it properly, and paginate it.
- Client-side state should use a more robust state management tool like redux.
- User sessions should be implemented other users can't delete each other's videos.
- The components should be more segregated and modularized to improve reusability.

## Limitations for Mobile Low Power Mode

Be aware: when a mobile device is on low power mode the video will attempt to autoplay
but the operating system will immediately pause the video.

## Screenshots
