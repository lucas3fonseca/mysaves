import type { MySave } from '@/pages/global/interfaces'
import { Header } from '@components/layouts/Header'

import { MySaveContainer } from './MySaveContainer'


interface MySaveLayoutProps {
  mySaveId: string
}

export const MySaveLayout = ({ mySaveId }: MySaveLayoutProps) => {
  return (
    <Header>
      <MySaveContainer mySaveId={mySaveId} />
    </Header>
  )
}