import api from '@/api.js'
export default {
  signIn(email, password) {
    const data = {
      email,
      password
    }

    return api.post('/auth/signin', data)
  },

  getUser() {
    return api.get('/auth/user')
  },

  updatePassword(currentPassword, newPassword) {
    const data = {
      current_password: currentPassword,
      new_password: newPassword
    }

    return api.post('/auth/update-password', data)
  },

  requestForgotPassword(email) {
    const data = {
      email: email
    }

    return api.post('/auth/password-reset', data)
  },

  getTimezoneNames(timezone) {
    return api.get('/profile/timezones')
  },

  updateTimezone(timezone) {
    return api.post('/profile/timezone', { timezone })
  },

  signOut() {
    return api.get('/auth/logout')
  },

  check() {
    return api.post('/auth/check')
  }
}