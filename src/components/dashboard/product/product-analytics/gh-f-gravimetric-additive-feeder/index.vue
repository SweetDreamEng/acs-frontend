<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <overview
          namespace="overview-id4"
          :product-id="parseInt(productId)"
          :serial-number="serialNumber"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-gh-f-utilization"
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
          namespace="areaGraph-gh-f-consumption"
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
      <v-col md="8" sm="12">
      </v-col>
      <v-col md="4" sm="12">
      </v-col>
    </v-row>
  </div>
</template>
<script>
import commonApi from '../../common/fetches/api'

import AreaGraph from '../../common/area-graph/AreaGraph'
import Overview from '../../common/overview/Overview'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    AreaGraph,
    Overview
  },
  props: {
    productId: {
      type: String,
      default: ''
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
  methods: {
  }
}
</script>