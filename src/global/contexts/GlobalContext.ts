import React from 'react'

import { MySave } from '@/pages/global/interfaces'

export interface GlobalContextState {
  [id: string]: MySave
}

export const GlobalContext = React.createContext<GlobalContextState>({})
