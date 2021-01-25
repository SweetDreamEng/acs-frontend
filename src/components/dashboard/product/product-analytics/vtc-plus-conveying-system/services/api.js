import api from '@/api.js'
export default {
  getPumpHoursOil(id) {
    return api.get(`/analytics/vtc-plus/pump-hours-oil/${id}`)
  },

  getPumpHours(id) {
    return api.get(`/analytics/vtc-plus/pump-hours/${id}`)
  },

  getPumpOnlineLife(id) {
    return api.get(`/analytics/vtc-plus/pump-online-life/${id}`)
  },

  async getPumpOnlines(id) {
    return await api.get(`/analytics/vtc-plus/pump-onlines/${id}`)
  },

  async getPumpBlowBacks(id) {
    return await api.get(`/analytics/vtc-plus/pump-blowbacks/${id}`)
  }
}