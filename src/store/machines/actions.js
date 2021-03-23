import machineAPI from '../../services/api/machine'
import companyAPI from '../../services/api/company'

const initAcsDashboard = async ({ commit, state }) => {
  try {
    const response = await companyAPI.getCompanies()

    commit('companies/SET_COMPANIES', response.data.companies, { root: true })
    if (!state.selectedCompany) {
      commit('SET_SELECTED_COMPANY', response.data.companies[0])
    }
  } catch (error) {
    console.log(error)
  }
}

const changeSelectedCompany = ({ commit }, company) => {
  commit('SET_SELECTED_COMPANY', company)
}

const getSystemStates = async ({ state, commit }, id) => {
  commit('SET_LOADING_SYSTEM_STATES', true)

  try {
    const response = await machineAPI.getSystemStates(id)

    commit('SET_SYSTEM_STATES', response.machine_states)
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_SYSTEM_STATES', false)
  }
}
const getWeeklyRunningHours = async ({ commit }, id) => {
  commit('SET_LOADING_WEEKLY_RUNNING_HOURS1', true)

  try {
    const response = await machineAPI.getWeeklyRunningHours(id)

    commit('SET_WEEKLY_RUNNING_HOURS', response.hours)
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

    commit('locations/SET_DATA', response.locations, { root: true })
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

    commit('zones/SET_DATA', response.zones, { root: true })
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

    commit('devices/SET_DATA', response.devices, { root: true })
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_MACHINES_TABLE', false)
  }
}

const getDashboardMachinesTable = async ({ commit }, data) => {
  commit('SET_LOADING_MACHINES_TABLE', true)
  commit('devices/SET_DATA', [], { root: true })

  try {
    const response = await machineAPI.getDashboardMachinesTable(data)

    commit('devices/SET_DATA', response.devices.data, { root: true })
    commit('devices/SET_TOTAL_DEVICES', response.devices.total, { root: true })
    commit('devices/SET_PAGE_COUNT', response.devices.last_page, { root: true })
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_MACHINES_TABLE', false)
  }
}

const getTags = async ({ state, commit }, machineId) => {
  try {
    const response = await machineAPI.getTags(machineId)

    commit('SET_TAGS', response.tags)
  } catch (error) {
    throw new Error(error)
  }
}

const getDataToolSeries = async ({ state, commit }, payload) => {
  commit('SET_LOADING_DATA_TOOL_SERIES', true)
  
  try {
    const response = await machineAPI.getDataToolSeries(payload)

    commit('SET_DATA_TOOL_SERIES', response.series)
  } catch (error) {
    throw new Error(error)
  } finally {
    commit('SET_LOADING_DATA_TOOL_SERIES', false)
  }
}

const updateDataToolOptions = async ({ commit }, payload) => {
  commit('SET_DATA_TOOL_OPTIONS', payload)
}

export default {
  initAcsDashboard,
  initLocationsTable,
  initZonesTable,
  initMachinesTable,
  getDashboardMachinesTable,
  changeSelectedCompany,
  getSystemStates,
  getWeeklyRunningHours,
  getTags,
  getDataToolSeries,
  updateDataToolOptions
}
