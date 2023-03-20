import request from '@/utils/request'

export const getHotList = () => {
  return request.get('search/hot')
}

export const getHotPlayList = (limit = 20) => {
  return request.get(`top/playlist/highquality?limit=${limit}`)
}
