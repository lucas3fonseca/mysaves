import { useContext } from 'react'

import { MySaveDispatchContext } from '../contexts/MySaveDispatchContext'

export const useMySaveDispatchContext = () => {
  return useContext(MySaveDispatchContext)
}
