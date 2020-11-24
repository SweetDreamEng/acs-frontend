import axios from 'axios'
export default {

  openCreateAccount() {
    return axios.get('/company-users/init-create-account').then((response) => {
      return response
    })
  },
  openEditAccount(id) {
    return axios.get('/company-users/init-edit-account/' + id).then((response) => {
      return response
    })
  },
  /*
    Get users
    response: {
      users: Array
    }
  */
  getCompanyUsers() {
    return axios.get('/company-users').then((response) => {
      return response
    })
  },

  addCompanyUser(data) {
    return axios.post('/company-users/store', data).then((response) => {
      return response
    })
  },
  updateCompanyUserAccount(data) {
    return axios.post('/company-users/update-account/' + data.id, data).then((response) => {
      return response
    })
  }
}