import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'
import user from './modules/user'
import docs from './modules/docs'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  mutations,
  getters,
  modules: {
    user,
    docs
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
