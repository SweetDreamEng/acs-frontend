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
    table_loading: false,
    btn_loading: false
  },

  actions: {
    getLocations({
      commit
    }) {
      commit('TABLE_LOAD')

      return new Promise((resolve, reject) => {
        locationAPI.getLocations()
          .then((response) => {
            commit('SET_DATA', response.data)
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
          .finally(() => {
            commit('TABLE_LOADED')
          })
      })
    },
    addLocation({
      commit
    }, data) {
      commit('BTN_LOAD')

      return new Promise((resolve, reject) => {
        locationAPI.addLocation(data)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
          .finally(() => {
            commit('BTN_LOADED')
          })
      })
    },
    updateLocation({
      commit
    }, data) {
      commit('BTN_LOAD')

      return new Promise((resolve, reject) => {
        locationAPI.updateLocation(data)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
          .finally(() => {
            commit('BTN_LOADED')
          })
      })
    }
  },

  mutations: {
    TABLE_LOAD(state) {
      state.table_loading = true
    },
    TABLE_LOADED(state) {
      state.table_loading = false
    },
    BTN_LOAD(state) {
      state.btn_loading = true
    },
    BTN_LOADED(state) {
      state.btn_loading = false
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
        location: 'Not Assigned'
      })

      return _locations
    }
  }
}

export default module