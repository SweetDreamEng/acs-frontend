import locationAPI from '../../services/api/location'

const module = {
  namespaced: true,
  state: {
    data: [],

    tableLoading: false,
    btnLoading: false
  },

  actions: {
    async getLocations({
      commit
    }) {
      commit('TABLE_LOAD')

      try {
        const response = await locationAPI.getLocations()

        commit('SET_DATA', response.locations)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('TABLE_LOADED')
      }
    },
    async addLocation({
      commit
    }, data) {
      commit('BTN_LOAD')

      try {
        const response = await locationAPI.addLocation(data)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('BTN_LOADED')
      }
    },
    async updateLocation({
      commit
    }, data) {
      commit('BTN_LOAD')

      try {
        const response = await locationAPI.updateLocation(data)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('BTN_LOADED')
      }
    }
  },

  mutations: {
    TABLE_LOAD(state) {
      state.tableLoading = true
    },
    TABLE_LOADED(state) {
      state.tableLoading = false
    },
    BTN_LOAD(state) {
      state.btnLoading = true
    },
    BTN_LOADED(state) {
      state.btnLoading = false
    },
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
    },
    locationName: (state) => (id) => {
      const _location = state.data.find((location) => location.id === id)

      return _location ? _location.name : 'Not Assigned'
    }
  }
}

export default module