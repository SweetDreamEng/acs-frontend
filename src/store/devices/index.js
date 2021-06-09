import deviceAPI from '../../services/api/device'

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

    isVisibleOnly: false,
    hiddenDevices: 0,
    loadingToggleActiveDevices: false,

    error: null,
    tableLoading: false,               // status of loading devices into the table
    importBtnLoading: false,          // status of uploading devices
    refreshBtnLoading: false,         // status of refreshing SIM
    activateButtonLoading: false,     // status of activating SIM
    suspendBtnLoading: false,         // status of deactivating SIM
    remoteWebBtnLoading: false,         // status of Remote WebUI
    remoteCliBtnLoading: false,         // status of Remote CLI
    assignLoading: false,              // status of uploading devices from excel file
    registerButtonLoading: false,
    loadingTableMachineMapping: false,
    loadingBtnAssignZoneToMachine: false,
    loadingDashboardDevicesTable: false,    //Devices table loading value in ACS dashboard and user dashboard pages
    loadingDashboardSavedMachinesTable: false,
    savedMachines: [],
    savedMachinesPageCountReport: 0,

    downtimePlanBtnLoading: false,
    downtimePlansTableLoading: false,
    downtimePlans: [],

    loadingDeviceConfig: false,
    sendingDeviceConfig: false,
    deviceConfiguration: {},

    isDowntimeGraphLoading: false,
    downtimeGraphData: [],
    downtimeGraphDate: [],
    availabilityGraphData: [],
    downtimeByTypeGraphSeries: [],
    isDowntimeByTypeGraphLoading: false,
    downtimeByReasonGraphSeries: [],
    isDowntimeByReasonGraphLoading: false,

    isDowntimeTableLoading: false,
    downtimeTableData: [],
    deviceInfo: [],
    downtimeTypes: [],
    locations: [],
    zones: [],
    downtimeReasons: [],
    isUpdatingDowntime: false
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
        commit('companies/SET_CUSTOMERS', response.data.companies, { root: true })
        commit('SET_CUSTOMER_DATA', response.data)
      } catch (error) {
        console.log(error)
      } finally {
        commit('TABLE_LOAD_CLEAR')
      }
    },

    /*
      description: get device configuration - configuration_id, tcu_added
    */
    async getDeviceConfiguration({
      commit
    }, id) {
      commit('SET_LOADING_DEVICE_CONFIGURATION', true)
      commit('SET_DEVICE_CONFIGURATION', {})
      commit('SET_ERROR', null)

      try {
        const response = await deviceAPI.getDeviceConfiguration(id)

        commit('SET_DEVICE_CONFIGURATION', response.data.configuration)
      } catch (error) {
        if (error.response.status === 404 && error.response.data.status === 'device_not_connected') {
          commit('SET_ERROR', {
            error: error.response.data
          })
        }
      } finally {
        commit('SET_LOADING_DEVICE_CONFIGURATION', false)
      }
    },

    async updateEnabledProperties({ commit }, payload) {
      try {
        await deviceAPI.updateEnabledProperties(payload)
      } catch (error) {
        console.log(error)
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
        console.log(error)
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
        console.log(error)
      } finally {
        commit('ASSIGN_CLEAR')
      }
    },

    async submitDeviceConfig({
      commit, dispatch
    }, data) {
      commit('SET_LOADING_DEVICE_CONFIG', true)

      try {
        const response = await deviceAPI.submitDeviceConfig(data)

        dispatch('app/showSuccess', response.data, { root: true })
      } catch (error) {
        console.log(error)
        dispatch('app/showError', {
          error: error.response.data
        }, { root: true })
      } finally {
        commit('SET_LOADING_DEVICE_CONFIG', false)
      }
    },

    async getCustomerDevices({
      commit
    }) {
      commit('SET_LOADING_TABLE_MACHINE_MAPPING', true)
      commit('SET_DATA', [])

      try {
        const response = await deviceAPI.getCustomerDevices()

        commit('SET_DATA', response.data.devices)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_TABLE_MACHINE_MAPPING', false)
      }
    },

    // Get devices with analytics in dashboard page
    async getDevicesAnalytics({ commit }, { page = 1, location_id = 0, itemsPerPage = 50, company_id = 0 }) {
      commit('SET_LOADING_DASHBOARD_DEVICES_TABLE', true)
      commit('SET_DATA', [])

      try {
        const data = {
          itemsPerPage,
          page,
          location_id,
          company_id
        }
        const response = await deviceAPI.getDevicesAnalytics(data)

        commit('SET_DATA', response.data.devices.data)
        commit('SET_REPORT_PAGINATION', response.data.devices.last_page)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_DASHBOARD_DEVICES_TABLE', false)
      }
    },

    async getSavedMachines({ commit }, { page = 1, location_id = 0, itemsPerPage = 10 }) {
      commit('SET_LOADING_SAVED_MACHINES', true)
      commit('SET_SAVED_MACHINES', [])

      try {
        const data = {
          itemsPerPage,
          page
        }
        const response = await deviceAPI.getSavedMachines(data)

        commit('SET_SAVED_MACHINES', response.data.devices.data)
        commit('SET_REPORT_SAVED_MACHINES_PAGINATION', response.data.devices.last_page)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_SAVED_MACHINES', false)
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
        console.log(error)
      } finally {
        commit('SET_LOADING_BTN_ASSIGN_ZONE_TO_MACHINE', false)
      }
    },

    async querySIM({
      commit
    }, iccid) {
      commit('QUERY_BTN_LOAD')

      try {
        const response = await deviceAPI.querySIM(iccid)

        commit('SET_DEVICE_STATUS', {
          device_id: response.data.id,
          status: response.data.sim_status
        })
      } catch (error) {
        console.log(error)
      } finally {
        commit('QUERY_BTN_CLEAR')
      }
    },
    async suspendSIM({
      commit, dispatch
    }, iccid) {
      commit('SUSPEND_BTN_LOAD')

      try {
        await deviceAPI.suspendSIM(iccid)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SUSPEND_BTN_CLEAR')
      }
    },

    async remoteWeb({
      commit, dispatch
    }, device_id) {
      commit('REMOTE_WEB_BTN_LOAD')

      try {
        const response = await deviceAPI.remoteWeb(device_id)

        return response
      } catch (error) {
        console.log(error)
      } finally {
        commit('REMOTE_WEB_BTN_CLEAR')
      }

      return null
    },

    async remoteCli({
      commit, dispatch
    }, device_id) {
      commit('REMOTE_CLI_BTN_LOAD')

      try {
        const response = await deviceAPI.remoteCli(device_id)

        return response
      } catch (error) {
        console.log(error)
      } finally {
        commit('REMOTE_CLI_BTN_CLEAR')
      }

      return null
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
        console.log(error)
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

    async toggleActiveDevices({
      state, commit, dispatch
    }) {
      commit('SET_LOADING_ACTIVE_DEVICES', true)

      try {
        await deviceAPI.toggleActiveDevices()
      } catch (error) {
        console.log(error)
        dispatch('app/showError', {
          error: error.response.data
        }, { root: true })
      } finally {
        commit('SET_LOADING_ACTIVE_DEVICES', false)
      }
    },

    async getDowntimeGraphData({ commit }, data) {
      commit('SET_LOADING_DOWNTIME_GRAPH', true)

      try {
        const response = await deviceAPI.getDowntimeGraphData(data)

        commit('SET_DOWNTIME_GRAPH_DATA', response.data)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_DOWNTIME_GRAPH', false)
      }
    },

    async getDowntimeByTypeGraphSeries({ commit }, data) {
      commit('SET_LOADING_DOWNTIME_BY_TYPE_GRAPH', true)

      try {
        const response = await deviceAPI.getDowntimeByTypeGraphSeries(data)

        commit('SET_DOWNTIME_BY_TYPE_GRAPH_SERIES', response.data.series)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_DOWNTIME_BY_TYPE_GRAPH', false)
      }
    },

    async getDowntimeByReasonGraphSeries({ commit }, data) {
      commit('SET_LOADING_DOWNTIM_BY_REASON_GRAPH', true)

      try {
        const response = await deviceAPI.getDowntimeByReasonGraphSeries(data)

        commit('SET_DOWNTIME_BY_REASON_GRAPH_SERIES', response.data.series)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_DOWNTIM_BY_REASON_GRAPH', false)
      }
    },

    async getDowntimeTableData({ commit }) {
      commit('SET_LOADING_DOWNTIMES_TABLE', true)

      try {
        const response = await deviceAPI.getDowntimeTableData()

        commit('SET_DEVICE_INFO', response.data.devices)
        commit('SET_LOCATIONS', response.data.locations)
        commit('SET_ZONES', response.data.zones)
        commit('SET_DOWNTIME_TYPES', response.data.downtimeTypes)
        commit('SET_DONWTIME_TABLE_DATA', response.data.downtimes)
        commit('SET_DOWNTIME_REASONS', response.data.reasons)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_LOADING_DOWNTIMES_TABLE', false)
      }
    },

    async updateDowntime({ commit, dispatch }, data) {
      commit('SET_UPDATING_DOWNTIME', true)

      try {
        const response = await deviceAPI.updateDowntime(data)

        if (response.data.status === 'success') {
          dispatch('app/showSuccess', response.data.message, { root: true })
        } else {
          dispatch('app/showError', { message: 'Failed: ', error: { message: response.data.message } }, { root: true })
        }
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_UPDATING_DOWNTIME', false)
      }
    },

    async setAvailabilityPlanTime({ commit, disptach }, data) {
      commit('SET_ADDING_AVAILABILITY_PLAN_TIME', true)

      try {
        const response = await deviceAPI.setAvailabilityPlanTime(data)

        console.log(response)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_ADDING_AVAILABILITY_PLAN_TIME', false)
      }
    }
  },

  mutations: {
    SET_ERROR(state, error) { state.error = error },
    CLEAR_ERROR(state) { state.error = null },
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
      state.importBtnLoading = true
    },
    IMPORT_BUTTON_CLEAR(state) {
      state.importBtnLoading = false
    },
    ASSIGN_LOAD(state) {
      state.assignLoading = true
    },
    ASSIGN_CLEAR(state) {
      state.assignLoading = false
    },
    TABLE_LOAD(state) {
      state.tableLoading = true
    },
    TABLE_LOAD_CLEAR(state) {
      state.tableLoading = false
    },
    REGISTER_BTN_LOAD(state) {
      state.registerButtonLoading = true
    },
    REGISTER_BTN_CLEAR(state) {
      state.registerButtonLoading = false
    },
    SET_LOADING_DEVICE_CONFIG(state, isLoading) { state.sendingDeviceConfig = isLoading },
    QUERY_BTN_LOAD(state) {
      state.refreshBtnLoading = true
    },
    QUERY_BTN_CLEAR(state) {
      state.refreshBtnLoading = false
    },
    ACTIVATE_BTN_LOAD(state) {
      state.activateButtonLoading = true
    },
    ACTIVATE_BTN_CLEAR(state) {
      state.activateButtonLoading = false
    },
    SUSPEND_BTN_LOAD(state) {
      state.suspendBtnLoading = true
    },
    SUSPEND_BTN_CLEAR(state) {
      state.suspendBtnLoading = false
    },
    REMOTE_WEB_BTN_LOAD(state) {
      state.remoteWebBtnLoading = true
    },
    REMOTE_WEB_BTN_CLEAR(state) {
      state.remoteWebBtnLoading = false
    },
    REMOTE_CLI_BTN_LOAD(state) {
      state.remoteCliBtnLoading = true
    },
    REMOTE_CLI_BTN_CLEAR(state) {
      state.remoteCliBtnLoading = false
    },
    SET_DATA(state, devices) {
      state.data = devices
    },
    SET_CUSTOMER_DATA(state, res) {
      state.data = res.devices
      state.isVisibleOnly = res.is_visible_only
      state.hiddenDevices = res.hidden_devices
    },
    SET_LOADING_DEVICE_CONFIGURATION(state, loading) { state.loadingDeviceConfig = loading },
    SET_DEVICE_CONFIGURATION(state, configuration) { state.deviceConfiguration = configuration },

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
    SET_DOWNTIME_PLANS(state, plans) { state.downtimePlans = plans },
    SET_LOADING_ACTIVE_DEVICES(state, isLoading) { state.loadingToggleActiveDevices = isLoading },
    SET_LOADING_SAVED_MACHINES(state, isLoading) { state.loadingDashboardSavedMachinesTable = isLoading },
    SET_SAVED_MACHINES(state, data) {
      state.savedMachines = data
    },
    SET_REPORT_SAVED_MACHINES_PAGINATION(state, count) {
      state.savedMachinesPageCountReport = count
    },
    SET_LOADING_DOWNTIME_GRAPH(state, status) {
      state.isDowntimeGraphLoading = status
    },
    SET_DOWNTIME_GRAPH_DATA(state, data) {
      state.downtimeGraphData = data.series
      state.downtimeGraphDate = data.dates
      state.availabilityGraphData = data.availability_series
    },
    SET_LOADING_DOWNTIME_BY_TYPE_GRAPH(state, status) {
      state.isDowntimeByTypeGraphLoading = status
    },
    SET_DOWNTIME_BY_TYPE_GRAPH_SERIES(state, data) {
      state.downtimeByTypeGraphSeries = data
    },
    SET_LOADING_DOWNTIM_BY_REASON_GRAPH(state, status) {
      state.isDowntimeByReasonGraphLoading = status
    },
    SET_DOWNTIME_BY_REASON_GRAPH_SERIES(state, data) {
      state.downtimeByReasonGraphSeries = data
    },
    SET_LOADING_DOWNTIMES_TABLE(state, status) {
      state.isDowntimeTableLoading = status
    },
    SET_DONWTIME_TABLE_DATA(state, data) {
      state.downtimeTableData = data
    },
    SET_DEVICE_INFO(state, data) {
      state.deviceInfo = data
    },
    SET_DOWNTIME_TYPES(state, data) {
      state.downtimeTypes = data
    },
    SET_ZONES(state, data) { state.zones = data },
    SET_LOCATIONS(state, data) { state.locations = data },
    SET_DOWNTIME_REASONS(state, data) { state.downtimeReasons = data },
    SET_UPDATING_DOWNTIME(state, status) { state.isUpdatingDowntime = status },
    SET_ADDING_AVAILABILITY_PLAN_TIME(state, status) { state.isAddingAvailabilityPlanTime = status }
  },

  getters: {
  }
}

export default module
