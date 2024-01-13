import { ReactNode, useState, useEffect } from 'react'

import { MySave } from '@/pages/global/interfaces'

import { GlobalContext } from '../../contexts/GlobalContext'
import { GlobalDispatchContext } from '../../contexts/GlobalDispatchContext'


interface AppContextProviderProps extends React.PropsWithChildren {
  mySaves: MySave[]
  children: ReactNode
}

export const AppContextProvider = ({ mySaves, children }: AppContextProviderProps) => {
  const [appState, setAppState] = useState<MySave[]>(mySaves)
  useEffect(() => { setAppState(mySaves) }, [mySaves])

  return (
    <GlobalContext.Provider value={{ mySaves: appState }}>
      <GlobalDispatchContext.Provider value={setAppState}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  );
}