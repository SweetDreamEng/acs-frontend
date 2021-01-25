import api from '@/api.js'
export default {
  getProcessOutTemperature(id) {
    return api.get(`/analytics/portable-chiller/process-out-temperature/${id}`)
  }
}