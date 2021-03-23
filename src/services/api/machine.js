import api from '@/api.js'
export default {
  initLocationsTable() {
    return api.$get('/dashboard/init-locations-table')
  },

  initZonesTable(location_id) {
    return api.$get(`/dashboard/init-zones-table/${location_id}`)
  },

  initMachinesTable(zone_id) {
    return api.$get(`/dashboard/init-machines-table/${zone_id}`)
  },

  getDashboardMachinesTable(data) {
    return api.$post('/dashboard/devices-for-dashboard-table', data)
  },

  getSystemStates(data) {
    return api.$get(`/analytics/product-system-states/${id}`)
  },
  getWeeklyRunningHours(id) {
    return api.$get(`/analytics/weekly-running-hours/${id}`)
  },
  getTags(id) {
    return api.$get(`/machine-tags/${id}`)
  },
  getDataToolSeries(data) {
    return api.$post('/analytics/data-tool-series', data)
  }
}