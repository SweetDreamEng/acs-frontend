import axios from 'axios'
export default {

  initAcsDashboard() {
    return axios.get('/acs-machines').then((response) => {
      return response
    })
  },

  initProductAnalytics(data) {
    return axios.post('/analytics/init-product', data).then((response) => {
      return response
    })
  },
  changeProductWeightMode(data) {
    return axios.post('/analytics/product-weight', data).then((response) => {
      return response
    })
  }
}