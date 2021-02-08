import api from '@/api.js'
export default {
  /**
  * Get user locations
  *
  * @param {}
  * @example
  *
  *     getLocations()
  */
  getLocations() {
    return api.$get('/locations')
  },

  /**
  * Add a new customer location
  *
  * @param {Object} new location object
  * @example
  *
  *     addLocation({
  *       name: 'Location 1',
  *       state: 'Alabama',
  *       city: 'Abbeville',
  *       zip: '36310',
  *     })
  */
  addLocation(data) {
  	return api.$post('/locations', data)
  },

  /**
  * Update a customer location
  *
  * @param {Object} user object
  * @example
  *
  *     updateLocation({
  *       id: '1',
  *       customer_id: 3,
  *       name: 'New Berlin Location',
  *       state: 'Wisconsin',
  *       city: 'New Berlin',
  *       zip: '53151',
  *     })
  */
  updateLocation(data) {
    return api.$patch(`/locations/${data.id}`, data)
  }
}