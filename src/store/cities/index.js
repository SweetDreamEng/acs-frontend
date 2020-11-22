const module = {
  namespaced: true,
  state: {
    data: []
  },

  actions: {
  },

  mutations: {
    SET_DATA(state, cities) {
      state.data = cities
    }
  }
}

export default module