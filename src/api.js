import axios from 'axios'
import store from './store'
import router from './router'

const API = axios.create({
  // baseURL: process.env.VUE_APP_SERVER_API_ENDPOINT || '/api',
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 150000
})

API.interceptors.request.use(async (config) => {
  if (store.state.auth.token) {
    config.headers = {
      'Authorization': `Bearer ${store.state.auth.token}`,
      ...config.headers
    }
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

API.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (401 === error.response.status) {

    localStorage.removeItem('token')

    store.commit('auth/SET_LOGOUT_AUTH', { root: true })

    if (router.history.current.name === 'auth-signin') {
      return Promise.reject(error)
    } else {
      return window.location = '/auth/signin'
    }
  } else {
    return Promise.reject(error)
  }
})

// Request helpers ($get, $post, ...) to retrieve data directly
for (const method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
  API['$' + method] = (...args) => (API[method](...args).then((res) => (res && res.data)))
}
export default API
