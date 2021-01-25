import api from '@/api.js'
export default {
  async getCities(state) {
    return await api.get('/cities/' + state)
  }
}