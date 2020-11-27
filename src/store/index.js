import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import AppModule from './app'
import auth from './auth'
import customers from './customers'
import machines from './machines'
import users from './users'
import zones from './zones'
import locations from './locations'
import devices from './devices'
import cities from './cities'
import roles from './roles'

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
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
  }
})

export default store
