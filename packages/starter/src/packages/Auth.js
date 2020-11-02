import axios from 'axios'
// import store from '../store/store'

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

    check() {
      return axios.post('/auth/check')
        .then((response) =>  {
          // store.dispatch('SET_TOKEN', )
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