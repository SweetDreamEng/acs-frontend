export default (fetch) => {
  const getSeries = async ({ commit, dispatch, state }, { productId = 0 }) => {
    commit('SET_LOADING', true)

    try {
      const response = await fetch(productId)

      commit('LOADED', response.data.items)
    } catch (error) {
      console.log(error)
      commit('SET_LOADING', false)
    }
  }
  
  return {
    getSeries
  }
}
