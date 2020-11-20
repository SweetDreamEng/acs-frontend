import axios from 'axios'
export default {

  /*
    Get zones, locations
    response: {
      locations: Array,
      zones: Array
    }
  */
  initLocationsZones(pageNum) {
    return axios.get('/locations-zones').then((response) => {
      return response
    })
  },

  /*
    Get zones
  */
  getZones(pageNum) {
    return axios.get('/zones').then((response) => {
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
  	return axios.post('/zones/add', data).then((response) => {
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
    return axios.patch('/zones/update', data).then((response) => {
      return response
    })
  }
}