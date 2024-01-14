// Probably use a regex for this in the future

const YOUTUBE_VIDEO_URL_IDENTIFIER = 'watch?v='
const YOUTUBE_SHORT_URL_IDENTIFIER = 'shorts/'
const YOUTUBE_VIDEO_URL_FORMAT = 'https://youtube.com/watch?v='
const YOUTUBE_SHORT_URL_FORMAT = 'https://youtube.com/shorts/'

export const isValidYoutubeUrl = (url: string): boolean => {
  url = url.replace('www.', '')
  const is_video = url.includes(YOUTUBE_VIDEO_URL_FORMAT) ? true : false
  const is_short = url.includes(YOUTUBE_SHORT_URL_FORMAT) ? true : false

  return !is_video && !is_short
}

export const parseIdFromUrl = (url: string): string | null => {
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