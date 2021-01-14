import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import AppModule from './app'
import auth from './auth'
import customers from './customers'
import machines from './machines'
import settings from './settings'
import users from './users'
import zones from './zones'
import locations from './locations'
import devices from './devices'
import cities from './cities'
import roles from './roles'
import alarms from './alarms'
import notes from './notes'
import configurations from './configurations'

import bdBlenderAnalytics from '../components/dashboard/product/product-analytics/bd-batch-blender/store'
import accumeterOvationBlender from '../components/dashboard/product/product-analytics/accumeter-ovation-continuous-blender/store'
import ngxDryer from '../components/dashboard/product/product-analytics/ngx-dryer/store'
import vtcPlusConveying from '../components/dashboard/product/product-analytics/vtc-plus-conveying-system/store'
import truetempTcu from '../components/dashboard/product/product-analytics/truetemp-tcu/store'

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
    settings,
    locations,
    customers,
    devices,
    cities,
    roles,
    alarms,
    notes,
    configurations,
    
    bdBlenderAnalytics,
    accumeterOvationBlender,
    ngxDryer,
    vtcPlusConveying,
    truetempTcu
  }
})

export default store
