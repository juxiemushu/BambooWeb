import request from '@/utils/request'
import qs from 'qs'

// 登录请求必须设置请求头，并转换参数，否则接收不到响应数据。请求挂起直至超时
export function login(data) {
  return request({
    url: '/oauth/login',
    method: 'post',
    // headers: {
    //   'Content-type': 'application/x-www-form-urlencoded'
    // },
    // transformRequest: [function(data) {      //在请求之前对data传参进行格式转换
    //   data = qs.stringify(data)
    //   return data
    // }],
    data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/oauth/sys/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
