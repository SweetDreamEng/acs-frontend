<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <overview
          namespace="overview-id3"
          :product-id="parseInt(productId)"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-gh-utilization"
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
          namespace="areaGraph-gh-consumption"
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
      <v-col md="4" sm="12">
        <machine-states :loading="loadingMachineStates" :machine-states="machineStates"></machine-states>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-gh-inventory"
          title="Accumulated Hopper Inventory"
          :height="220"
          :fetch="getHopperInventories"
          :product-id="parseInt(productId)"
          :names="['Accumulated Hopper Inventory']"
        >
        </area-graph>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-gh-hauloff-length"
          title="Accumulated Hauloff Length"
          :height="220"
          :fetch="getHauloffLengths"
          :product-id="parseInt(productId)"
          :names="['Accumulated Hauloff Length']"
        >
        </area-graph>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import api from './services/api'
import commonApi from '../../common/fetches/api'

import AreaGraph from '../../common/area-graph/AreaGraph'
import Overview from '../../common/overview/Overview'
import MachineStates from './components/MachineStates'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AreaGraph,
    Overview,
    MachineStates
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
      getHopperInventories: api.getHopperInventories,
      getHauloffLengths: api.getHauloffLengths
    }
  },
  computed: {
    ...mapState({
      loadingMachineStates: (state) => state.ghGravimetricControlHopper.loadingSystemStates,
      machineStates: (state) => state.ghGravimetricControlHopper.systemStates
    })
  },
  mounted() {
    this.getMachineStates(this.productId)
  },
  methods: {
    ...mapActions({
      getMachineStates: 'ghGravimetricControlHopper/getMachineStates'
    })
  }
}
</script>