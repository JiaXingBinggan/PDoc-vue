import * as types from '../mutation-types'
import Store from '../../utils/store'

const state = {
  treeNodes: null
}

const mutations = {
  [types.UPDATEDOC] (state, docInfo) {
    state.treeNodes = docInfo.newTreeNodes;
    Store.save('docs', state);
  }
}

const actions = {
  updatedoc ({commit}, docInfo) {
    commit(types.UPDATEDOC, docInfo)
  }
}
export default {
  state,
  mutations,
  actions
}
