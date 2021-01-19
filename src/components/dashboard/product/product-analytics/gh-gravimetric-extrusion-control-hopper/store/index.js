import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingSystemStates: false,
    systemStates: {}
  },

  actions: {
    async getMachineStates ({ state, commit }, id) {
      commit('SET_LOADING_SYSTEM_STATES', true)

      try {
        const response = await api.getMachineStates(id)

        commit('SET_SYSTEM_STATES', response.data.machine_states)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_SYSTEM_STATES', false)
      }
    }
  },

  mutations: {
    SET_LOADING_SYSTEM_STATES(state, isLoading) { state.loadingSystemStates = isLoading },
    SET_SYSTEM_STATES(state, data) { state.systemStates = data }
  }
}

export default module