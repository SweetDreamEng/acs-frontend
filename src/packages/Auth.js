import axios from 'axios'
import store from '../store/index'

export default function (Vue) {
  Vue.auth = {
    setToken(accessToken) {
      localStorage.setItem('token', accessToken)
    },

    getToken() {
      return localStorage.getItem('token')
    },

    removeToken() {
      localStorage.removeItem('token')
    },

    check(role = '') {
      return axios.post('/auth/check', {
        role
      })
        .then((response) =>  {
          // store.dispatch('SET_USER', response.data.user)
          if (!response.data) {
            store.dispatch('auth/clearAuthData')
          }

          return (response.data)
        })
        .catch(() => {
          this.removeToken('token')

          return false
        })
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