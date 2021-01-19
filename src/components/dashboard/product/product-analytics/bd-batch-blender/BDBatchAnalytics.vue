<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <overview
          namespace="overview-id1"
          :product-id="parseInt(productId)"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-dbBlender-utilization"
          title="Capacity Utilization"
          :height="220"
          :fetch="getUtilization"
          :product-id="parseInt(productId)"
          :names="['Utilization']"
        >
        </area-graph>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-dbBlender-consumption"
          title="Energy Consumption"
          :height="220"
          :fetch="getEnergyConsumption"
          :product-id="parseInt(productId)"
          :names="['Energy Consumption']"
        >
        </area-graph>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="8" sm="12">
        <bar-graph
          namespace="barGraph-id1"
          title="Actual Target Weight"
          :height="360"
          :fetch="getWeight"
          :product-id="parseInt(productId)"
          :names="['Actual', 'Target']"
          :categories="['Feeder 1', 'Feeder 2', 'Feeder 3', 'Feeder 4', 'Feeder 5', 'Feeder 6', 'Feeder 7', 'Feeder 8']"
        >
        </bar-graph>
      </v-col>
      <v-col md="4" sm="12">
        <recipe
          :loading="loadingRecipe"
          :recipes="recipeValues"
          :ez-types="ezTypes"
          :mode="recipeMode"
        >
        </recipe>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <inventory
          :is-loading="loadingInventories"
          :inventories="inventories"
        >
        </inventory>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import api from './services/api'
import commonApi from '../../common/fetches/api'

import BarGraph from '../../common/bar-graph/BarGraph'
import AreaGraph from '../../common/area-graph/AreaGraph'
import Overview from '../../common/overview/Overview'
import Recipe from './components/Recipe'
import Inventory from './components/Inventory'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BarGraph,
    AreaGraph,
    Overview,
    Recipe,
    Inventory
  },
  props: {
    productId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      getWeight: api.getWeight,
      getOverview: commonApi.getOverview,
      getUtilization: commonApi.getUtilization,
      getEnergyConsumption: commonApi.getEnergyConsumption
    }
  },
  computed: {
    ...mapState('bdBlenderAnalytics', [
      'loadingInventories',
      'loadingRecipe',
      'inventories',
      'recipeValues',
      'ezTypes',
      'recipeMode'
    ])
  },
  mounted() {
    this.getRecipe(this.productId)
    this.getInventory(this.productId)
  },
  methods: {
    ...mapActions('bdBlenderAnalytics', [
      'getInventory',
      'getRecipe'
    ])
  }
}
</script>