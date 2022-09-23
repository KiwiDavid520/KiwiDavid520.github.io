import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
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
