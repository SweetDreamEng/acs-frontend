<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <overview
          namespace="overview-id2"
          :product-id="parseInt(productId)"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-accumeterBlender-utilization"
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
          namespace="areaGraph-accumeterBlender-consumption"
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
      <v-col md="4" sm="12">
        <machine-state :loading="loadingSystemStates" :system-states="systemStates"></machine-state>
      </v-col>
      <v-col md="4" sm="12">
        <feeder-stable :loading="loadingFeederStables" :feeders="feederStables"></feeder-stable>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-accumeterBlender-rate"
          title="Process Rate"
          :height="220"
          :fetch="getProductionRate"
          :product-id="parseInt(productId)"
          :names="['Process Rate']"
        >
        </area-graph>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="8" sm="12">
        <bar-graph
          namespace="barGraph-id2"
          title="Actual Target Recipe"
          :height="360"
          :fetch="getRecipe"
          :product-id="parseInt(productId)"
          :names="['Actual', 'Target']"
          :categories="['Feeder 1', 'Feeder 2', 'Feeder 3', 'Feeder 4', 'Feeder 5', 'Feeder 6']"
        >
        </bar-graph>
      </v-col>
      <v-col md="4" sm="12">
      </v-col>
    </v-row>
  </div>
</template>
<script>
import api from './services/api'
import commonApi from '../../common/fetches/api'

import Overview from '../../common/overview/Overview'
import AreaGraph from '../../common/area-graph/AreaGraph'
import BarGraph from '../../common/bar-graph/BarGraph'
import MachineState from './components/MachineState'
import FeederStable from './components/FeederStable'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AreaGraph,
    BarGraph,
    Overview,
    MachineState,
    FeederStable
  },
  props: {
    productId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      getOverview: commonApi.getOverview,
      getUtilization: commonApi.getUtilization,
      getEnergyConsumption: commonApi.getEnergyConsumption,
      getProductionRate: api.getProductionRate,
      getRecipe: api.getRecipe
    }
  },
  computed: {
    ...mapState('accumeterOvationBlender', [
      'loadingSystemStates',
      'loadingFeederStables',
      'systemStates',
      'feederStables'
    ])
  },
  mounted() {
    this.getFeederStables(this.productId)
  },
  methods: {
    ...mapActions('accumeterOvationBlender', [
      'getSystemStates',
      'getFeederStables'
    ])
  }
}
</script>