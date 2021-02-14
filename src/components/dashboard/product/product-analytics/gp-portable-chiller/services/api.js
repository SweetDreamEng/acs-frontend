import api from '@/api.js'
export default {
  getProcessOutTemperature(payload) {
    return api.post('/analytics/portable-chiller/process-out-temperature', payload)
  }
}