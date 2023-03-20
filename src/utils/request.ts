import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
  withCredentials: true
})

request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

request.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => Promise.reject(error)
)

export default request
