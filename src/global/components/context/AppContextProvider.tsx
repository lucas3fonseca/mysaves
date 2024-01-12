import { Dispatch, ReactNode, useReducer } from 'react'

import { GlobalContext, GlobalContextState } from '../../contexts/GlobalContext'
import type { MySaveDispatchContext } from '../../contexts/MySaveDispatchContext'
import type { MySaveAction } from '../../reducers/mySaveReducer'

interface AppContextProviderProps extends React.PropsWithChildren {
  state: GlobalContextState
  // dispatch: Dispatch<MySaveAction>
  children: ReactNode
}

export const AppContextProvider = ({ state, children }: AppContextProviderProps) => {
  // const [state, dispatch] = useReducer(mySaveReducer, {}); // TODO: maybe add this back later
  // <MySaveDispatchContext.Provider value={dispatch}>
  // {children}
  // </MySaveDispatchContext.Provider>

  return (
    <GlobalContext.Provider value={state}>
      {children}
    </GlobalContext.Provider>
  );
}