import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: "http://124.128.148.108:21019/", // 线
  baseURL: "http://192.168.4.20:8010/", // 黄
  timeout: 3000, // request timeout
  //保持sessionKey
  withCredentials: false,
  crossDomain: true
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    let res = response.data;
    // if (response.status !== 200) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
    return res;
  },
  error => {
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    // return Promise.reject(error)
  }
)

export default service
