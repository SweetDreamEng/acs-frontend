<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="4">
        <overview
          namespace="overview-id3"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col cols="12" md="4">
        <area-graph
          namespace="areaGraph-gh-utilization"
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
      <v-col cols="12" md="4">
        <area-graph
          namespace="areaGraph-gh-consumption"
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
      <v-col cols="12" md="4">
        <machine-states :loading="loadingMachineStates" :machine-states="machineStates"></machine-states>
      </v-col>
      <v-col cols="12" md="4">
        <area-graph
          namespace="areaGraph-gh-inventory"
          title="Accumulated Hopper Inventory"
          :height="220"
          :fetch="getHopperInventories"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :names="['Accumulated Hopper Inventory']"
        >
        </area-graph>
      </v-col>
      <v-col cols="12" md="4">
        <area-graph
          namespace="areaGraph-gh-hauloff-length"
          title="Accumulated Hauloff Length"
          :height="220"
          :fetch="getHauloffLengths"
          :machine-id="machineId"
          :serial-number="serialNumber"
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

import AreaGraph from '../../common/area-graph/ProductAreaGraph'
import Overview from '../../common/overview/ProductOverview'
import MachineStates from './components/MachineStates'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AreaGraph,
    Overview,
    MachineStates
  },
  props: {
    machineId: {
      type: Number,
      default: 0
    },
    serialNumber: {
      type: Number,
      default: 0
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
    this.getMachineStates({ serialNumber: this.serialNumber })
  },
  methods: {
    ...mapActions({
      getMachineStates: 'ghGravimetricControlHopper/getMachineStates'
    })
  }
}
</script>