<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <overview
          namespace="overview-id9"
          :product-id="parseInt(productId)"
          :serial-number="serialNumber"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-gpPortable-utilization"
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
          namespace="areaGraph-gpPortable-consumption"
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
        <bar-graph
          namespace="barGraph-portableChiller-id1"
          title="Process out temperature"
          :height="220"
          unit="ºC"
          :fetch="getProcessOutTemperature"
          :product-id="parseInt(productId)"
          :categories="[['Actual', 'Temperature'], ['Target', 'Temperature']]"
          :options="temperatureOptions"
        >
        </bar-graph>
      </v-col>
      <v-col cols="12" md="4">
      </v-col>
    </v-row>
  </div>
</template>
<script>
import commonApi from '../../common/fetches/api'
import api from './services/api'

import AreaGraph from '../../common/area-graph/AreaGraph'
import BarGraph from '../../common/bar-graph/BarGraph'
import Overview from '../../common/overview/Overview'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AreaGraph,
    BarGraph,
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
      getEnergyConsumption: commonApi.getEnergyConsumption,
      getProcessOutTemperature: api.getProcessOutTemperature,

      temperatureOptions: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '20%',
            dataLabels: {
              position: 'top'
            },
            space: 0.25,
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          textAnchor: 'middle',
          offsetY: -20,
          style: {
            colors: ['#000']
          }
        }
      }
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