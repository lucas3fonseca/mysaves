import { useContext } from 'react'

import { GlobalContext } from '@/src/global/contexts/GlobalContext'

import { MySavePreviewView } from './MySavePreviewView'


export const MySavePreviewContainer = () => {
  const appState = useContext(GlobalContext)
  return (
    <>
      {
        appState ? 
        <MySavePreviewView mySaves={appState.mySaves} /> :
        <></>
      }
    </>
  )
}