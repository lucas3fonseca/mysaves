import React from 'react'

import { MySave } from '@/pages/global/interfaces'

export interface AppContext {
  mySaves: MySave[]
}

export const GlobalContext = React.createContext<AppContext>({} as AppContext)
