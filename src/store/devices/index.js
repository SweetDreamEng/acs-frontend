const module = {
  namespaced: true,
  state: {
    data: [],                           // paginated devices fetched from backend

    numAdded: 0,                        // number of added devices when uploading devices in excel file
    numDuplicates: 0,                   // number of duplicate devices when uploading devices in excel file

    pageCount: 0,                       // total pages for devices
    page: 1,                            // current page of pagination

    error: null,
    table_loading: false,               // status of loading devices into the table
    button_loading: false,              // status of uploading devices from excel file
    activate_button_loading: false,     // status of activating SIM
    deactivate_button_loading: false    // status of deactivating SIM
  },

  actions: {
    getDevices({
      commit
    }, pageNum) {
      commit('SET_PAGINATION_DATA', {
        page: pageNum
      })
      commit('TABLE_LOAD')
      this.$axios.get(`/devices/${pageNum}`)
        .then((response) => {
          commit('TABLE_LOAD_CLEAR')
          commit('SET_PAGINATION_DATA', {
            pageCount: response.data.last_page
          })
          commit('customers/SET_CUSTOMERS', response.data.companies, { root: true })
          commit('machines/SET_MACHINES', response.data.machines, { root: true })
          commit('SET_DATA',
            response.data.devices.map((device) => {
              const o = Object.assign({}, device)

              o.device_status = false

              return o
            })
          )
        })
        .catch((error) => {
          console.log(error.response)
          // if (error.response.status === 401) {
          //   console.log(error.response.data)
          // } else if (error.response.status === 400) {
          //   console.log(error.response)
          //   commit('SET_ERROR', {
          //     'error': 'Validation error.'
          //   })
          // } else {
          //   commit('SET_ERROR', {
          //     'error': 'Server Error'
          //   })
          // }
        })
    },
    uploadDevices({
      commit
    }, myForm) {
      return new Promise((resolve, reject) => {
        commit('BUTTON_LOAD')
        this.$axios.post('/devices/upload', myForm)
          .then((response) => {
            commit('BUTTON_CLEAR')
            commit('SET_ADDED', response.data.numAdded)
            commit('SET_DUPLICATES', response.data.numDuplicates)
            resolve(response)
          })
          .catch((error) => {
            commit('BUTTON_CLEAR')
            if (error.response.status === 401) {
              console.log(error.response.data)
            } else if (error.response.status === 400) {
              console.log(error.response)
              commit('SET_ERROR', {
                'error': 'Validation error.'
              })
            } else {
              commit('SET_ERROR', {
                'error': 'Server Error'
              })
            }
            reject(error)
          })
      })
    },
    activateSIM({
      commit
    }, device) {
    },
    deactivateSIM({
      commit
    }, device) {

    },
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    },
    resetStatus({ commit }) {
      commit('RESET_STATUS')
    }
  },

  mutations: {
    CLEAR_ERROR(state) {
      state.error = null
    },
    BUTTON_LOAD(state) {
      state.button_loading = true
    },
    BUTTON_CLEAR(state) {
      state.button_loading = false
    },
    TABLE_LOAD(state) {
      state.table_loading = true
    },
    TABLE_LOAD_CLEAR(state) {
      state.table_loading = false
    },
    SET_DATA(state, devices) {
      state.data = devices
    },
    SET_ADDED(state, numAdded) {
      state.numAdded = numAdded
    },
    SET_DUPLICATES(state, numDuplicates) {
      state.numDuplicates = numDuplicates
    },
    RESET_STATUS(state) {
      state.numAdded = 0
      state.numDuplicates = 0
    },
    SET_PAGINATION_DATA(state, data) {
      Object.assign(state, data)
    }
  },

  getters: {
  }
}

export default module