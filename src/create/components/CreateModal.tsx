import { poppins } from '@/pages/global/fonts'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { CreateForm } from './CreateForm'
import { SaveInfo } from '../interfaces/create'

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
    onSaveVideo(
      videoUrl,
      title,
      description,
    )
    closeModal()
  }

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className='rounded-md bg-slate-300 px-4 py-2
        text-sm font-semibold text-black hover:bg-slate-200
        focus:outline-none focus-visible:ring-2 
        focus-visible:ring-white/75'
      >
        Save!
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className={`relative z-50`} onClose={closeModal}>
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
                  className='w-full max-w-md transform overflow-hidden
                    overflow-y-auto h-full
                    rounded-2xl bg-white p-6 text-left align-middle 
                    shadow-xl transition-all'
                >
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Save a video!
                  </Dialog.Title>
                  
                  <CreateForm onSubmit={saveVideo} onCancel={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
