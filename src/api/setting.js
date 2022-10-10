import request from '@/utils/request'

// 获取公司信息
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`,
    method: 'get'
  })
}

// 获取全部角色
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    method: 'get',
    params
  })
}

// 新增角色
export function addNewRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

// 根据id获取角色详情
export function getDetailById(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}

// 根据id更新角色
export function resetRoleById(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

// 根据id删除角色
export function deleteRoleById(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
