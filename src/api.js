import Vue from 'vue'
import axios from 'axios'
import store from './store'

const API = axios.create({
  baseURL: process.env.VUE_APP_SERVER_API_ENDPOINT || '/api',
  // baseURL: 'http://localhost/acs-api/public/api',
  timeout: 15000
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

API.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // if (401 === error.response.status) {

  //   Vue.auth.removeToken()
  //   Vue.auth.removeUser()

  //   store.commit('auth/SET_LOGOUT_ATUH', { root: true })

  //   window.location = '/auth/signin'
  // } else {
  return Promise.reject(error)
  // }
})

export default API