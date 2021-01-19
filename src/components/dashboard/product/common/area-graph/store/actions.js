export default (fetch) => {
  const getSeries = async ({ commit, dispatch, state }, payload) => {
    commit('SET_LOADING', true)

    try {
      const response = await fetch(payload)

      commit('LOADED', response.data.items)
    } catch (error) {
      console.log(error)
      commit('SET_LOADING', false)
    }
  }

  const updateTimeRange = async ({ commit, dispatch, state }, payload) => {
    commit('SET_TIME_RANGE', payload)
  }

  return {
    getSeries,
    updateTimeRange
  }
}
