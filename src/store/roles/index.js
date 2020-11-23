const module = {
  namespaced: true,
  state: {
    data: []
  },

  actions: {
  },

  mutations: {
    SET_DATA(state, roles) {
      state.data = roles
    }
  }
}

export default module