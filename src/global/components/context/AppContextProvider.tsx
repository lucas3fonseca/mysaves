import { ReactNode, useState, useEffect } from 'react'

import { AppState } from '@/pages/global/interfaces'

import { GlobalContext } from '../../contexts/GlobalContext'
import { GlobalDispatchContext } from '../../contexts/GlobalDispatchContext'


interface AppContextProviderProps extends React.PropsWithChildren {
  state: AppState
  children: ReactNode
}

export const AppContextProvider = ({ state, children }: AppContextProviderProps) => {
  const [appState, setAppState] = useState<AppState>(state)
  useEffect(() => { setAppState(state)}, [state])
  return (
    <GlobalContext.Provider value={appState}>
      <GlobalDispatchContext.Provider value={setAppState}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  );
}