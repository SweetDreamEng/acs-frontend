import api from '@/api.js'
export default {
  async getCities(state) {
    return api.get('/cities/' + state)
  }
}