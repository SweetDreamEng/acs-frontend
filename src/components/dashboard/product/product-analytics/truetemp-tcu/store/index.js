import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingMachineState: false,
    machineState: {}
  },

  actions: {
    async getSystemStates({ state, commit }, payload) {
      commit('SET_LOADING_SYSTEM_STATES', true)

      try {
        const response = await api.getSystemStates(payload)

        commit('SET_SYSTEM_STATES', response.data.machine_states)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_SYSTEM_STATES', false)
      }
    }
  },

  mutations: {
    SET_LOADING_SYSTEM_STATES(state, data) { state.loadingMachineState = data },
    SET_SYSTEM_STATES(state, data) { state.machineState = data }
  }
}

export default module