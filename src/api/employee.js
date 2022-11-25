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

// xlsx批量导入员工
export function addEmployeeByXlsx(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
