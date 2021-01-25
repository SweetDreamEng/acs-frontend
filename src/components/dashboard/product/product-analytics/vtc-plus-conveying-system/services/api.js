import api from '@/api.js'
export default {
  async getPumpHoursOil(id) {
    return await api.get(`/analytics/vtc-plus/pump-hours-oil/${id}`)
  },

  async getPumpHours(id) {
    return await api.get(`/analytics/vtc-plus/pump-hours/${id}`)
  },

  async getPumpOnlineLife(id) {
    return await api.get(`/analytics/vtc-plus/pump-online-life/${id}`)
  },

  async getPumpOnlines(id) {
    return await api.get(`/analytics/vtc-plus/pump-onlines/${id}`)
  },

  async getPumpBlowBacks(id) {
    return await api.get(`/analytics/vtc-plus/pump-blowbacks/${id}`)
  }
}