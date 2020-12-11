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
  getInventory(data) {
    return api.post('/analytics/product-inventory', data).then((response) => {
      return response
    })
  },
  addNote(data) {
    return api.post('/notes/store', data).then((response) => {
      return response
    })
  },
  getMachines() {
    return api.get('/acs-machines/get-machines').then((response) => {
      return response
    })
  }
}