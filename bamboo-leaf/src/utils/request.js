import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    console.log("config", config);
    // 在请求发送之前做一些处理操作
    if (config.method === "post" || config.method === "put") {
      config.data = JSON.stringify(config.data);
      config.headers = {
        'Content-Type':'application/json;charset=UTF-8'
      }
    } else if (config.method === "get") {
      config.url = config.url + "?" + qs.stringify(config.data);
    }
    if (store.getters.token) {
      // 为每一次请求都携带 token
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 当请求报错的时候做一些处理
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果想获取诸如请求头或状态之类的http信息，需要返回 response
  */
  response => {
    if(!response.data) {
      console.log('响应结果为空;');
      return res;
    }

    const res = response.data
    if(res.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    } 
    
    if(res.code === 401 || res.code === 403 || res.code === 405) {
      MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        confirmButtonText: 'Re-Login',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
      return Promise.reject(new Error(res.message || 'Error'))
    }else {
      return res;
    }

  },
  error => {
    console.log('logerror:' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service