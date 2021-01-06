import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: "http://124.128.148.108:21019/", // 线
  // baseURL: "http://125.64.98.21:8012/", // 罗
  //baseURL: "http://192.168.3.40:8011/", // 黄
  // baseURL: "http://192.168.3.31:8010/", // 谢
  baseURL: "http://192.168.4.20:8010/",
  // baseURL: "/",
  timeout: 0, // request timeout
  //保持sessionKey
  withCredentials: true, // send cookies when cross-domain requests
  crossDomain: true
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 如果您想获取http信息，如头或状态
   * Please return  response => response
  */

  /**
   *通过自定义代码确定请求状态
   *您还可以通过HTTP状态代码来判断状态
  */
  response => {
    let res = response.data;
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
