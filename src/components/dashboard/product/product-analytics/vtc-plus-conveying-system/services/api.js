import api from '@/api.js'
export default {
  getPumpHoursOil(payload) {
    return api.post('/analytics/vtc-plus/pump-hours-oil', payload)
  },

  getPumpHours(payload) {
    return api.post('/analytics/vtc-plus/pump-hours', payload)
  },

  getPumpOnlineLife(payload) {
    return api.post('/analytics/vtc-plus/pump-online-life', payload)
  },

  getPumpOnlines(payload) {
    return api.post('/analytics/vtc-plus/pump-onlines', payload)
  },

  getPumpBlowBacks(payload) {
    return api.post('/analytics/vtc-plus/pump-blowbacks', payload)
  }
}