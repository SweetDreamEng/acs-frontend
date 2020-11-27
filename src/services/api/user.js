import api from '@/api.js'
export default {

  initCreateAccount() {
    return api.get('/company-users/init-create-account').then((response) => {
      return response
    })
  },
  openEditCompanyUser(id) {
    return api.get('/company-users/init-edit-account/' + id).then((response) => {
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
    return api.get('/company-users').then((response) => {
      return response
    })
  },

  addCompanyUser(data) {
    return api.post('/company-users/store', data).then((response) => {
      return response
    })
  },
  updateCompanyUserAccount(data) {
    return api.post('/company-users/update-account/' + data.id, data).then((response) => {
      return response
    })
  },
  updateCompanyUserInformation(data) {
    return api.post('/company-users/update-information/' + data.id, data).then((response) => {
      return response
    })
  },

  // init acs users page
  initAcsUsers() {
    return api.get('/acs-users').then((response) => {
      return response
    })
  },
  // init acs user create page
  initCreateAcsUser() {
    return api.get('/acs-users/init-create').then((response) => {
      return response
    })
  },
  initAcsUserEdit(id) {
    return api.get('/acs-users/init-edit/' + id).then((response) => {
      return response
    })
  },
  
  addAcsUser(data) {
    return api.post('/acs-users/store', data).then((response) => {
      return response
    })
  },
  updateAcsUserAccount(data) {
    return api.post('/acs-users/update-account/' + data.id, data).then((response) => {
      return response
    })
  },
  updateAcsUserInformation(data) {
    return api.post('/acs-users/update-information/' + data.id, data).then((response) => {
      return response
    })
  }
}