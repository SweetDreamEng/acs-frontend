import api from '@/api.js'
export default {
  signIn(email, password) {
    const data = {
      email,
      password
    }

    return api.post('/auth/signin', data).then((response) => {
      return response
    })
  },
  updatePassword(currentPassword, newPassword) {
    const data = {
      current_password: currentPassword,
      new_password: newPassword
    }

    return api.post('/auth/update-password', data).then((response) => {
      return response
    })
  },
  requestForgotPassword(email) {
    const data = {
      email: email
    }

    return api.post('/auth/password-reset', data).then((response) => {
      return response
    })
  },
  getTimezoneNames(timezone) {
    return api.get('/profile/timezones').then((response) => {
      return response
    })
  },
  updateTimezone(timezone) {
    return api.post('/profile/timezone', { timezone }).then((response) => {
      return response
    })
  },
  signOut() {
    return api.get('/auth/logout').then((response) => {
      return response
    })
  },
  check() {
    return api.post('/auth/check').then((response) => {
      return response
    })
  }
}