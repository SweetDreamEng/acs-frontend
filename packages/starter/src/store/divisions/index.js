const module = {
  namespaced: true,
  state: {
    data: [
      {
        id: 1,
        divisionName: 'Division 1'
      },
      {
        id: 2,
        divisionName: 'Division 2'
      },
      {
        id: 3,
        divisionName: 'Division 3'
      },
      {
        id: 4,
        divisionName: 'Division 4'
      },
      {
        id: 5,
        divisionName: 'Division 5'
      }
    ]
  },

  actions: {
  },

  mutations: {
  },

  getters: {
    divisionNames: (state) => {
      return state.data.map((division) => division.divisionName)
    },
    exDivisionNames: (state, getters) => {
      const _divisionsNames = getters.divisionNames

      _divisionsNames.unshift('Not assigned')

      return _divisionsNames
    }
  }
}

export default module