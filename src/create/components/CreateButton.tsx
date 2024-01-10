import * as React from 'react'

interface CreateButtonProps {
  onClick: () => void
}

export const CreateButton = ({ onClick }: CreateButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='rounded-md bg-slate-300 px-4 py-2
        text-sm font-semibold text-black hover:bg-black/30
        focus:outline-none focus-visible:ring-2 
        focus-visible:ring-white/75'
    >
      Save any Youtube Video!
    </button>
  )
}
