import { useContext } from 'react'

import { GlobalContext } from '@/src/global/contexts/GlobalContext'
import { AppState, CloudinaryImage } from '@/pages/global/interfaces'

import { MySavePreviewView } from './MySavePreviewView'

const extractThumbnails = (appState: AppState) => {
  return Object.keys(appState).map((key: string) => {
    return {
      id: appState[key].id,
      image: appState[key].cloudinaryThumbnail
    }
  })
}

export const MySavePreviewContainer = () => {
  const appState = useContext(GlobalContext)
  console.log(appState)
  return (
    <>
      {
        appState ? 
        <MySavePreviewView images={extractThumbnails(appState)} /> :
        <></>
      }
    </>
  )
}