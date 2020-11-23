import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Global vuex
import AppModule from './app'
import auth from './auth'
import machines from './machines'
import users from './users'
import zones from './zones'
import locations from './locations'
import customers from './customers'
import devices from './devices'
import cities from './cities'
import roles from './roles'

Vue.use(Vuex)

const axios = require('axios')

// axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_ENDPOINT
axios.defaults.baseURL = 'http://localhost/acs-api/public/api'
// axios.defaults.baseURL = 'http://157.230.210.3/api'

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
    'zones',
    'locations',
    'customers',
    'devices',
    'cities',
    'roles'
  ]
})

const store = new Vuex.Store({
  modules: {
    app: AppModule,
    auth,
    machines,
    users,
    zones,
    locations,
    customers,
    devices,
    cities,
    roles
  },
  plugins: [axiosPlugin, dataState]
})

export default store
