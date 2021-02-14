import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingDryingHoppers: false,
    loadingBedStates: false,

    dryingHoppers: {},
    bedStates: []
  },

  actions: {
    async getDryingHopperStats({ state, commit }, payload) {
      commit('SET_DRYING_HOPPERS', {})
      commit('SET_LOADING_DRYING_HOPPERS', true)

      try {
        const response = await api.getDryingHopperStats(payload)

        commit('SET_DRYING_HOPPERS', response.data.states)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_DRYING_HOPPERS', false)
      }
    },
    async getBedStates ({ state, commit }, payload) {
      commit('SET_LOADING_BED_STATES', true)

      try {
        const response = await api.getBedStates(payload)

        commit('SET_SET_BED_STATES', response.data.states)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_BED_STATES', false)
      }
    }
  },

  mutations: {
    SET_LOADING_DRYING_HOPPERS(state, isLoading) { state.loadingDryingHoppers = isLoading },
    SET_LOADING_BED_STATES(state, isLoading) { state.loadingBedStates = isLoading },

    SET_DRYING_HOPPERS(state, values) { state.dryingHoppers = values },
    SET_SET_BED_STATES(state, values) { state.bedStates = values }
  }
}

export default module