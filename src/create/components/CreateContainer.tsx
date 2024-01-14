import useAxios from 'axios-hooks'
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import { settings } from '@/pages/global/settings'
import type { MySave, MySaveInfo } from '@/pages/global/interfaces'
import { ROUTES } from '@/src/global/routes'
import { GlobalDispatchContext } from '@/src/global/contexts/GlobalDispatchContext'
import { GlobalContext } from '@/src/global/contexts/GlobalContext'

import { CreateModal } from './CreateModal'



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
  const appState = useContext(GlobalContext)
  const dispatch = useContext(GlobalDispatchContext)
  const [urlError, setUrlError] = useState<null | string>(null)
  const [newMySave, setNewMySave] = useState<null | MySave>(null)
  const [{ data, loading, error }, executePost] =
    useAxios<MySave>(
      {
        url: `${settings.apiBaseUrl}/my-save/create`,
        method: 'POST'
      },
      { manual: true }
    )


  const saveVideo = async (videoUrl: string, title: string, description: string) => {
    const parsedId = parseIdFromUrl(videoUrl)
    console.log('here')
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

    if (!mySave) {
      return
    }
    setNewMySave(mySave.data)
  }

  useEffect(() => {
    if (newMySave) {
      appState.mySaves.push(newMySave)
      dispatch(appState.mySaves)
      router.push(`${ROUTES.MY_SAVE}/${newMySave.id}`)
      setNewMySave(null)
    }
  }, [newMySave, dispatch, appState, router])

  return <CreateModal onSaveVideo={saveVideo} error={urlError || error?.message} />
}