import axios from 'axios'
export default {
  getCities(state) {
    return axios.get('/cities/' + state).then((response) => {
      return response
    })
  }
}