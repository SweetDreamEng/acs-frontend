import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  isLoadingMachineTags: false,
  machineTags: [],
  loading: false
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}