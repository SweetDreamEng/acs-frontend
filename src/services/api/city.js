import api from '@/api.js'
export default {
  /**
  * Get cities of a state
  *
  * @param {}
  * @example
  *
  *     getCities('Alabama')
  */
  getCities(state) {
    return api.get('/cities/' + state)
  }
}