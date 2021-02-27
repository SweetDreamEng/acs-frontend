import api from '@/api.js'
export default {
  getRunnings(payload) {
    return api.post('/analytics/t50-granulator/runnings', payload)
  },

  getHours(payload) {
    return api.post('/analytics/t50-granulator/hours', payload)
  },

  getT50BearingTemp(payload) {
    return api.post('/analytics/t50-granulator/bearing-temp', payload)
  }
}