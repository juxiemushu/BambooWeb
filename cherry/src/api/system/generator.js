import axios from '@/api/index';

let managementUrl = '/api/generator'

// 审核人信息详情查询
export function FileGenerate(data) {
  console.log("data", data);
  return axios({
      url: managementUrl + '/generate',
      method: 'put',
      data: data
  })
}