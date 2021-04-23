import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  isLoadingMachineTags: false,
  machineTags: [],
  loading: false,
  thresholds: [],
  buttonLoading: false,
  isThresholdDeleting: false,
  isThresholdUpdating: false
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
