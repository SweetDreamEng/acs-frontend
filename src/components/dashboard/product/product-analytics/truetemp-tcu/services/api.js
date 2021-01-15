import api from '@/api.js'
export default {
  getActTgtTemperatures(id) {
    return api.get(`/analytics/tcu/actual-target-temperature/${id}`).then((response) => {
      return response
    })
  }
}