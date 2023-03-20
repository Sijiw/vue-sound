import request from '@/utils/request'

export const getPlayListDetailAPI = (id: string) =>
  request.get(`/playlist/detail?id=${id}`)
