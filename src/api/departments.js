import request from '@/utils/request'

// 查询部门列表
export function getDepartmentList() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}

// 新增部门
export function addNewDepts(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 根据id删除部门
export function delateDeptsById(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'delete',
    data
  })
}
