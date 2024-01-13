import React, { Dispatch } from 'react'
import { MySave } from '@/pages/global/interfaces'

export const GlobalDispatchContext = React.createContext<Dispatch<MySave[]>>({} as Dispatch<MySave[]>);
