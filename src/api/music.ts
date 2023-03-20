import request from '@/utils/request'

export const getMusicDetailAPI = (id: string) =>
  request.get(`song/url?id=${id}`)
