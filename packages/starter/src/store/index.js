import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import AppModule from './app'
import machines from './machines'
import users from './users'
import departments from './departments'
import divisions from './divisions'

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    app: AppModule,
    machines,
    users,
    departments,
    divisions
  }
})

export default store
