import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingPumpHours: false,
    pumpHours: [],

    loadingPumpHoursOil: false,
    actualPumpHoursOil: [],
    targetPumpHoursOil: []
  },

  actions: {
    async getPumpHoursOil({ state, commit }, id) {
      commit('SET_LOADING_PUMP_HOURS_OIL', true)

      try {
        const response = await api.getPumpHoursOil(id)

        commit('SET_ACTUAL_PUMP_OURS_OIL', response.data.actuals)
        commit('SET_TARGET_PUMP_OURS_OIL', response.data.targets)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_PUMP_HOURS_OIL', false)
      }
    },

    async getPumpHours({ state, commit }, id) {
      commit('SET_LOADING_PUMP_HOURS', true)

      try {
        const response = await api.getPumpHours(id)

        commit('SET_PUMP_HOURS', response.data.hours)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_PUMP_HOURS', false)
      }
    }
  },

  mutations: {
    SET_LOADING_PUMP_HOURS(state, loading) { state.loadingPumpHours = loading },
    SET_LOADING_PUMP_HOURS_OIL(state, loading) { state.loadingPumpHoursOil = loading },

    SET_PUMP_HOURS(state, hours) { state.pumpHours = hours },
    SET_ACTUAL_PUMP_OURS_OIL(state, hours) { state.actualPumpHoursOil = hours },
    SET_TARGET_PUMP_OURS_OIL(state, hours) { state.targetPumpHoursOil = hours }
  },

  getters: {
  }
}

export default module