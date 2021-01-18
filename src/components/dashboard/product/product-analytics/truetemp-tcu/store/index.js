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
    loadingOverview: false,
    overview: {},
    
    loadingMachineState: false,
    machineState: {},

    selectedTimeRangeKey: 'actual-target-temperature',
    selectedTimeRange: defaultTimeRange()
  },

  actions: {
    async getOverview ({ commit }, { id, isAdditional }) {
      commit('SET_OVERVIEW', {})
      commit('SET_LOADING_OVERVIEW', true)

      try {
        const data = {
          id,
          isAdditional
        }
        const response = await api.getOverview(data)

        commit('SET_OVERVIEW', response.data.overview)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_OVERVIEW', false)
      }
    },
    async getSystemStates({ state, commit }, { id, isAdditional }) {
      commit('SET_LOADING_SYSTEM_STATES', true)

      try {
        const response = await api.getSystemStates({
          id,
          isAdditional
        })

        commit('SET_SYSTEM_STATES', response.data.machine_states)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_SYSTEM_STATES', false)
      }
    }
  },

  mutations: {
    SET_LOADING_OVERVIEW(state, isLoading) { state.loadingOverview = isLoading },
    SET_LOADING_SYSTEM_STATES(state, data) { state.loadingMachineState = data },

    SET_OVERVIEW(state, overview) { state.overview = overview },
    SET_SYSTEM_STATES(state, data) { state.machineState = data }
  }
}

export default module