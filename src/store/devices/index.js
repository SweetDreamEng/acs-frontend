import deviceAPI from '@/services/api/device'

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
    import_btn_loading: false,          // status of uploading devices
    refresh_btn_loading: false,         // status of refreshing SIM
    activate_button_loading: false,     // status of activating SIM
    suspend_btn_loading: false,         // status of deactivating SIM
    remote_web_btn_loading: false,         // status of Remote WebUI
    remote_cli_btn_loading: false,         // status of Remote CLI
    assign_loading: false,              // status of uploading devices from excel file
    register_button_loading: false
  },

  actions: {
    getDevices({
      commit
    }, pageNum) {
      commit('SET_PAGINATION_DATA', {
        page: pageNum
      })
      commit('TABLE_LOAD')

      return new Promise((resolve, reject) => {
        deviceAPI.getDevices(pageNum)
          .then((response) => {
            commit('SET_PAGINATION_DATA', {
              pageCount: response.data.last_page
            })
            commit('customers/SET_CUSTOMERS', response.data.companies, { root: true })
            commit('machines/SET_MACHINES', response.data.machines, { root: true })
            commit('SET_DATA', response.data.devices)
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
          .finally(() => {
            commit('TABLE_LOAD_CLEAR')
          })
      })
    },
    importDevices({
      commit
    }) {
      commit('IMPORT_BUTTON_LOAD')
      
      return new Promise((resolve, reject) => {
        deviceAPI.importDevices()
          .then((response) => {
            commit('SET_ADDED', response.data.numAdded)
            commit('SET_DUPLICATES', response.data.numDuplicates)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
            commit('IMPORT_BUTTON_CLEAR')
          })
      })
    },
    deviceAssigned({
      commit, dispatch
    }, data) {
      commit('ASSIGN_LOAD')

      return new Promise((resolve, reject) => {
        deviceAPI.deviceAssigned(data)
          .then((response) => {
            commit('DEVICE_ASSIGN', data)
            // dispatch('app/showSuccess', response.data, { root: true })
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
          .finally(() => {
            commit('ASSIGN_CLEAR')
          })
      })
    },
    updateRegistered({
      commit, dispatch
    }, data) {
      commit('REGISTER_BTN_LOAD')

      return new Promise((resolve, reject) => {
        deviceAPI.updateRegistered(data)
          .then((response) => {
            commit('SET_REGISTERED', data)
            // dispatch('app/showSuccess', response.data, { root: true })
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
          .finally(() => {
            commit('REGISTER_BTN_CLEAR')
          })
      })
    },

    getCustomerDevices({
      commit
    }) {
      commit('TABLE_LOAD')

      return new Promise((resolve, reject) => {
        deviceAPI.getCustomerDevices()
          .then((response) => {
            commit('SET_DATA', response.data.devices)
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
          .finally(() => {
            commit('TABLE_LOAD_CLEAR')
          })
      })
    },
    querySIM({
      commit
    }, device) {
      commit('QUERY_BTN_LOAD')

      return new Promise((resolve, reject) => {
        deviceAPI.querySIM(device)
          .then((response) => {
            commit('SET_DEVICE_STATUS', {
              device_id: response.data.id,
              status: response.data.sim_status
            })
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
          .finally(() => {
            commit('QUERY_BTN_CLEAR')
          })
      })
    },
    activateSIM({
      commit
    }, device) {
    },
    suspendSIM({
      commit, dispatch
    }, device) {
      commit('SUSPEND_BTN_LOAD')

      return new Promise((resolve, reject) => {
        deviceAPI.suspendSIM(device)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
          .finally(() => {
            commit('SUSPEND_BTN_CLEAR')
          })
      })
    },
    remoteWeb({
      commit, dispatch
    }, device) {
      commit('REMOTE_WEB_BTN_LOAD')

      return new Promise((resolve, reject) => {
        deviceAPI.remoteWeb(device)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
          .finally(() => {
            commit('REMOTE_WEB_BTN_CLEAR')
          })
      })
    },
    remoteCli({
      commit, dispatch
    }, device) {
      commit('REMOTE_CLI_BTN_LOAD')

      return new Promise((resolve, reject) => {
        deviceAPI.remoteCli(device)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
          .finally(() => {
            commit('REMOTE_CLI_BTN_CLEAR')
          })
      })
    },
    publicIp({
      commit, dispatch
    }, device) {
      return new Promise((resolve, reject) => {
        deviceAPI.publicIp(device)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error)
          })
      })
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
    IMPORT_BUTTON_LOAD(state) {
      state.import_btn_loading = true
    },
    IMPORT_BUTTON_CLEAR(state) {
      state.import_btn_loading = false
    },
    ASSIGN_LOAD(state) {
      state.assign_loading = true
    },
    ASSIGN_CLEAR(state) {
      state.assign_loading = false
    },
    TABLE_LOAD(state) {
      state.table_loading = true
    },
    TABLE_LOAD_CLEAR(state) {
      state.table_loading = false
    },
    REGISTER_BTN_LOAD(state) {
      state.register_button_loading = true
    },
    REGISTER_BTN_CLEAR(state) {
      state.register_button_loading = false
    },
    QUERY_BTN_LOAD(state) {
      state.refresh_btn_loading = true
    },
    QUERY_BTN_CLEAR(state) {
      state.refresh_btn_loading = false
    },
    ACTIVATE_BTN_LOAD(state) {
      state.activate_button_loading = true
    },
    ACTIVATE_BTN_CLEAR(state) {
      state.activate_button_loading = false
    },
    SUSPEND_BTN_LOAD(state) {
      state.suspend_btn_loading = true
    },
    SUSPEND_BTN_CLEAR(state) {
      state.suspend_btn_loading = false
    },
    REMOTE_WEB_BTN_LOAD(state) {
      state.remote_web_btn_loading = true
    },
    REMOTE_WEB_BTN_CLEAR(state) {
      state.remote_web_btn_loading = false
    },
    REMOTE_CLI_BTN_LOAD(state) {
      state.remote_cli_btn_loading = true
    },
    REMOTE_CLI_BTN_CLEAR(state) {
      state.remote_cli_btn_loading = false
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
    DEVICE_ASSIGN(state, data) {
      const _device = state.data.find((device) => device.id === data.device_id)
      
      _device.company_id = data.company_id
      _device.machine_id = data.machine_id
    },
    SET_REGISTERED(state, data) {
      const _device = state.data.find((device) => device.id === data.device_id)
      
      _device.registered = data.register
    },
    SET_DEVICE_STATUS(state, data) {
      const _device = state.data.find((device) => device.id === data.device_id)
      
      _device.sim_status = data.status
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