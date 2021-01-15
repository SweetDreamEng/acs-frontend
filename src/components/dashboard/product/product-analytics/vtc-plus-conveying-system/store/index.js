import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingPumpHours: false,
    pumpHours: [],

    loadingPumpHoursOil: false,
    actualPumpHoursOil: [],
    targetPumpHoursOil: [],

    loadingPumpOnlines: false,
    pumpOnlines: [],

    loadingPumpBlowBacks: false,
    pumpBlowBacks: []
  },

  actions: {
    async getPumpHoursOil({ state, commit }, id) {
      commit('SET_ACTUAL_PUMP_OURS_OIL', [])
      commit('SET_TARGET_PUMP_OURS_OIL', [])
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
      commit('SET_PUMP_HOURS', [])
      commit('SET_LOADING_PUMP_HOURS', true)

      try {
        const response = await api.getPumpHours(id)

        commit('SET_PUMP_HOURS', response.data.hours)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_PUMP_HOURS', false)
      }
    },

    async getPumpOnlines({ state, commit }, id) {
      commit('SET_ONLINES', [])
      commit('SET_LOADING_PUMP_ONLINES', true)

      try {
        const response = await api.getPumpOnlines(id)

        commit('SET_ONLINES', response.data.onlines)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_PUMP_ONLINES', false)
      }
    },

    async getPumpBlowBacks({ state, commit }, id) {
      commit('SET_BLOWBACKS', [])
      commit('SET_LOADING_PUMP_BLOWBACKS', true)

      try {
        const response = await api.getPumpBlowBacks(id)

        commit('SET_BLOWBACKS', response.data.blowbacks)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_PUMP_BLOWBACKS', false)
      }
    }
  },

  mutations: {
    SET_LOADING_PUMP_HOURS(state, loading) { state.loadingPumpHours = loading },
    SET_LOADING_PUMP_HOURS_OIL(state, loading) { state.loadingPumpHoursOil = loading },
    SET_LOADING_PUMP_ONLINES(state, loading) { state.loadingPumpOnlines = loading },
    SET_LOADING_PUMP_BLOWBACKS(state, loading) { state.loadingPumpBlowBacks = loading },

    SET_PUMP_HOURS(state, hours) { state.pumpHours = hours },
    SET_ACTUAL_PUMP_OURS_OIL(state, hours) { state.actualPumpHoursOil = hours },
    SET_TARGET_PUMP_OURS_OIL(state, hours) { state.targetPumpHoursOil = hours },
    SET_ONLINES(state, onlines) { state.pumpOnlines = onlines },
    SET_BLOWBACKS(state, blowBacks) { state.pumpBlowBacks = blowBacks }
  },

  getters: {
  }
}

export default module