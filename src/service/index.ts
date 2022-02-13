// service统一出口
import launchRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import LocalCache from '@/utils/cache'

const Request = new launchRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config: any) => {
      // 携带token的拦截
      try {
        const token = LocalCache.getCache('TOKEN_KEY')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      } catch (error) {
        console.log(error)
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default Request
