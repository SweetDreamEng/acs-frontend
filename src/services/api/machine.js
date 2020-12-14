import api from '@/api.js'
export default {
  getAllConfigurations() {
    return api.get('/configurations/index').then((response) => {
      return response
    })
  },

  initAcsDashboard() {
    return api.get('/acs-machines').then((response) => {
      return response
    })
  },

  initLocationsTable() {
    return api.get('/acs-machines/init-locations-table').then((response) => {
      return response
    })
  },

  initAcsZonesTable(location_id) {
    return api.get(`/acs-machines/init-zones-table/${location_id}`).then((response) => {
      return response
    })
  },

  initAcsMachinesTable(zone_id) {
    return api.get(`/acs-machines/init-machines-table/${zone_id}`).then((response) => {
      return response
    })
  },

  initProduct(data) {
    return api.post('/analytics/init-product', data).then((response) => {
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

  getWeight(id) {
    return api.get(`/analytics/product-weight/${id}`).then((response) => {
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
  },
  getInventory(id) {
    return api.get(`/analytics/product-inventory/${id}`).then((response) => {
      return response
    })
  },
  getMachines() {
    return api.get('/acs-machines/get-machines').then((response) => {
      return response
    })
  },
  getMachinesByCompanyId(id) {
    return api.get(`/acs-machines/get-machines-by-company-id/${id}`).then((response) => {
      return response
    })
  }
}