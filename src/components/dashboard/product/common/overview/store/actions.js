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
  
  return {
    getOverview
  }
}
