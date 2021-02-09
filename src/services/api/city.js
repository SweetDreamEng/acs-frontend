import api from '@/api.js'
export default {
  /**
  * Get cities of a state
  *
  * @param {string} state The name of state
  * @example
  *
  *     getCities('Alabama')
  */
  getCities(state) {
    return api.$get('/cities/' + state)
  }
}