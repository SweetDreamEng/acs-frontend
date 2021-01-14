import deviceAPI from '@/services/api/device'

const module = {
  namespaced: true,
  state: {
    data: [],                           // paginated devices fetched from backend
    totalDevices: 0,

    numAdded: 0,                        // number of added devices when uploading devices in excel file
    numDuplicates: 0,                   // number of duplicate devices when uploading devices in excel file

    pageCount: 0,                       // total pages for devices
    page: 1,                            // current page of pagination
    pageCountReport: 0,
    pageReport: 1,

    error: null,
    table_loading: false,               // status of loading devices into the table
    import_btn_loading: false,          // status of uploading devices
    refresh_btn_loading: false,         // status of refreshing SIM
    activate_button_loading: false,     // status of activating SIM
    suspend_btn_loading: false,         // status of deactivating SIM
    remote_web_btn_loading: false,         // status of Remote WebUI
    remote_cli_btn_loading: false,         // status of Remote CLI
    assign_loading: false,              // status of uploading devices from excel file
    register_button_loading: false,
    loadingTableMachineMapping: false,
    loadingBtnAssignZoneToMachine: false,
    loadingDashboardDevicesTable: false,    //Devices table loading value in ACS dashboard and user dashboard pages

    downtimePlanBtnLoading: false,
    downtimePlansTableLoading: false,
    downtimePlans: []
  },

  actions: {
    async getDevices({
      commit
    }, { filterForm, page }) {
      commit('SET_PAGINATION_DATA', {
        page: page
      })
      commit('TABLE_LOAD')

      try {
        const response = await deviceAPI.getDevices(filterForm, page)

        commit('SET_PAGINATION_DATA', {
          pageCount: response.data.last_page
        })
        commit('customers/SET_CUSTOMERS', response.data.companies, { root: true })
        commit('SET_DATA', response.data.devices)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('TABLE_LOAD_CLEAR')
      }
    },

    async getAllDevices({
      commit
    }) {
      try {
        const response = await deviceAPI.getAllDevices()

        commit('SET_DATA', response.data.devices)
      } catch (error) {
        console.log(error)
      }
    },

    async importDevices({
      commit, dispatch
    }) {
      commit('IMPORT_BUTTON_LOAD')

      try {
        const response = await deviceAPI.importDevices()

        const addedCount = response.data.numAdded
        const txtNotofication = addedCount === 0 ? 'No device imported' : `${addedCount} devices imported`

        dispatch('app/showSuccess', txtNotofication, { root: true })
        commit('SET_ADDED', response.data.numAdded)
        commit('SET_DUPLICATES', response.data.numDuplicates)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('IMPORT_BUTTON_CLEAR')
      }
    },
    async deviceAssigned({
      commit, dispatch
    }, data) {
      commit('ASSIGN_LOAD')

      try {
        const response = await deviceAPI.deviceAssigned(data)

        commit('DEVICE_ASSIGN', data)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('ASSIGN_CLEAR')
      }
    },
    async updateRegistered({
      commit, dispatch
    }, data) {
      commit('REGISTER_BTN_LOAD')

      try {
        const response = await deviceAPI.updateRegistered(data)

        commit('SET_REGISTERED', data)
        dispatch('app/showSuccess', response.data, { root: true })
      } catch (error) {
        console.log(error.response)
        dispatch('app/showError', {
          error: error.response.data
        }, { root: true })
      } finally {
        commit('REGISTER_BTN_CLEAR')
      }
    },

    async getCustomerDevices({
      commit
    }) {
      commit('SET_LOADING_TABLE_MACHINE_MAPPING', true)

      try {
        const response = await deviceAPI.getCustomerDevices()

        commit('SET_DATA', response.data.devices)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SET_LOADING_TABLE_MACHINE_MAPPING', false)
      }
    },

    // Get devices with analytics in dashboard page
    async getDevicesAnalytics({ commit }, { page = 1, location_id = 0, itemsPerPage = 5 }) {
      commit('SET_LOADING_DASHBOARD_DEVICES_TABLE', true)
      commit('SET_DATA', [])

      try {
        const data = {
          itemsPerPage,
          page,
          location_id
        }
        const response = await deviceAPI.getDevicesAnalytics(data)

        commit('SET_DATA', response.data.devices.data)
        commit('SET_REPORT_PAGINATION', response.data.devices.last_page)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SET_LOADING_DASHBOARD_DEVICES_TABLE', false)
      }
    },

    async assignZoneToDevice({
      commit, dispatch
    }, data) {
      commit('SET_LOADING_BTN_ASSIGN_ZONE_TO_MACHINE', true)

      try {
        const response = await deviceAPI.assignZoneToDevice(data)

        dispatch('app/showSuccess', response.data, { root: true })
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SET_LOADING_BTN_ASSIGN_ZONE_TO_MACHINE', false)
      }
    },

    async querySIM({
      commit
    }, device) {
      commit('QUERY_BTN_LOAD')

      try {
        const response = await deviceAPI.querySIM(device)

        commit('SET_DEVICE_STATUS', {
          device_id: response.data.id,
          status: response.data.sim_status
        })
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('QUERY_BTN_CLEAR')
      }
    },
    activateSIM({
      commit
    }, device) {
    },
    async suspendSIM({
      commit, dispatch
    }, device) {
      commit('SUSPEND_BTN_LOAD')

      try {
        const response = await deviceAPI.suspendSIM(device)
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SUSPEND_BTN_CLEAR')
      }
    },
    async remoteWeb({
      commit, dispatch
    }, device) {
      commit('REMOTE_WEB_BTN_LOAD')

      try {
        const response = await deviceAPI.remoteWeb(device)

        return response
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('REMOTE_WEB_BTN_CLEAR')
      }
    },
    async remoteCli({
      commit, dispatch
    }, device) {
      commit('REMOTE_CLI_BTN_LOAD')

      try {
        const response = await deviceAPI.remoteCli(device)

        return response
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('REMOTE_CLI_BTN_CLEAR')
      }
    },
    async getDowntimePlans({
      commit
    }) {
      commit('SET_DOWNTIME_PLANS_TABLE_LOADING', true)

      try {
        const response = await deviceAPI.getDowntimePlans()

        commit('SET_DOWNTIME_PLANS', response.data.downtimePlans)
        commit('machines/SET_MACHINES', response.data.machines, { root: true })
      } catch (error) {
        console.log(error.response)
      } finally {
        commit('SET_DOWNTIME_PLANS_TABLE_LOADING', false)
      }
    },

    async updateDowntimePlan({
      state, commit, dispatch
    }, { data, id }) {
      commit('SET_DOWNTIME_PLAN_BTN_LOADING', true)

      try {
        const response = await deviceAPI.updateDowntimePlan(data, id)

        dispatch('app/showSuccess', response.data, { root: true })
      } catch (error) {
        console.log(error)
        dispatch('app/showError', {
          error: error.response.data
        }, { root: true })
      } finally {
        commit('SET_DOWNTIME_PLAN_BTN_LOADING', false)
      }
    },

    async addDowntimePlan({
      state, commit, dispatch
    }, data) {
      commit('SET_DOWNTIME_PLAN_BTN_LOADING', true)

      try {
        const response = await deviceAPI.addDowntimePlan(data)

        dispatch('app/showSuccess', response.data, { root: true })
      } catch (error) {
        console.log(error)
        dispatch('app/showError', {
          error: error.response.data
        }, { root: true })
      } finally {
        commit('SET_DOWNTIME_PLAN_BTN_LOADING', false)
      }
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
    SET_LOADING_TABLE_MACHINE_MAPPING(state, data) {
      state.loadingTableMachineMapping = data
    },
    SET_LOADING_DASHBOARD_DEVICES_TABLE(state, data) {
      state.loadingDashboardDevicesTable = data
    },
    SET_LOADING_BTN_ASSIGN_ZONE_TO_MACHINE(state, data) {
      state.loadingBtnAssignZoneToMachine = data
    },
    SET_DOWNTIME_PLANS_TABLE_LOADING(state, data) {
      state.downtimePlansTableLoading = data
    },
    SET_DOWNTIME_PLAN_BTN_LOADING(state, data) {
      state.downtimePlanBtnLoading = data
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
    SET_TOTAL_DEVICES(state, total) {
      state.totalDevices = total
    },
    SET_PAGE_COUNT(state, count) {
      state.pageCount = count
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
    },
    SET_REPORT_PAGINATION(state, count) { state.pageCountReport = count },
    SET_DOWNTIME_PLANS(state, plans) { state.downtimePlans = plans }
  },

  getters: {
  }
}

export default module