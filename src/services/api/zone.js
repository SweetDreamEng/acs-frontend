import api from '@/api.js'
export default {
  /**
  * Get user zones
  *
  * @param {}
  * @example
  *
  *     getZones()
  */
  getZones() {
    return api.get('/zones')
  },

  /**
  * Add a new customer zone
  *
  * @param {Object} new zone object
  * @example
  *
  *     addZone({
  *       name: 'Zone 1',
  *       location_id: 2
  *     })
  */
  addZone(data) {
  	return api.post('/zones', data)
  },
  
  /**
  * Update a customer zone
  *
  * @param {Object} zone object
  * @example
  *
  *     updateLocation({
  *       id: 1,
  *       name: 'Zone 2',
  *       location_id: 2
  *     })
  */
  updateZone(data) {
    return api.patch(`/zones/${data.id}`, data)
  }
}