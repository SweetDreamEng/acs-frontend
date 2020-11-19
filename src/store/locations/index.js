import locationAPI from '@/services/api/location'

const module = {
  namespaced: true,
  state: {
    data: [
      {
        id: 1,
        name: 'Location 1'
      }, {
        id: 2,
        name: 'Location 2'
      }, {
        id: 3,
        name: 'Location 3'
      }
    ],
    table_loading: false
  },

  actions: {
  },

  mutations: {
    SET_DATA(state, locations) {
      state.data = locations
    }
  },

  getters: {
    // zoneNames: (state) => {
    //   return state.data.map((zone) => zone.zoneName)
    // }
    // exZoneNames: (state, getters) => {
    //   const _zonesNames = getters.zoneNames

    //   _zonesNames.unshift('Not assigned')

    //   return _zonesNames
    // }
  }
}

export default module