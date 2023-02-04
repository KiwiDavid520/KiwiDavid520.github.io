const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  // 用户的用户名
  name: state => state.user.userInfo.username,
  // 用户的头像
  staffPhoto: state => state.user.userInfo.staffPhoto
}
export default getters
