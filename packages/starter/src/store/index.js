import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Global vuex
import AppModule from './app'
import auth from './auth'
import machines from './machines'
import users from './users'
import departments from './departments'
import divisions from './divisions'
import customers from './customers'

Vue.use(Vuex)

const axios = require('axios')

axios.defaults.baseURL = 'http://localhost/acs-api/public/api'
// console.log(process.env.SERVER_API_ENDPOINT)

axios.interceptors.request.use(
  (config) => {
    const token = Vue.auth.getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => Promise.reject(error)
)

const axiosPlugin = (store) => {
  store.$axios = axios
}

/**
 * Main Vuex Store
 */

const dataState = createPersistedState({
  paths: [
    'app',
    'auth',
    'machines',
    'users',
    'departments',
    'divisions',
    'customers'
  ]
})

const store = new Vuex.Store({
  modules: {
    app: AppModule,
    auth,
    machines,
    users,
    departments,
    divisions,
    customers
  },
  plugins: [axiosPlugin, dataState]
})

export default store
