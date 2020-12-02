import api from '@/api.js'
export default {

  /*
    Get locations
    response: {
      locations: Array
    }
  */
  getLocations(pageNum) {
    return api.get('/locations').then((response) => {
      return response
    })
  },

  /*
    Add a new location
    params:
      {
        location: String
      }
  */
  addLocation(data) {
  	return api.post('/locations/add', data).then((response) => {
      return response
    })
  },

  /*
    Update location
    params:
      {
        id: Integer
        location: String
      }
  */
  updateLocation(data) {
    return api.patch('/locations/update', data).then((response) => {
      return response
    })
  }
}