import api from '@/api.js'
export default {
  getActTgtTemperatures(data) {
    return api.post('/analytics/tcu/actual-target-temperature', data).then((response) => {
      return response
    })
  }
}