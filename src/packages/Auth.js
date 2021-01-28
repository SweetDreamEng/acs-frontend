import api from 'axios'
import store from '../store/index'

export default function (Vue) {
  Vue.auth = {
    setToken(accessToken) {
      localStorage.setItem('token', accessToken)
    },

    getToken() {
      return localStorage.getItem('token')
    },

    getUser() {
      localStorage.getItem('user')
    },

    setUser(user) {
      localStorage.setItem('user', JSON.stringify(user))
    },

    removeUser() {
      localStorage.removeItem('user')
    },

    check(role = '') {
      try {
        const response = api.post('/auth/check', { role })
        
        if (!response.data) {
          store.commit('auth/SET_LOGOUT_AUTH')
        }

        return (response.data)
      } catch (error) {
        localStorage.removeItem('token')

        return false
      }
    }
  }

  //make auth global
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: () => {
        return Vue.auth
      }
    }
  })
}