import request from '@/utils/request'

export const loginAPI = (username: string, pwd: string) =>
  request.get(`login/cellphone?phone=${username}&password=${pwd}`)
