import { useState } from 'react'

interface CreateFormProps {
  onSubmit: (videoUrl: string, title: string, description: string) => void
  onCancel: () => void
}

export const CreateForm = ({ onSubmit, onCancel }: CreateFormProps) => {
  let [videoUrl, setVideoUrl] = useState('')
  let [title, setTitle] = useState('')
  let [description, setDescription] = useState('')
  let [submitted, setSubmitted] = useState(false)

  const disabled = (
    videoUrl.length === 0 ||
    title.length === 0 ||
    description.length === 0 ||
    submitted
  )

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    onSubmit(videoUrl, title, description)
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div className='mt-10 text-black grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
        <div className='sm:col-span-full'>
          <label htmlFor='videourl' className='block text-sm font-medium leading-6 '>
            Video URL
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset
                        ring-slate-600 focus-within:ring-2 focus-within:ring-inset
                          sm:max-w-md'
            >
              <input type='text' name='videourl' id='videourl'
                className='block flex-1 
                          border-0 bg-transparent py-1.5 pl-2
                          focus:outline-none
                          focus:ring-0 sm:text-sm sm:leading-6'
                placeholder='https://www.youtube.com/watch?v=hGxzzVer7x0'
                onChange={(e: React.FormEvent<HTMLInputElement>) => setVideoUrl(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>

        <div className='sm:col-span-full'>
          <label htmlFor='title' className='block text-sm font-medium leading-6 '>
            Title
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset
                        ring-slate-600 focus-within:ring-2 focus-within:ring-inset
                          sm:max-w-md'
            >
              <input type='text' name='title' id='title'
                className='block flex-1
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
          <label htmlFor='description' className='block text-sm font-medium leading-6'>
            Description
          </label>
          <div className='mt-2'>
            <textarea id='description' name='description' rows={3}
              className='block w-full rounded-md border-0 py-1.5 
                        bg-transparent p-2 resize-none
                        shadow-sm ring-slate-600
                        ring-1 ring-inset focus:ring-2
                        focus:outline-none
                        focus:ring-inset sm:text-sm sm:leading-6'
              onChange={(e: React.FormEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)}
            />
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-center gap-x-6'>
        <button type='button'
          className='text-sm font-semibold leading-6 
          text-black bg-red-300 border border-slate-300 rounded-md
          hover:bg-red-400 px-2 py-1 
            focus-visible:outline-2 focus-visible:outline-offset-2'
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type='submit'
          disabled={disabled}
          className='rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold 
          text-black enabled:hover:bg-slate-500 focus-visible:outline
            focus-visible:outline-2 focus-visible:outline-offset-2
          disabled:text-slate-100 disabled:cursor-not-allowed'
        >
          Save
        </button>
      </div>
    </form>
  )
}