import { GlobalContextState } from '@/src/global/contexts/GlobalContext'
import { HomeView } from './HomeView'
import { useGlobalContext } from '@/src/global/hooks/useGlobalContext'

export const HomeContainer = () => {
  const context: GlobalContextState = useGlobalContext()

  console.log(`We have context: ${JSON.stringify(context)}`)
  return <HomeView text='placeholder' />
}