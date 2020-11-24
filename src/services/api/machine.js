import axios from 'axios'
export default {

  initAcsDashboard() {
    return axios.get('/acs-machines').then((response) => {
      return response
    })
  }
}