<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="4">
        <overview
          namespace="overview-id9"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col cols="12" md="4">
        <area-graph
          namespace="areaGraph-gpPortable-utilization"
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
          namespace="areaGraph-gpPortable-consumption"
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
        <bar-graph
          namespace="barGraph-portableChiller-id1"
          title="Process out temperature"
          :height="220"
          unit="ºC"
          :fetch="getProcessOutTemperature"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :categories="['Chiller set point', 'Chiller out temperature']"
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

import AreaGraph from '../../common/area-graph/ProductAreaGraph'
import BarGraph from '../../common/bar-graph/ProductBarGraph'
import Overview from '../../common/overview/ProductOverview'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AreaGraph,
    BarGraph,
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
      getEnergyConsumption: commonApi.getEnergyConsumption,
      getProcessOutTemperature: api.getProcessOutTemperature,

      temperatureOptions: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '30%',
            dataLabels: {
              position: 'top'
            },
            distributed: true,
            space: 0.25,
            endingShape: 'rounded'
          }
        },
        colors: ['#1c526b', '#cf5717'],
        fill: {
          colors: ['#1c526b', '#cf5717']
        },
        xaxis: {
          categories: ['Chiller set point', 'Chiller out temperature'],
          labels: {
            show: false
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