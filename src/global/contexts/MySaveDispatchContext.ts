import React, { Dispatch } from 'react'
import type { MySaveAction } from '../reducers/mySaveReducer'

export const MySaveDispatchContext = React.createContext<Dispatch<MySaveAction> | null>(null);
