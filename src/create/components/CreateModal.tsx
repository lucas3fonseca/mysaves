import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { CreateForm } from './CreateForm'

interface CreateModalProps {
  onSaveVideo: (videoUrl: string, title: string, description: string) => void
  error?: string,
}

export const CreateModal = ({ onSaveVideo, error }: CreateModalProps) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const saveVideo = (videoUrl: string, title: string, description: string) => {
    if (error) {
      return
    }

    onSaveVideo(
      videoUrl,
      title,
      description,
    )
    closeModal()
  }

  return (
    <>
      <div className='m-auto'>
        <button
          type='button'
          onClick={openModal}
          className='bg-black px-4 py-2
            border border-mysave-pink rounded-full
            text-sm font-semibold text-white 
            hover:bg-mysave-pink hover:text-black
          focus-visible:ring-white/75'
        >
          Save video
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50'
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-white/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full sticky items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel
                  className='w-full max-w-md transform
                    overflow-auto h-full border border-mysave-pink
                    rounded-2xl bg-black p-6 text-left align-middle 
                    shadow-xl transition-all'
                >
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-white'
                  >
                    Save a video!
                  </Dialog.Title>

                  <CreateForm onSubmit={saveVideo} onCancel={closeModal} error={error} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
