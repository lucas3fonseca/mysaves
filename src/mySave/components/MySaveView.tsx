import {
  ChevronRightIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import ReactPlayer from 'react-player/lazy'

import type { MySave } from '@/pages/global/interfaces'

interface MySaveViewProps {
  mySave: MySave
  onNextMySave: (e: React.FormEvent<HTMLButtonElement>) => void
  onRemoveMySave: (e: React.FormEvent<HTMLButtonElement>) => void
}

export const MySaveView = ({ mySave, onNextMySave, onRemoveMySave }: MySaveViewProps) => {
  return (
    <div className='flex flex-col justify-center align-middle ml-auto mr-auto w-1/2 pt-3'>
      <h1 className='text-xl font-semibold mb-3'>{mySave.title}</h1>
      <h2>Description</h2>
      <p className='text-l mb-5 mt-5'>{mySave.description}</p>

      <div className='aspect-video'>
        <ReactPlayer
          width={'100%'}
          height={'100%'}
          url={mySave.videoUrl}
          muted
          playing
          volume={1}
          playsinline
          controls
        />
      </div>

      <div className='flex justify-between mt-10'>
        <button
          onClick={onRemoveMySave}
        >
          <TrashIcon className='h-6 w-6 text-mysave-pink hover:text-mysave-cyan' />
        </button>
        <button
          onClick={onNextMySave}
        >
          <ChevronRightIcon className='h-6 w-6 text-mysave-pink font-semibold hover:text-mysave-cyan' />
        </button>
      </div>
    </div>
  )
}