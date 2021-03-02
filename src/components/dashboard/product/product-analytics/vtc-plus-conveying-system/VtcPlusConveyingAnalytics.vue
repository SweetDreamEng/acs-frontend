<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="4">
        <overview
          namespace="overview-id5"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col cols="12" md="4">
        <area-graph
          namespace="areaGraph-vtc-utilization"
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
          namespace="areaGraph-vtc-consumption"
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
      <v-col cols="12" md="6">
        <bar-graph
          namespace="barGraph-vtc-id1"
          title="Pump Hours"
          :height="500"
          :fetch="getPumpHours"
          unit="h"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :categories="pumpHoursOilCategories"
        >
        </bar-graph>
      </v-col>
      <v-col cols="12" md="6">
        <bar-graph
          namespace="barGraph-vtc-id2"
          title="Pump Hours Oil Change"
          :height="500"
          :fetch="getPumpHoursOil"
          unit="h"
          :names="['Actual', 'Target']"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :categories="pumpHoursOilCategories"
        >
        </bar-graph>
      </v-col>
      <v-col cols="12" md="6">
        <bar-graph
          namespace="barGraph-vtc-id3"
          title="Online Life"
          :height="500"
          :fetch="getPumpOnlineLife"
          unit="%"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :categories="pumpHoursOilCategories"
        >
        </bar-graph>
      </v-col>
      <v-col cols="12" md="6">
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

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BarGraph,
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
    },
    parameters: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      getPumpHours: api.getPumpHours,
      getPumpHoursOil: api.getPumpHoursOil,
      getPumpOnlineLife: api.getPumpOnlineLife,
      getOverview: commonApi.getOverview,
      getUtilization: commonApi.getUtilization,
      getEnergyConsumption: commonApi.getEnergyConsumption
    }
  },
  computed: {
    pumpHoursOilCategories() {
      return ['Pump 1', 'Pump 2', 'Pump 3', 'Pump 4', 'Pump 5', 'Pump 6', 'Pump 7', 'Pump 8', 'Pump 9', 'Pump 10', 'Pump 11', 'Pump 12']
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>