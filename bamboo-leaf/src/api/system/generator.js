import request from '@/utils/request'

let managementUrl = '/generator'

// 审核人信息详情查询
export function fileGenerate(data) {
  return request({
      url: managementUrl + '/generate',
      method: 'put',
      data: data
  })
}