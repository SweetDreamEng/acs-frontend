import axios from 'axios'
export default {
  getLocations(pageNum) {
    return axios.get('/locations').then((response) => {
      return response
    })
  },
  addLocation(data) {
  	return axios.post('/locations/add', data).then((response) => {
      return response
    })
  },
  updateLocation(data) {
    return axios.patch('/locations/update', data).then((response) => {
      return response
    })
  }
}