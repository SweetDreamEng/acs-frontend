import api from '@/api.js'
export default (fetch) => {
  const getOverview = async ({ commit, dispatch, state }, payload) => {
    commit('SET_LOADING', true)

    try {
      const response = await fetch(payload)

      commit('LOADED', response.data.overview)
    } catch (error) {
      console.log(error)
      commit('SET_LOADING', false)
    }
  }

  const saveMachine = async ({ commit, dispatch }, payload) => {
    try {
      const response = await api.post('/analytics/save-machine', payload)

      commit('SET_SAVED_MACHINE_STATUS', response.data.status)
      dispatch('app/showSuccess', response.data.message, { root: true })
    } catch (error) {
      console.log(error)
    }
  }
  
  return {
    getOverview,
    saveMachine
  }
}
