import * as types from '../mutation-types'

const state = {
  domain: 'http://localhost:8080', // 保存后台请求的地址
  login: false,
  userInfo: { // 保存用户信息
    email: null,
    uid: null
  }
}

const mutations = {
  [types.DOLOGIN] (state, userInfo) {
    state.login = true;
    state.userInfo = userInfo;
    window.localStorage.setItem('user', JSON.stringify(state))
  },
  [types.UPDATEUSER] (state, newUser) {
    state.login = false;
    state.userInfo = newUser;
    window.localStorage.removeItem('user')
  }
}

export default {
  state,
  mutations
}
