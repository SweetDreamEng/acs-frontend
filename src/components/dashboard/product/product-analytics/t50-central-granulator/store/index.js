import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingT50Runnings: false,
    loadingT50Hours: false,

    t50Runnings: [],
    t50Hours: []
  },

  actions: {
    async getRunnings({ state, commit }, payload) {
      commit('SET_LOADING_RUNNINGS', true)

      try {
        const response = await api.getRunnings(payload)

        commit('SET_RUNNINGS', response.data.states)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_RUNNINGS', false)
      }
    },

    async getHours({ state, commit }, payload) {
      commit('SET_LOADING_HOURS', true)

      try {
        const response = await api.getHours(payload)

        commit('SET_HOURS', response.data.hours)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_HOURS', false)
      }
    }
  },

  mutations: {
    SET_LOADING_RUNNINGS(state, isLoading) { state.loadingT50Runnings = isLoading },
    SET_LOADING_HOURS(state, isLoading) { state.loadingT50Hours = isLoading },

    SET_RUNNINGS(state, values) { state.t50Runnings = values },
    SET_HOURS(state, values) { state.t50Hours = values }
  }
}

export default module