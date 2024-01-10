import { CreateModal } from './CreateModal'

export const CreateContainer = () => {
  const saveVideo = () => {
    console.log('saved')
  }

  return <CreateModal onSaveVideo={saveVideo} />
}