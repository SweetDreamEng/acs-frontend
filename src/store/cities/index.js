import cityAPI from '@/services/api/city'

const module = {
  namespaced: true,
  state: {
    data: []
  },

  actions: {
    getCities({
      commit, dispatch
    }, state) {
      return new Promise((resolve, reject) => {
        cityAPI.getCities(state).then((response) => {
          commit('cities/SET_DATA', response.data, { root: true })
          resolve(response)
        })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
          })
      })
    }
  },

  mutations: {
    SET_DATA(state, cities) {
      state.data = cities
    }
  }
}

export default module