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
      <v-col cols="12" md="4">
        <t50-running
          :loading="loadingT50Runnings"
          :states="t50Runnings"
        >
        </t50-running>
      </v-col>
      <v-col cols="12" md="4">
        <t50-hours
          :loading="loadingT50Hours"
          :hours="t50Hours"
        >
        </t50-hours>
      </v-col>
      <v-col cols="12" md="4">
        <bar-graph
          namespace="barGraph-t50-id1"
          title="Bearing Temperature"
          :height="320"
          unit="ºC"
          :fetch="getT50BearingTemp"
          :options="tempOptions"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :categories="[['Bearing', 'Temp 1'], ['Bearing', 'Temp 2']]"
        >
        </bar-graph>
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
import T50Running from './components/T50Running'
import T50Hours from './components/T50Hours'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AreaGraph,
    BarGraph,
    Overview,
    T50Running,
    T50Hours
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
      getT50BearingTemp: api.getT50BearingTemp,
      tempOptions: {
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '30%',
            dataLabels: {
              position: 'top'
            },
            endingShape: 'rounded'
          }
        }
      }
    }
  },
  computed: {
    ...mapState('t50', [
      'loadingT50Runnings',
      'loadingT50Hours',
      't50Runnings',
      't50Hours'
    ])
  },
  mounted() {
    this.getRunnings({ serialNumber: this.serialNumber })
    this.getHours({ serialNumber: this.serialNumber })
  },
  methods: {
    ...mapActions('t50', [
      'getRunnings',
      'getHours'
    ])
  }
}
</script>