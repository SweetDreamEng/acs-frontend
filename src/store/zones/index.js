import zoneAPI from '@/services/api/zone'

const module = {
  namespaced: true,
  state: {
    data: [
      {
        id: 1,
        name: 'Zone 1'
      }, {
        id: 2,
        name: 'Zone 2'
      }, {
        id: 3,
        name: 'Zone 3'
      }
    ],
    table_loading: false
  },

  actions: {
    getZones({
      commit
    }) {
      commit('TABLE_LOAD')

      return new Promise((resolve, reject) => {
        zoneAPI.getZones()
          .then((response) => {
            commit('SET_DATA', response.data.zones)
            commit('locations/SET_DATA', response.data.locations, { root: true })
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
    }
  },

  mutations: {
    TABLE_LOAD(state) {
      state.table_loading = true
    },
    TABLE_LOADED(state) {
      state.table_loading = false
    },
    SET_DATA(state, zones) {
      state.data = zones
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