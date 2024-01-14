import { CreateContainer } from '@/src/create/components/CreateContainer'
import { MySavePreviewContainer } from './preview/MySavePreviewContainer'

export const HomeView = () => {
  return (
    <>
      <div className='
        mt-5 bg-gradient-to-b from-mysave-cyan
        border-transparent rounded-xl
        bg-no-repeat bg-contain
    '>
        <div className='flex flex-col justify-center flex-wrap w-full min-h-52'>
          <p className='m-auto p-5 text-2xl text-wrap text-center font-semibold'>
            Save all your favorite YouTube videos in one place!
          </p>
          <CreateContainer />
        </div>
      </div>
      <div className='grid md:grid-cols-4 sm:grid-cols-3 gap-4 m-3'>
        <MySavePreviewContainer />
      </div>
    </>
  )
}