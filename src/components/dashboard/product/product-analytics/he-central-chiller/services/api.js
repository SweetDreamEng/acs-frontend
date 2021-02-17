import api from '@/api.js'
export default {
  getChillerTemperature(payload) {
    return api.post('/analytics/central-chiller/chiller-in-out-temperature', payload)
  }
}