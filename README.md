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
<img width="1251" alt="Screenshot 2024-01-15 at 10 22 56 AM" src="https://github.com/lucas3fonseca/mysaves/assets/11895103/5cf30c93-320f-4da8-9acd-9c980a676df9">
<img width="1247" alt="Screenshot 2024-01-15 at 10 52 29 AM" src="https://github.com/lucas3fonseca/mysaves/assets/11895103/31c34237-39e7-4d30-8eb3-3a6d677fdf12">
<img width="1242" alt="Screenshot 2024-01-15 at 10 52 44 AM" src="https://github.com/lucas3fonseca/mysaves/assets/11895103/344fb003-7205-46c0-8c67-5db5e336a535">
![image_6487327 (1)](https://github.com/lucas3fonseca/mysaves/assets/11895103/e076ce21-8b49-45fe-b030-dde2009462f9)
![image_6487327 (2)](https://github.com/lucas3fonseca/mysaves/assets/11895103/1a14fb51-3aab-4914-ba53-9fe2fe08a6d8)
![image_6487327](https://github.com/lucas3fonseca/mysaves/assets/11895103/cf1a96d0-0183-40b6-b30f-ddaf5473a839)


