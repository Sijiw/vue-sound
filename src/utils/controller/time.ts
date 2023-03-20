export const formatCurrentTime = (time: string): string => {
  const currentTime = parseInt(time)
  const minute = Math.floor(currentTime / 60)

  const second = currentTime - minute * 60
  const formatMinute = minute < 10 ? `0${minute}` : `${minute}`
  const formatSecond = second < 10 ? `0${second}` : `${second}`

  return `${formatMinute}:${formatSecond}`
}

export const formatTimeToSecond = (time: string) => {
  const minute = parseInt(time.substring(0, 2))
  const second = parseInt(time.substring(3))
  const res = minute * 60 + second

  return res
}
