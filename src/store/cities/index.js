import cityAPI from '@/services/api/city'

const module = {
  namespaced: true,
  state: {
    data: []
  },

  actions: {
    async getCities({
      commit, dispatch
    }, state) {
      try {
        const response = await cityAPI.getCities(state)

        commit('cities/SET_DATA', response.data, { root: true })

        return response
      } catch (error) {
        console.log(error)
      }
    }
  },

  mutations: {
    SET_DATA(state, cities) {
      state.data = cities
    }
  }
}

export default module