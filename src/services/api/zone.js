import axios from 'axios'
export default {
  initLocationsZones(pageNum) {
    return axios.get('/locations-zones').then((response) => {
      return response
    })
  },
  getZones(pageNum) {
    return axios.get('/zones').then((response) => {
      return response
    })
  },
  addZone(data) {
  	return axios.post('/zones/add', data).then((response) => {
      return response
    })
  },
  updateZone(data) {
    return axios.patch('/zones/update', data).then((response) => {
      return response
    })
  }
}