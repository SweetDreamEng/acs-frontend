import api from '@/api.js'

export default {
  addThreshold(data) {
    return api.$post('/thresholds/add', data)
  },
  getActiveThresholds() {
    return api.$get('/thresholds/active')
  },
  getThresholds() {
    return api.$get('/thresholds')
  },
  changeThresholdStatus(id) {
    return api.$post(`/thresholds/change-status/${id}`)
  },
  deleteThreshold(id) {
    return api.$delete(`/thresholds/${id}`)
  },
  updateThreshold(data) {
    return api.$put(`/thresholds/${data.id}`, data)
  },
  clearThresholds(data) {
    return api.$post('/thresholds/clear', data)
  }
}