import api from '@/api.js'
export default {
  initLocationsTable() {
    return api.get('/dashboard/init-locations-table').then((response) => {
      return response
    })
  },

  initZonesTable(location_id) {
    return api.get(`/dashboard/init-zones-table/${location_id}`).then((response) => {
      return response
    })
  },

  initMachinesTable(zone_id) {
    return api.get(`/dashboard/init-machines-table/${zone_id}`).then((response) => {
      return response
    })
  },

  getOverview(id) {
    return api.get(`/analytics/product-overview/${id}`).then((response) => {
      return response
    })
  },

  getUtilization(data) {
    return api.post('/analytics/product-utilization', data).then((response) => {
      return response
    })
  },

  getEnergyConsumption(data) {
    return api.post('/analytics/product-energy-consumption', data).then((response) => {
      return response
    })
  },

  getRecipe(id) {
    return api.get(`/analytics/product-recipe/${id}`).then((response) => {
      return response
    })
  },
  
  getRecipe2(id) {
    return api.get(`/analytics/product-actual-target-recipe/${id}`).then((response) => {
      return response
    })
  },

  getSystemStates(id) {
    return api.get(`/analytics/product-system-states/${id}`).then((response) => {
      return response
    })
  },

  getMachineStates3(id) {
    return api.get(`/analytics/product-system-states-3/${id}`).then((response) => {
      return response
    })
  },

  getHauloffLengths(data) {
    return api.post('/analytics/product-hauloff-lengths', data).then((response) => response)
  },

  getHopperInventories(data) {
    return api.post('/analytics/product-hopper-inventories', data).then((response) => response)
  },

  getWeeklyRunningHours(id) {
    return api.get(`/analytics/weekly-running-hours/${id}`).then((response) => {
      return response
    })
  },

  changeProductWeightMode(data) {
    return api.post('/analytics/product-weight', data).then((response) => {
      return response
    })
  },
  onProductInventoryParamChanged(data) {
    return api.post('/analytics/product-inventory', data).then((response) => {
      return response
    })
  }
}