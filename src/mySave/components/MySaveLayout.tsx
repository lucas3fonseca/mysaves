import { MySave } from '@/pages/global/interfaces'
import { Header } from '@components/layouts/Header'

import { MySaveContainer } from './MySaveContainer'


interface MySaveLayoutProps {
  mySave: MySave
}

export const MySaveLayout = ({ mySave }: MySaveLayoutProps) => {
  return (
    <Header>
      <MySaveContainer mySave={mySave} />
    </Header>
  )
}