import React from 'react'

export interface MySave {
  id: number,
  title: string,
  description: string,
  video_url: string,
  deleted: boolean, // we'll see if this works well
}

export interface GlobalContextState {
  mySaves: MySave[]
}

export const GlobalContext = React.createContext<GlobalContextState>({
  mySaves: []
})