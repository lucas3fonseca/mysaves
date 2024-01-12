import React, { Dispatch } from 'react'
import { AppState } from '@/pages/global/interfaces'

export const GlobalDispatchContext = React.createContext<Dispatch<AppState>>({} as Dispatch<AppState>);
