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
    extendedLocations: (state) => {
      const _locations = state.data.slice()

      _locations.unshift({
        id: 0,
        name: 'Not Assigned'
      })

      return _locations
    }
  }
}

export default module