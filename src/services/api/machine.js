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

  getDashboardMachinesTable(data) {
    return api.post('/dashboard/devices-for-dashboard-table', data).then((response) => {
      return response
    })
  },

  getSystemStates(data) {
    return api.get(`/analytics/product-system-states/${id}`).then((response) => {
      return response
    })
  },
  getWeeklyRunningHours(id) {
    return api.get(`/analytics/weekly-running-hours/${id}`).then((response) => {
      return response
    })
  },
  getEnabledProperties(payload) {
    return api.get('/machines/enabled-properties')
  },
  updateEnabledProperties(payload) {
    return api.patch(`/machines/enabled-properties/${payload.id}`, payload)
  }
}