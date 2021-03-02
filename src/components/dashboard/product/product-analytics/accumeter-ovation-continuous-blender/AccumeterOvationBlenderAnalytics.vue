<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <overview
          namespace="overview-id2"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col v-if="parameters.includes(1)" cols="12" md="4">
        <area-graph
          namespace="areaGraph-accumeterBlender-utilization"
          title="Capacity Utilization"
          :height="220"
          unit="%"
          :fetch="getUtilization"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :names="['Utilization']"
        >
        </area-graph>
      </v-col>
      <v-col v-if="parameters.includes(2)" cols="12" md="4">
        <area-graph
          namespace="areaGraph-accumeterBlender-consumption"
          title="Energy Consumption"
          :height="220"
          unit="kWH"
          :fetch="getEnergyConsumption"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :names="['Energy Consumption']"
        >
        </area-graph>
      </v-col>
      <v-col v-if="parameters.includes(3)" cols="12" md="4">
        <machine-state :loading="loadingSystemStates" :system-states="systemStates"></machine-state>
      </v-col>
      <v-col v-if="parameters.includes(4)" cols="12" md="4">
        <feeder-stable :loading="loadingFeederStables" :feeders="feederStables"></feeder-stable>
      </v-col>
      <v-col v-if="parameters.includes(5)" md="4" sm="12">
        <area-graph
          namespace="areaGraph-accumeterBlender-rate"
          title="Process Rate"
          :height="220"
          unit="imperial-metric"
          :fetch="getProductionRate"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :names="['Process Rate']"
        >
        </area-graph>
      </v-col>
      <v-col v-if="parameters.includes(6)" cols="12" md="8">
        <bar-graph
          namespace="barGraph-accumeterBlender-recipe"
          :persist="false"
          title="Actual Target Recipe"
          :height="360"
          :fetch="getRecipe"
          :machine-id="machineId"
          :serial-number="serialNumber"
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

import Overview from '../../common/overview/ProductOverview'
import AreaGraph from '../../common/area-graph/ProductAreaGraph'
import BarGraph from '../../common/bar-graph/ProductBarGraph'
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
    machineId: {
      type: Number,
      default: 0
    },
    serialNumber: {
      type: Number,
      default: 0
    },
    parameters: {
      type: Array,
      default: () => []
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
    this.getSystemStates({
      machineId: this.machineId,
      serialNumber: this.serialNumber
    })
    this.getFeederStables({ serialNumber: this.serialNumber })
  },
  methods: {
    ...mapActions('accumeterOvationBlender', [
      'getSystemStates',
      'getFeederStables'
    ])
  }
}
</script>