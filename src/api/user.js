import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/sys/login',
    method: 'post',
    data
  })
}

// 获取用户基本资料的接口封装
export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 根据id获取用户详细信息的接口封装
export function getDetailInfo(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}

// 获取公司信息
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`,
    method: 'get'
  })
}

// 保存员工信息
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
