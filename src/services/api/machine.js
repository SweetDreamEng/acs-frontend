import axios from 'axios'
export default {

  initAcsDashboard() {
    return axios.get('/acs-machines').then((response) => {
      return response
    })
  },

  initProductAnalytics() {
    return axios.get('/analytics/init-product').then((response) => {
      return response
    })
  },
  changeProductWeightMode(mode) {
    return axios.post('/analytics/product-weight', {
      mode
    }).then((response) => {
      return response
    })
  }
}