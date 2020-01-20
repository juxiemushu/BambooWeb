import axios from 'axios';
import router from '../router/index';
import Vue from 'vue';

Vue.prototype.$axios= axios

let base =''

const service = axios.create({
  baseURL: base, // api 的 base_url
  timeout: 30000 // request timeout
})

// 拦截 Http 请求
service.interceptors.request.use((config) => {
  console.log("config", config);
//   jsonp('/authStatus', null, (err, data) => {
//     console.info(data);
// 　　 // 请求拦截响应的参数，判断是否会话过期
//     if(!data.hasLogin){
// 　　　// 页面刷新跳转到登录页面
//       window.location.href = loginTimeOutUrl;
//     }
//   })
  return config;
});

// 拦截请求响应数据
service.interceptors.response.use((response) => {
  console.log("response", response);
  if(response && response.data) {
    return response.data;
  }
  // if (response && response.data) {
  //   if (response.data.status == "UNKNOWN" || response.status == 302) {
  //     //alert("passport登录超时，刷新重新登录");
  //     window.location.reload();
  //   } else {
  //     return response;
  //   }
  // } else {
  //   return response;
  // }
  return response;
}, function (error) {
  console.log("error", error);
  // if (302 == error.response.status || error.response.status == "UNKNOWN") {
  //   //alert("passport登录超时，刷新重新登录");
  //   window.location.reload();
  // } else {
  //   return Promise.reject(error);
  // }
});

export default service;
