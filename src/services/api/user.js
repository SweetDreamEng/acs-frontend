import axios from 'axios'
export default {

  initCreateAccount() {
    return axios.get('/company-users/init-create-account').then((response) => {
      return response
    })
  },
  openEditCompanyUser(id) {
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
  },
  updateCompanyUserInformation(data) {
    return axios.post('/company-users/update-information/' + data.id, data).then((response) => {
      return response
    })
  },

  // init acs users page
  initAcsUsers() {
    return axios.get('/acs-users').then((response) => {
      return response
    })
  },
  // init acs user create page
  initCreateAcsUser() {
    return axios.get('/acs-users/init-create').then((response) => {
      return response
    })
  },
  initAcsUserEdit(id) {
    return axios.get('/acs-users/init-edit/' + id).then((response) => {
      return response
    })
  },
  
  addAcsUser(data) {
    return axios.post('/acs-users/store', data).then((response) => {
      return response
    })
  },
  updateAcsUserAccount(data) {
    return axios.post('/acs-users/update-account/' + data.id, data).then((response) => {
      return response
    })
  },
  updateAcsUserInformation(data) {
    return axios.post('/acs-users/update-information/' + data.id, data).then((response) => {
      return response
    })
  }
}