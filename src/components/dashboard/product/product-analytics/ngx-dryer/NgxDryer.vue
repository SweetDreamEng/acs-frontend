<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <overview
          namespace="overview-id6"
          :product-id="parseInt(productId)"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-ngxDryer-utilization"
          title="Capacity Utilization"
          :height="220"
          unit="%"
          :fetch="getUtilization"
          :product-id="parseInt(productId)"
          :names="['Utilization']"
        >
        </area-graph>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-ngxDryer-consumption"
          title="Energy Consumption"
          :height="220"
          unit="kWH"
          :fetch="getEnergyConsumption"
          :product-id="parseInt(productId)"
          :names="['Energy Consumption']"
        >
        </area-graph>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" md="4">
        <drying-hopper-states
          :loading="loadingDryingHoppers"
          :drying-hoppers="dryingHoppers"
        >
        </drying-hopper-states>
      </v-col>
      <v-col cols="12" md="8">
        <bar-graph
          namespace="barGraph-ngxDryer-id1"
          title="Hopper Air Temperatures"
          :height="320"
          :fetch="getHopperTemperatures"
          :product-id="parseInt(productId)"
          :names="['Outlet Temperature', 'Inlet Temperature', 'Set Point']"
          :categories="hopperAirTemperatureCategories"
        >
        </bar-graph>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" md="4">
        <area-graph
          namespace="areaGraph-ngxDryer-dew-temperature"
          title="Dew Point Temperature"
          :height="220"
          unit="ºC"
          :fetch="getDewPointTemperature"
          :product-id="parseInt(productId)"
          :names="['Dew Point Temperature']"
        >
        </area-graph>
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
import DryingHopperStates from './components/DryingHopperStates'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    BarGraph,
    AreaGraph,
    Overview,
    DryingHopperStates
  },
  props: {
    productId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      getHopperTemperatures: api.getHopperTemperatures,
      getDewPointTemperature: api.getDewPointTemperature,
      getOverview: commonApi.getOverview,
      getUtilization: commonApi.getUtilization,
      getEnergyConsumption: commonApi.getEnergyConsumption
    }
  },
  computed: {
    ...mapState('ngxDryer', [
      'dryingHoppers',
      'loadingDryingHoppers'
    ]),
    hopperAirTemperatureCategories() {
      return ['Hopper 1', 'Hopper 2', 'Hopper 3']
    }
  },
  mounted() {
    this.getDryingHopperStats(this.productId)
  },
  methods: {
    ...mapActions('ngxDryer', [
      'getDryingHopperStats'
    ])
  }
}
</script>