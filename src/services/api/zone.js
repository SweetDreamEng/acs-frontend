import api from '@/api.js'
export default {
  /**
  * Get user zones
  *
  * @example
  *
  *     getZones()
  */
  getZones() {
    return api.$get('/zones')
  },

  /**
  * Add a new customer zone
  *
  * @param {Object} data New zone object
  * @param {string} data.name The name of zone
  * @param {number} data.location_id The id of location
  * @example
  *
  *     addZone({
  *       name: 'Zone 1',
  *       location_id: 2
  *     })
  */
  addZone(data) {
  	return api.$post('/zones', data)
  },

  /**
  * Update a customer zone
  *
  * @param {Object} data Zone object
  * @param {number} data.id Location id
  * @param {name} data.name Zone name
  * @param {number} data.location_id The location id
  * @example
  *
  *     updateLocation({
  *       id: 1,
  *       name: 'Zone 2',
  *       location_id: 2
  *     })
  */
  updateZone(data) {
    return api.$patch(`/zones/${data.id}`, data)
  }
}
