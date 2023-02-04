import request from '@/utils/request'

// 获取全部权限点
export function getPermissionList() {
  return request({
    url: '/sys/permission',
    method: 'get'
  })
}

// 添加权限点
export function addNewPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

// 根据id获取权限点详情

export function getPermissionDetailById(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'get'
  })
}

// 根据id更新权限点详情
export function updatePermissionDetailById(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}

// 根据id删除权限
export function deletePermissionById(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
