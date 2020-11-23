import axios from 'axios'
export default {
  signIn(email, password) {
    const data = {
      email,
      password
    }

    return axios.post('/auth/signin', data).then((response) => {
      return response
    })
  },
  updatePassword(currentPassword, newPassword) {
    const data = {
      current_password: currentPassword,
      new_password: newPassword
    }

    return axios.post('/auth/update-password', data).then((response) => {
      return response
    })
  },
  requestForgotPassword(email) {
    const data = {
      email: email
    }

    console.log(data)

    return axios.post('/auth/password-reset', data).then((response) => {
      return response
    })
  },
  signOut() {
    return axios.get('/auth/logout').then((response) => {
      return response
    })
  },
  check() {
    return axios.post('/auth/check').then((response) => {
      return response
    })
  }
}