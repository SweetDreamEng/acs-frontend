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
    loadingProcessRate: false,
    processRateSeries: [],
    processRateTimeRange: defaultTimeRange(),

    selectedTimeRangeKey: 'blender-capability',
    selectedTimeRange: defaultTimeRange()
  },

  actions: {
    async getProductionRate({ state, commit }, id) {
      commit('SET_PROCESS_RATE_SERIES', [])
      commit('SET_LOADING_PROCESS_RATE', true)

      try {
        const response = await api.getProductionRate({
          id: id,
          timeRange: state.processRateTimeRange
        })

        commit('SET_PROCESS_RATE_SERIES', response.data.process_rate)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_PROCESS_RATE', false)
      }
    },

    async selectTimeRange({ commit }, key) {
      commit('SET_CURRENT_TIME_KEY', key)
      commit('SET_CURRENT_TIME', key)
    },

    async onTimeRangeChanged({ commit, dispatch, state }, data) {
      switch (state.selectedTimeRangeKey) {
      case 'process-rate':
        commit('SET_PROCESS_RATE_TIME_RANGE', data)
        dispatch('getProductionRate', data.id)
        break
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