import api from '@/api.js'
export default {
  getCities(state) {
    return api.get('/cities/' + state)
  }
}