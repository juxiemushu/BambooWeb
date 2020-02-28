import request from '@/utils/request'
import qs from 'qs'

// // 登录请求必须设置请求头，并转换参数，否则接收不到响应数据。请求挂起直至超时
// export function login(data) {
//   return request({
//     url: '/oauth/login',
//     method: 'post',
//     data
//   })
// }

// 获取用户列表信息
export function listUsers(data) {
  return request({
    url: '/oauth/sys/user/list',
    method: 'post',
    // headers: {
    //   'Content-type': 'application/json;charset=UTF-8'
    // },
    // transformRequest: [function(data) {      //在请求之前对data传参进行格式转换
    //   data = JSON.stringify(data)
    //   return data
    // }],
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
