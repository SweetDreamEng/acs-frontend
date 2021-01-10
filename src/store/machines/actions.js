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

const getOverview = async ({ commit }, id) => {
  commit('OVERVIEW_LOADING')

  try {
    const response = await machineAPI.getOverview(id)

    commit('SET_OVERVIEW', response.data.overview)
  } catch (error) {
    console.log(error)
  } finally {
    commit('OVERVIEW_LOADED')
  }
}

const getUtilization = async ({ state, commit }, id) => {
  commit('SET_LOADING_UTILIZATION', true)

  try {
    const response = await machineAPI.getUtilization({
      id: id,
      timeRange: state.utilizationTimeRange
    })

    commit('SET_UTILIZATION', response.data.utilizations)
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_UTILIZATION', false)
  }
}

const getEnergyConsumption = async ({ state, commit }, id) => {
  commit('SET_LOADING_ENERGY_CONSUMPTION', true)

  try {
    const response = await machineAPI.getEnergyConsumption({
      id: id,
      timeRange: state.energyConsumptionTimeRange
    })

    commit('SET_ENERGY_CONSUMPTION', response.data.energy_consumption)
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_ENERGY_CONSUMPTION', false)
  }
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

  try {
    const response = await machineAPI.initMachinesTable(zone)
    
    commit('devices/SET_DATA', response.data.devices, { root: true })
  } catch (error) {
    console.log(error)
  } finally {
    commit('SET_LOADING_MACHINES_TABLE', false)
  }
}

const onProductWeightParamChange = async ({ commit, state }) => {
  commit('WEIGHT_PRODUCT_LOADING')
  try {
    const response = await machineAPI.changeProductWeightMode({
      param: state.paramWeightProduct,
      timeRange: state.weightTimeRange
    })

    commit('SET_TGT_WEIGHT_VALUES', response.data.targets)
    commit('SET_ACT_WEIGHT_VALUES', response.data.actuals)
  } catch (error) {
    console.log(error.response)
  } finally {
    commit('WEIGHT_PRODUCT_LOADED')
  }
}

const onProductInventoryParamChanged = ({ commit }, data) => {
  commit('SET_PRODUCT_INVENTORY_PARAM', data.param)

  // dispatch('getInventory')
}

const onTimeRangeChanged = ({ commit, dispatch, state }, data) => {
  if (state.selectedTimeRangeKey === 'utilization') {
    commit('SET_UTILIZATION_TIME_RANGE', data)
    dispatch('getUtilization', data.id)
  } else if (state.selectedTimeRangeKey === 'energy-consumption') {
    commit('SET_ENERGY_CONSUMPTION_TIME_RANGE', data)
    dispatch('getEnergyConsumption', data.id)
  } else if (state.selectedTimeRangeKey === 'process-rate') {
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
  changeSelectedCompany,
  selectTimeRange,
  getOverview,
  getUtilization,
  getEnergyConsumption,
  getSystemStates,
  getMachineStates3,
  getHopperInventories,
  getHauloffLengths,
  getProductionRate,
  getWeeklyRunningHours,
  onProductWeightParamChange,
  onProductInventoryParamChanged,
  onTimeRangeChanged
}
