import { poppins } from '@/pages/global/fonts'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { CreateForm } from './CreateForm'

interface CreateModalProps {
  onSaveVideo: () => void
}

export const CreateModal = ({ onSaveVideo }: CreateModalProps) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const saveVideo = () => {
    closeModal()
    onSaveVideo()
  }

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className='rounded-md bg-slate-300 px-4 py-2
        text-sm font-semibold text-black hover:bg-black/30
        focus:outline-none focus-visible:ring-2 
        focus-visible:ring-white/75'
      >
        Save any Youtube Video!
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className={`relative z-10`} onClose={closeModal}>
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
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden 
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
