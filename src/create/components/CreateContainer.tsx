import useAxios from 'axios-hooks'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { CreateModal } from './CreateModal'
import { settings } from '@/pages/global/settings'
import type { MySave, MySaveInfo } from '@/pages/global/interfaces'
import { ROUTES } from '@/src/global/routes'

const YOUTUBE_VIDEO_URL_IDENTIFIER = 'watch?v='
const YOUTUBE_SHORT_URL_IDENTIFIER = 'shorts/'
const YOUTUBE_VIDEO_URL_FORMAT = 'https://youtube.com/watch?v='
const YOUTUBE_SHORT_URL_FORMAT = 'https://youtube.com/shorts/'

// Probably use a regex for this in the future
const parseIdFromUrl = (url: string): string | null => {
  url = url.replace('www.', '')
  const is_video = url.includes(YOUTUBE_VIDEO_URL_FORMAT) ? true : false
  const is_short = url.includes(YOUTUBE_SHORT_URL_FORMAT) ? true : false

  if (!is_video && !is_short) {
    return null
  }

  const parts = (
    is_video ?
      url.split(YOUTUBE_VIDEO_URL_IDENTIFIER) :
      url.split(YOUTUBE_SHORT_URL_IDENTIFIER)
  )

  if (parts.length < 2) {
    return null
  } else {
    return parts.pop() ?? null
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

  return <CreateModal onSaveVideo={saveVideo} error={urlError || error?.message} />
}