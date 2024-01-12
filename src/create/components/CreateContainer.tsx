import useAxios from 'axios-hooks'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { CreateModal } from './CreateModal'
import { settings } from '@/pages/global/settings'
import { MySave, MySaveInfo } from '@/pages/global/interfaces'
import { ROUTES } from '@/src/global/routes'

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
  const router = useRouter()
  const [urlError, setUrlError] = useState<null | string>(null)
  const [{ data, loading, error }, executePost] =
    useAxios<MySave>(
      {
        url: `${settings.API_BASE_URL}/my-save/create`,
        method: 'POST'
      },
      { manual: true }
    )


  const saveVideo = async (videoUrl: string, title: string, description: string) => {
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

    const mySave = await executePost({
      data: mySaveInfo,
    })

    router.push(`${ROUTES.MY_SAVE}/${mySave.data.id}`)
  }

  console.log(data)

  return <CreateModal onSaveVideo={saveVideo} error={urlError || error?.message} />
}