import request from '@/utils/request'

// 获取员工简单列表
export function getSimpleList() {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}

// 获取详细员工列表
export function getDetailList(params) {
  return request({
    url: '/sys/user',
    method: 'get',
    params
  })
}

// 根据id删除员工
export function deleteEmployeeById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

// 添加员工
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
