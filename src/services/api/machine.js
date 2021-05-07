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
  },
  requestService(data) {
    return api.$post('/analytics/request-service', data)
  },
  saveMachine(data) {
    return api.$post('/analytics/save-machine', data)
  },
  getSavedStatus(data) {
    return api.$post('/analytics/get-saved-status', data)
  },
  getMachines(data) {
    return api.$post('/analytics/get-machines', data)
  },
  getMachineTags(data) {
    return api.$post('/analytics/get-machine-tags', data)
  },
  generateMachinesReport(data) {
    return api.$post('/machines/generate-machines-report', data)
  },
  getMachinesReportList() {
    return api.$get('/machines/get-machines-report')
  },
  deleteMachinesReport(id) {
    return api.$delete(`/machines/report/${id}`)
  },
  getBlenderWeights(data) {
    return api.$post('/machines/get-blender-weights', data)
  },
  getAlarmHistory(data) {
    return api.$post('/machines/get-alarm-history', data)
  }
}