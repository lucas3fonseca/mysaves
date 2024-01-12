import ReactPlayer from 'react-player/lazy'

import type { MySave } from '@/pages/global/interfaces'

interface MySaveViewProps {
  mySave: MySave
}

export const MySaveView = ({ mySave }: MySaveViewProps) => {
  return (
    <div className='flex flex-col justify-center align-middle ml-auto mr-auto w-1/2 pt-3'>
      <h1 className='text-xl font-semibold mb-3'>{mySave.title}</h1>
      <h2>Description</h2>
      <p className='text-l mb-5 mt-5'>{mySave.description}</p>
      <ReactPlayer url={mySave.videoUrl} muted playing volume={1} playsinline controls />
    </div>
  )
}