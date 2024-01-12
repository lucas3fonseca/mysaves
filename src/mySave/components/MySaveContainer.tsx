import type { MySave } from '@/pages/global/interfaces'

import { MySaveView } from './MySaveView'

interface MySaveContainerProps {
  mySave: MySave
}

export const MySaveContainer = ({ mySave }: MySaveContainerProps) => {
  return <MySaveView mySave={mySave} />
}