import axios from 'axios'
export default {

  /*
    Get locations
    response: {
      locations: Array
    }
  */
  getLocations(pageNum) {
    return axios.get('/locations').then((response) => {
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
  	return axios.post('/locations/add', data).then((response) => {
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
    return axios.patch('/locations/update', data).then((response) => {
      return response
    })
  }
}