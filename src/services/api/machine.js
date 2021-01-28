import api from '@/api.js'
export default {
  async initLocationsTable() {
    return api.get('/dashboard/init-locations-table')
  },

  async initZonesTable(location_id) {
    return api.get(`/dashboard/init-zones-table/${location_id}`)
  },

  async initMachinesTable(zone_id) {
    return api.get(`/dashboard/init-machines-table/${zone_id}`)
  },

  async getDashboardMachinesTable(data) {
    return api.post('/dashboard/devices-for-dashboard-table', data)
  },

  async getSystemStates(data) {
    return api.get(`/analytics/product-system-states/${id}`)
  },
  async getWeeklyRunningHours(id) {
    return api.get(`/analytics/weekly-running-hours/${id}`)
  },
  async updateEnabledProperties(payload) {
    return api.patch(`/machines/enabled-properties/${payload.id}`, payload)
  }
}