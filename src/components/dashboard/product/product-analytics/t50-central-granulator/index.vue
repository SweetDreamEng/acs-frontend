<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="4">
        <overview
          namespace="overview-id8"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col cols="12" md="4">
        <area-graph
          namespace="areaGraph-t50-utilization"
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
          namespace="areaGraph-t50-consumption"
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
      <v-col cols="12" md="8">
      </v-col>
      <v-col cols="12" md="4">
      </v-col>
    </v-row>
  </div>
</template>
<script>
import commonApi from '../../common/fetches/api'

import AreaGraph from '../../common/area-graph/AreaGraph'
import Overview from '../../common/overview/Overview'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AreaGraph,
    Overview
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
      getEnergyConsumption: commonApi.getEnergyConsumption
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  }
}
</script>