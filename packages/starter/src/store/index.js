import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import AppModule from './app'
import machines from './machines'

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    app: AppModule,
    machines
  }
})

export default store
