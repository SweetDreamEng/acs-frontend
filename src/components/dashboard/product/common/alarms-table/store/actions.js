export default (fetch) => {
  const getProductAlarms = async ({ commit, dispatch, state }, payload) => {
    commit('SET_LOADING', true)

    try {
      const response = await fetch(payload)

      commit('SET_ALARMS', response.alarms)
      commit('SET_ALARM_TYPES', response.alarm_types)
    } catch (error) {
      console.log(error)
    }

    commit('SET_LOADING', false)
  }

  return {
    getProductAlarms
  }
}
