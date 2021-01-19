import machineAPI from '@/services/api/machine'
import companyAPI from '@/services/api/company'

const initAcsDashboard = async ({ commit, state }) => {
  try {
    const response = await companyAPI.getCompanies()

    commit('customers/SET_COMPANIES', response.data.companies, { root: true })
    if (!state.selectedCompany) {
      commit('SET_SELECTED_COMPANY', response.data.companies[0])
    }
  } catch (error) {
    console.log(error.response)
  }
}

const changeSelectedCompany = ({ commit }, company) => {
  commit('SET_SELECTED_COMPANY', company)
}

const selectTimeRange = ({ commit }, key) => {
  commit('SET_CURRENT_TIME_PARAM_KEY', key)
  commit('SET_CURRENT_TIME_RANGE_ITEM', key)
}

const getSystemStates = async ({ state, commit }, id) => {
  commit('SET_LOADING_SYSTEM_STATES', true)

  try {
    const response = await machineAPI.getSystemStates(id)

    commit('SET_SYSTEM_STATES', response.data.machine_states)
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_SYSTEM_STATES', false)
  }
}

const getMachineStates3 = async ({ state, commit }, id) => {
  commit('SET_LOADING_SYSTEM_STATES', true)

  try {
    const response = await machineAPI.getMachineStates3(id)

    commit('SET_SYSTEM_STATES', response.data.machine_states)
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_SYSTEM_STATES', false)
  }
}

const getHopperInventories = async ({ state, commit }, id) => {
  commit('SET_LOADING_HOPPER_INVENTORIES', true)

  try {
    const response = await machineAPI.getHopperInventories({
      id: id,
      timeRange: state.inventoryTimeRange
    })

    commit('SET_HOPPER_INVENTORIES', response.data.inventories)
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_HOPPER_INVENTORIES', false)
  }
}

const getHauloffLengths = async ({ state, commit }, id) => {
  commit('SET_LOADING_HAUL_OFF_LENGTHS', true)

  try {
    const response = await machineAPI.getHauloffLengths({
      id: id,
      timeRange: state.hauloffTimeRange
    })

    commit('SET_HAUL_OFF_LENGTHS', response.data.lengths)
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_HAUL_OFF_LENGTHS', false)
  }
}

const getProductionRate = async ({ state, commit }, id) => {
  commit('SET_LOADING_PROCESS_RATE', true)

  try {
    const response = await machineAPI.getProductionRate({
      id: id,
      timeRange: state.processRateTimeRange
    })

    commit('SET_PROCESS_RATE_SERIES', response.data.process_rate)
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_PROCESS_RATE', false)
  }
}

const getWeeklyRunningHours = async ({ commit }, id) => {
  commit('SET_LOADING_WEEKLY_RUNNING_HOURS1', true)

  try {
    const response = await machineAPI.getWeeklyRunningHours(id)

    commit('SET_WEEKLY_RUNNING_HOURS', response.data.hours)
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_WEEKLY_RUNNING_HOURS1', false)
  }
}

const initLocationsTable = async ({ commit }) => {
  commit('SET_LOADING_LOCATIONS_TABLE', true)
  commit('locations/SET_DATA', [], { root: true })

  try {
    const response = await machineAPI.initLocationsTable()

    commit('locations/SET_DATA', response.data.locations, { root: true })
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_LOCATIONS_TABLE', false)
  }
}

const initZonesTable = async ({ commit }, location_id) => {
  commit('SET_LOADING_ZONES_TABLE', true)
  commit('zones/SET_DATA', [], { root: true })

  try {
    const response = await machineAPI.initZonesTable(location_id)

    commit('zones/SET_DATA', response.data.zones, { root: true })
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_ZONES_TABLE', false)
  }
}

const initMachinesTable = async ({ commit }, zone) => {
  commit('SET_LOADING_MACHINES_TABLE', true)
  commit('devices/SET_DATA', [], { root: true })

  try {
    const response = await machineAPI.initMachinesTable(zone)
    
    commit('devices/SET_DATA', response.data.devices, { root: true })
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_MACHINES_TABLE', false)
  }
}

const getDashboardMachinesTable = async ({ commit }, data) => {
  commit('SET_LOADING_MACHINES_TABLE', true)

  try {
    const response = await machineAPI.getDashboardMachinesTable(data)

    commit('devices/SET_DATA', response.data.devices.data, { root: true })
    commit('devices/SET_TOTAL_DEVICES', response.data.devices.total, { root: true })
    commit('devices/SET_PAGE_COUNT', response.data.devices.last_page, { root: true })
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_MACHINES_TABLE', false)
  }
}

const onTimeRangeChanged = ({ commit, dispatch, state }, data) => {
  if (state.selectedTimeRangeKey === 'process-rate') {
    commit('SET_PROCESS_RATE_TIME_RANGE', data)
    dispatch('getProductionRate', data.id)
  } else if (state.selectedTimeRangeKey === 'hopper-inventories') {
    commit('SET_HOPPER_INVENTORY_TIME_RANGE', data)
    dispatch('getHopperInventories', data.id)
  } else if (state.selectedTimeRangeKey === 'hauloff-lengths') {
    commit('SET_HAULOFF_LENGTH_TIME_RANGE', data)
    dispatch('getHauloffLengths', data.id)
  }
}

export default {
  initAcsDashboard,
  initLocationsTable,
  initZonesTable,
  initMachinesTable,
  getDashboardMachinesTable,
  changeSelectedCompany,
  selectTimeRange,
  getSystemStates,
  getMachineStates3,
  getHopperInventories,
  getHauloffLengths,
  getProductionRate,
  getWeeklyRunningHours,
  onTimeRangeChanged
}
