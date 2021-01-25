import api from '@/api.js'
export default {

  /*
    Get locations
    response: {
      locations: Array
    }
  */
  async getLocations(pageNum) {
    return await api.get('/locations')
  },

  /*
    Add a new location
    params:
      {
        location: String
      }
  */
  async addLocation(data) {
  	return await api.post('/locations/add', data)
  },

  /*
    Update location
    params:
      {
        id: Integer
        location: String
      }
  */
  async updateLocation(data) {
    return await api.patch('/locations/update', data)
  }
}