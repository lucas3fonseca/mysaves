import useAxios from 'axios-hooks'
import { useState } from 'react'

import { CreateModal } from './CreateModal'
import { settings } from '@/pages/global/settings'
import { MySave, MySaveInfo } from '@/pages/global/interfaces'

const YOUTUBE_URL_IDENTIFIER = 'watch?v='
const YOUTUBE_URL_FORMAT = 'https://www.youtube.com/watch?v='

const parseIdFromUrl = (url: string): string | null => {
  
  if (!url.includes(YOUTUBE_URL_FORMAT)) {
    return null
  }

  const parts = url.split(YOUTUBE_URL_IDENTIFIER)
  if (parts.length < 2) {
    return null
  } else {
    return parts[1]
  }
}

export const CreateContainer = () => {
  const [urlError, setUrlError] = useState<null | string>(null)
  const [{ data, loading, error }, executePost] =
    useAxios<MySave>(
      {
        url: `${settings.API_BASE_URL}/my-save/create`,
        method: 'POST'
      },
      { manual: true }
    )


  const saveVideo = (videoUrl: string, title: string, description: string) => {
    const parsedId = parseIdFromUrl(videoUrl)

    if (!parsedId) {
      setUrlError('Invalid YouTube video url.')
      return
    }

    const mySaveInfo: MySaveInfo = {
      title,
      description,
      videoUrl,
      videoId: parsedId,
    }

    executePost({
      data: mySaveInfo,
    })
  }

  console.log(data)

  return <CreateModal onSaveVideo={saveVideo} error={urlError || error?.message} />
}