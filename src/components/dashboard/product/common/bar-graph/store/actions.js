export default (fetch) => {
  const getSeries = async ({ commit, dispatch, state }, payload) => {
    commit('SET_LOADING', true)

    try {
      const response = await fetch(payload)

      commit('LOADED', response.data)
    } catch (error) {
      console.log(error)
      commit('SET_LOADING', false)
    }
  }
  
  return {
    getSeries
  }
}
