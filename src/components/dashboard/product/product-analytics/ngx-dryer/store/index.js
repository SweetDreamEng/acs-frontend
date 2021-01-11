import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingDryingHoppers: false,
    loadingTemperatures: false,

    dryingHoppers: {},
    inletTemperatures: [],
    targetTemperatures: [],
    outletTemperatures: []
  },

  actions: {
    async getDryingHopperStats({ state, commit }, id) {
      commit('SET_DRYING_HOPPERS', {})
      commit('SET_LOADING_DRYING_HOPPERS', true)

      try {
        const response = await api.getDryingHopperStats(id)

        commit('SET_DRYING_HOPPERS', response.data.states)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_DRYING_HOPPERS', false)
      }
    },
    async getHopperTemperatures ({ state, commit }, id) {
      commit('SET_INLET_TEMPERATURE', [])
      commit('SET_OUTLET_TEMPERATURE', [])
      commit('SET_SET_TEMPERATURE', [])
      commit('SET_LOADING_TEMPERATURES', true)

      try {
        const response = await api.getHopperTemperatures(id)

        commit('SET_INLET_TEMPERATURE', response.data.inlets)
        commit('SET_OUTLET_TEMPERATURE', response.data.targets)
        commit('SET_SET_TEMPERATURE', response.data.outlets)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_TEMPERATURES', false)
      }
    }
  },

  mutations: {
    SET_LOADING_DRYING_HOPPERS(state, isLoading) { state.loadingDryingHoppers = isLoading },
    SET_LOADING_TEMPERATURES(state, isLoading) { state.loadingTemperatures = isLoading },

    SET_DRYING_HOPPERS(state, values) { state.dryingHoppers = values },
    SET_INLET_TEMPERATURE(state, values) { state.inletTemperatures = values },
    SET_OUTLET_TEMPERATURE(state, values) { state.outletTemperatures = values },
    SET_SET_TEMPERATURE(state, values) { state.targetTemperatures = values }
  }
}

export default module