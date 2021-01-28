import api from '@/api.js'
export default {
  /*
    Get zones
  */
  async getZones(pageNum) {
    return api.get('/zones')
  },

  /*
    Add a new Zone
    params:
      {
        name: String,
        location_id: Integer
      }
  */
  async addZone(data) {
  	return api.post('/zones/add', data)
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
  async updateZone(data) {
    return api.patch('/zones/update', data)
  }
}