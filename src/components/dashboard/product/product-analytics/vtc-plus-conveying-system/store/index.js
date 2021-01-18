import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingPumpOnlines: false,
    pumpOnlines: [],

    loadingPumpBlowBacks: false,
    pumpBlowBacks: []
  },

  actions: {
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
    SET_LOADING_PUMP_ONLINES(state, loading) { state.loadingPumpOnlines = loading },
    SET_LOADING_PUMP_BLOWBACKS(state, loading) { state.loadingPumpBlowBacks = loading },

    SET_ONLINES(state, onlines) { state.pumpOnlines = onlines },
    SET_BLOWBACKS(state, blowBacks) { state.pumpBlowBacks = blowBacks }
  },

  getters: {
  }
}

export default module