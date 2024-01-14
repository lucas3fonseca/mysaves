import { CreateContainer } from '@/src/create/components/CreateContainer'
import { MySavePreviewContainer } from './preview/MySavePreviewContainer'

export const HomeView = () => {
  return (
    <div className='flex space-x-4 flex-wrap'>
      <div className='
        mt-5 ml-5 bg-gradient-to-b from-mysave-cyan
        border-transparent rounded-xl
        w-1/2 bg-no-repeat bg-contain
    '>
        <div className='flex flex-col justify-center flex-wrap min-h-72'>
          <p className='m-auto p-5 text-2xl text-wrap text-center font-semibold'>
            Save all your favorite YouTube videos in one place!
          </p>
          <CreateContainer />
        </div>
      </div>

      <MySavePreviewContainer />
    </div>
  )
}