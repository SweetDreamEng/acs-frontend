import cityAPI from '../../services/api/city'

const module = {
  namespaced: true,
  state: {
    loadingCities: false,
    data: []
  },

  actions: {
    async getCities({
      commit, dispatch
    }, state) {
      try {
        commit('SET_LOADING_CITIES', true)
        const response = await cityAPI.getCities(state)

        commit('SET_DATA', response)
      } catch (error) {
        console.log(error)
      }

      commit('SET_LOADING_CITIES', false)
    }
  },

  mutations: {
    SET_DATA(state, cities) { state.data = cities },
    SET_LOADING_CITIES(state, loading) { state.loadingCities = loading }
  }
}

export default module