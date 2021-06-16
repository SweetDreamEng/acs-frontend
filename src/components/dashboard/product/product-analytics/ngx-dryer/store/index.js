import api from '../services/api'

const module = {
  namespaced: true,
  state: {
    loadingDryingHoppers: false,
    loadingBedStates: false,
    loadingOnlineHours: false,

    dryingHoppers: {},
    ngxHopperCount: 0,
    bedStates: [],
    onlineHours: []
  },

  actions: {
    async getDryingHopperStats({ state, commit }, payload) {
      commit('SET_DRYING_HOPPERS', {})
      commit('SET_NGX_HOPPER_COUNT', 0)
      commit('SET_LOADING_DRYING_HOPPERS', true)

      try {
        const response = await api.getDryingHopperStats(payload)

        commit('SET_DRYING_HOPPERS', response.data.states)
        commit('SET_NGX_HOPPER_COUNT', response.data.numberOfHoppers)
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
    },
    async getOnlineHours ({ state, commit }, payload) {
      commit('SET_LOADING_ONLINE_HOURS', true)

      try {
        const response = await api.getOnlineHours(payload)

        commit('SET_SET_ONLINE_HOURS', response.data.hours)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_ONLINE_HOURS', false)
      }
    }
  },

  mutations: {
    SET_LOADING_DRYING_HOPPERS(state, isLoading) { state.loadingDryingHoppers = isLoading },
    SET_LOADING_BED_STATES(state, isLoading) { state.loadingBedStates = isLoading },
    SET_LOADING_ONLINE_HOURS(state, isLoading) { state.loadingOnlineHours = isLoading },

    SET_DRYING_HOPPERS(state, values) { state.dryingHoppers = values },
    SET_NGX_HOPPER_COUNT(state, values) { state.ngxHopperCount = values },
    SET_SET_BED_STATES(state, values) { state.bedStates = values },
    SET_SET_ONLINE_HOURS(state, values) { state.onlineHours = values }
  }
}

export default module