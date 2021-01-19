import api from '../services/api'

function defaultTimeRange() {
  return {
    timeRangeOption: 'last24Hours',
    dateFrom: new Date().toISOString().substr(0, 10),
    dateTo: new Date().toISOString().substr(0, 10),
    timeFrom: '00:00',
    timeTo: '00:00'
  }
}

const module = {
  namespaced: true,
  state: {
    selectedTimeRangeKey: 'blender-capability',
    selectedTimeRange: defaultTimeRange()
  },

  actions: {
    async selectTimeRange({ commit }, key) {
      commit('SET_CURRENT_TIME_KEY', key)
      commit('SET_CURRENT_TIME', key)
    },

    async onTimeRangeChanged({ commit, dispatch, state }, data) {
      switch (state.selectedTimeRangeKey) {
      default:
        break
      }
    }
  },

  mutations: {
    SET_LOADING_SYSTEM_STATES(state, isLoading) { state.loadingSystemStates = isLoading },
    
    SET_TARGET_RATES(state, data) { state.targetRates = data },

    SET_BLENDER_CAPABIITY_TIME_RANGE(state, data) { state.blenderCapabilityTimeRange = Object.assign({}, data) },

    SET_CURRENT_TIME_KEY(state, key) { state.selectedTimeRangeKey = key },
    SET_CURRENT_TIME(state, key) {
      switch (key) {
      case 'process-rate':
        state.selectedTimeRange = state.processRateTimeRange
        break
      default:
        break
      }
    }
  }
}

export default module