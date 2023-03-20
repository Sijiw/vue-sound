const formatString = (num: number): string => {
  return num <= 10 ? `0${num}` : num.toString()
}

export const msToMin = (time: number) => {
  let second = Math.round(time / 1000)
  let minute = Math.floor(second / 60)
  second = second - minute * 60

  let secondStr = formatString(second)
  let minuteStr = formatString(minute)

  return `${minuteStr}:${secondStr}`
}
