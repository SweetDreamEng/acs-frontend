import api from '@/api.js'
export default {
  async initLocationsTable() {
    return await api.get('/dashboard/init-locations-table')
  },

  async initZonesTable(location_id) {
    return await api.get(`/dashboard/init-zones-table/${location_id}`)
  },

  async initMachinesTable(zone_id) {
    return await api.get(`/dashboard/init-machines-table/${zone_id}`)
  },

  async getDashboardMachinesTable(data) {
    return await api.post('/dashboard/devices-for-dashboard-table', data)
  },

  async getSystemStates(data) {
    return await api.get(`/analytics/product-system-states/${id}`)
  },

  async getWeeklyRunningHours(id) {
    return await api.get(`/analytics/weekly-running-hours/${id}`)
  }
}