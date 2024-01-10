import { useReducer } from 'react'

import { GlobalContext } from '../../contexts/GlobalContext'
import { MySaveDispatchContext } from '../../contexts/MySaveDispatchContext'
import { mySaveReducer } from '../../reducers/mySaveReducer'

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(mySaveReducer, { mySaves: [] }); // TODO: setup initial state at some point

  return (
      <GlobalContext.Provider value={state}>
          <MySaveDispatchContext.Provider value={dispatch}>
              {children}
          </MySaveDispatchContext.Provider>
      </GlobalContext.Provider>
  );
}