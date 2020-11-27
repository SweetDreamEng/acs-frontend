import api from '@/api.js'
export default {

  /*
    Get zones, locations
    response: {
      locations: Array,
      zones: Array
    }
  */
  initLocationsZones(pageNum) {
    return api.get('/locations-zones').then((response) => {
      return response
    })
  },

  /*
    Get zones
  */
  getZones(pageNum) {
    return api.get('/zones').then((response) => {
      return response
    })
  },

  /*
    Add a new Zone
    params:
      {
        name: String,
        location_id: Integer
      }
  */
  addZone(data) {
  	return api.post('/zones/add', data).then((response) => {
      return response
    })
  },

  /*
    Update Zone
    params:
      {
        id: Integer,
        name: String,
        location_id: Integer
      }
  */
  updateZone(data) {
    return api.patch('/zones/update', data).then((response) => {
      return response
    })
  }
}