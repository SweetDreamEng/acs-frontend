import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingStates: false,

    hopperStates: []
  },

  actions: {
    async getDryingHopperStates({ state, commit }, payload) {
      commit('SET_LOADING_DRYING_HOPPERS', true)

      try {
        const response = await api.getDryingHopperStates(payload)

        commit('SET_HOPPER_STATES', response.data.states)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_DRYING_HOPPERS', false)
      }
    }
  },

  mutations: {
    SET_LOADING_DRYING_HOPPERS(state, isLoading) { state.loadingStates = isLoading },

    SET_HOPPER_STATES(state, values) { state.hopperStates = values }
  }
}

export default module