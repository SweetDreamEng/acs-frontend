const module = {
  namespaced: true,
  state: {
    data: [
      {
        id: 1,
        zoneName: 'Zone 1',
        divisionId: 0
      },
      {
        id: 2,
        zoneName: 'Zone 2',
        divisionId: 0
      },
      {
        id: 3,
        zoneName: 'Zone 3',
        divisionId: 0
      },
      {
        id: 4,
        zoneName: 'Zone 4',
        divisionId: 0
      },
      {
        id: 5,
        zoneName: 'Zone 5',
        divisionId: 0
      }
    ]
  },

  actions: {
  },

  mutations: {
  },

  getters: {
    zoneNames: (state) => {
      return state.data.map((zone) => zone.zoneName)
    },
    exZoneNames: (state, getters) => {
      const _zonesNames = getters.zoneNames

      _zonesNames.unshift('Not assigned')

      return _zonesNames
    }
  }
}

export default module