import api from '@/api.js'

export default {
  addThreshold(data) {
    return api.$post('/thresholds/add', data)
  }
}