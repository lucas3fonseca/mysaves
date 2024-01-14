import { useState } from 'react'
import { isValidYoutubeUrl } from '../utils/youtubeUrl'

interface CreateFormProps {
  onSubmit: (videoUrl: string, title: string, description: string) => void
  onCancel: () => void
  error?: string
}

export const CreateForm = ({ onSubmit, onCancel, error }: CreateFormProps) => {
  let [videoUrl, setVideoUrl] = useState('')
  let [title, setTitle] = useState('')
  let [description, setDescription] = useState('')
  let [submitted, setSubmitted] = useState(false)
  const validUrl = !isValidYoutubeUrl(videoUrl)

  const disabled = (
    videoUrl.length === 0 ||
    title.length === 0 ||
    description.length === 0 ||
    (!validUrl) ||
    submitted
  )

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    onSubmit(videoUrl, title, description)
  }

  console.log(error)

  return (
    <form onSubmit={handleOnSubmit}>
      <div className='mt-10 text-black grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
        <div className='sm:col-span-full'>
          <label htmlFor='videourl' className='block text-sm text-white font-medium leading-6 '>
            Video URL
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset
                  ring-mysave-cyan focus-within:ring-2 focus-within:ring-inset
                    sm:max-w-md'
            >
              <input
                type='text'
                name='videourl'
                id='videourl'
                autoComplete='off'
                className='block flex-1 
                  border-0 bg-transparent py-1.5 pl-2
                  truncate text-white
                  focus:outline-none overflow-ellipsis
                  focus:ring-0 sm:text-sm sm:leading-6'
                placeholder='https://www.youtube.com/watch?v=...'
                onChange={(e: React.FormEvent<HTMLInputElement>) => setVideoUrl(e.currentTarget.value)}
              />
            </div>
            {(!validUrl && videoUrl.length > 0) &&
              <div className='font-sm mt-1 text-mysave-red'>
                Invalid YouTube video URL.
              </div>
            }
          </div>
        </div>

        <div className='sm:col-span-full'>
          <label htmlFor='title' className='block text-sm text-white font-medium leading-6 '>
            Title
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset
                  ring-mysave-cyan focus-within:ring-2 focus-within:ring-inset
                    sm:max-w-md'
            >
              <input type='text' name='title' id='title'
                className='block flex-1 text-white
                  border-0 bg-transparent py-1.5 pl-2
                  focus:outline-none
                  focus:ring-0 sm:text-sm sm:leading-6'
                placeholder='Title...'
                onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>

        <div className='col-span-full'>
          <label htmlFor='description' className='block text-sm text-white font-medium leading-6'>
            Description
          </label>
          <div className='mt-2'>
            <div className='rounded-md shadow-sm ring-1 ring-inset
                  ring-mysave-cyan focus-within:ring-2 focus-within:ring-inset
                    sm:max-w-md
              '>
              <textarea id='description' name='description' rows={3}
                className='block text-white w-full rounded-md border-1 py-1.5 
                bg-transparent p-2 resize-none
                shadow-sm ring-mysave-cyan
                ring-1 ring-inset focus:ring-2
                focus:outline-none
                focus:ring-inset sm:text-sm sm:leading-6'
                onChange={(e: React.FormEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-center gap-x-6'>
        <button type='button'
          className='bg-black px-4 py-2
            border border-mysave-red rounded-full
            text-sm font-semibold text-white
          enabled:hover:bg-mysave-red enabled:hover:text-black
          focus-visible:ring-white/75'
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type='submit'
          disabled={disabled}
          className='bg-black px-4 py-2
            border border-mysave-cyan rounded-full
            text-sm font-semibold text-white 
          enabled:hover:bg-mysave-cyan enabled:hover:text-black
          focus-visible:ring-white/75 disabled:cursor-not-allowed
          disabled:hover:border-slate-400
        '>
          Save
        </button>
      </div>
    </form>
  )
}