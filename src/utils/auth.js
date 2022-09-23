// 如果想将数据存在本地的话，可以使用cookie或者本地存储，
// 但是其实cookie比较老的技术了，而且取的时候不方便，所以建议使用更先进的
// 本地存储，既然用不到cookie，那么这个文件就没啥用了

import Cookies from 'js-cookie'

const TokenKey = 'backToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
