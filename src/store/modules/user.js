import * as types from '../mutation-types'
import Store from '../../utils/store'

const state = {
  domain: 'http://localhost:8080', // 保存后台请求的地址
  login: false,
  userInfo: { // 保存用户信息
    email: null,
    name: null,
    sex: null,
    tel: null,
    birthdate: null,
    desc: null,
    uid: null
  }
}

const mutations = {
  [types.DOLOGIN] (state, userInfo) {
    state.login = true;
    state.userInfo = userInfo;
    Store.save('user', state);
  },
  [types.UPDATEUSER] (state, newUser) {
    state.userInfo = newUser;
    Store.save('user', state);
  },
  [types.DOLOGINOUT] (state, userInfo) {
    state.login = false;
    state.userInfo = userInfo;
    Store.remove('user');
  }
}

const actions = {
  dologin ({commit}, user) {
    commit(types.DOLOGIN, user)
  },
  dologout ({commit}, user) {
    commit(types.DOLOGINOUT, user)
  },
  updateuser ({commit}, user) {
    commit(types.UPDATEUSER, user)
  }
}
export default {
  state,
  mutations,
  actions
}
