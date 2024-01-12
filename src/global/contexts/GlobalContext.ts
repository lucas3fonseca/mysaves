import React from 'react'

import type { AppState } from '@/pages/global/interfaces'

export const GlobalContext = React.createContext<AppState>({} as AppState)
