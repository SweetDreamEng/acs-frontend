import axios from 'axios'
export default {
  getZones(pageNum) {
    return axios.get('/zones').then((response) => {
      return response
    })
  }
}