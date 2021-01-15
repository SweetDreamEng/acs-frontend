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
    // loadingInventories: false,
    // inventories: [],

    loadingActTgtTemperatures: false,
    actTgtTemperatures: [],

    selectedTimeRangeKey: 'actual-target-temperature',
    selectedTimeRange: defaultTimeRange()
  },

  actions: {
    async getActTgtTemperatures({ state, commit }, id) {
      commit('SET_LOADING_TEMPERATURES', true)

      try {
        const response = await api.getActTgtTemperatures(id)

        commit('SET_ACTUAL_TARGET_TEMPERATURES', response.data.temps)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_TEMPERATURES', false)
      }
    },

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
    SET_LOADING_TEMPERATURES(state, isLoading) { state.loadingActTgtTemperatures = isLoading },

    SET_ACTUAL_TARGET_TEMPERATURES(state, temps) { state.actTgtTemperatures = temps },

    SET_CURRENT_TIME_KEY(state, key) { state.selectedTimeRangeKey = key },
    SET_CURRENT_TIME(state, key) {
      switch (key) {
      default:
        break
      }
    }
  }
}

export default module