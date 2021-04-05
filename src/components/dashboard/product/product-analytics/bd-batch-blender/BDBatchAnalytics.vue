<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="4">
        <overview
          namespace="overview-id1"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col v-if="parameters.includes(1)" cols="12" md="4">
        <area-graph
          namespace="areaGraph-dbBlender-utilization"
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
          namespace="areaGraph-dbBlender-consumption"
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
      <v-col v-if="parameters.includes(3)" cols="12" md="8">
        <bar-graph
          namespace="barGraph-dbBlender-id1"
          title="Target Weights vs Actual Weights"
          :height="360"
          :fetch="getWeight"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :names="['Actual', 'Target']"
          :categories="['Hopper 1', 'Hopper 2', 'Hopper 3', 'Hopper 4', 'Hopper 5', 'Hopper 6', 'Hopper 7', 'Hopper 8']"
        >
        </bar-graph>
      </v-col>
      <v-col v-if="parameters.includes(5)" cols="12" md="4">
        <batch-blender-recipe
          :loading="loadingRecipe"
          :recipes="recipeValues"
          :ez-types="ezTypes"
          :mode="recipeMode"
          @reload="getRecipe({ serialNumber })"
        >
        </batch-blender-recipe>
      </v-col>
      <v-col v-if="parameters.includes(4)" cols="12">
        <batch-blender-inventory-hoppers
          :serial-number="serialNumber"
          @reload="getInventory({ serialNumber })"
        >
        </batch-blender-inventory-hoppers>
      </v-col>
      <v-col v-if="parameters.includes(4)" cols="12">
        <batch-blender-inventory-reports
          :serial-number="serialNumber"
          @reload="getInventory({ serialNumber })"
        >
        </batch-blender-inventory-reports>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import api from './services/api'
import commonApi from '../../common/fetches/api'

import BarGraph from '../../common/bar-graph/ProductBarGraph'
import AreaGraph from '../../common/area-graph/ProductAreaGraph'
import Overview from '../../common/overview/ProductOverview'
import BatchBlenderRecipe from './components/BatchBlenderRecipe'
import BatchBlenderInventoryReports from './components/BatchBlenderInventoryReports'
import BatchBlenderInventoryHoppers from './components/BatchBlenderInventoryHoppers'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BarGraph,
    AreaGraph,
    Overview,
    BatchBlenderRecipe,
    BatchBlenderInventoryReports,
    BatchBlenderInventoryHoppers
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
      getWeight: api.getWeight,
      getOverview: commonApi.getOverview,
      getUtilization: commonApi.getUtilization,
      getEnergyConsumption: commonApi.getEnergyConsumption
    }
  },
  computed: {
    ...mapState('bdBlenderAnalytics', [
      'loadingRecipe',
      'recipeValues',
      'ezTypes',
      'recipeMode'
    ])
  },
  mounted() {
    this.getRecipe({ serialNumber: this.serialNumber })
  },
  methods: {
    ...mapActions('bdBlenderAnalytics', [
      'getRecipe',
      'getInventory'
    ])
  }
}
</script>