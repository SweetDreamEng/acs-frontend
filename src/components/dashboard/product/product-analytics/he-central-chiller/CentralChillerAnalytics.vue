<template>
  <div>
    <div class="">
      <v-select
        :items="circuits"
        v-model="circuitId"
        item-text="text"
        item-value="id"
        placeholder="Select Circuit"
        dense
        outlined
        hide-details
        style="width: 160px;"
        class="ml-auto mb-1"
        @change="onCircuitChange"
      ></v-select>
    </div>
    <v-row dense>
      <v-col md="4" sm="12">
        <overview
          namespace="overview-id10"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-centralChiller-utilization"
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
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-centralChiller-consumption"
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
      <v-col md="4" sm="12">
        <bar-graph
          namespace="barGraph-centralChiller-id1"
          title="Chiller temperature"
          :height="220"
          unit="ºC"
          :fetch="getChillerTemperature"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :circuit-id="circuitId"
          :categories="[['Chill In', 'Temperature'], ['Chill Out', 'Temperature']]"
          :options="temperatureOptions"
        >
        </bar-graph>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import commonApi from '../../common/fetches/api'
import api from './services/api'

import Overview from '../../common/overview/Overview'
import BarGraph from '../../common/bar-graph/BarGraph'
import AreaGraph from '../../common/area-graph/AreaGraph'

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
    }
  },
  data() {
    return {
      getOverview: commonApi.getOverview,
      getUtilization: commonApi.getUtilization,
      getEnergyConsumption: commonApi.getEnergyConsumption,
      getChillerTemperature: api.getChillerTemperature,

      circuits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => {
        return {
          id: n,
          text: `Circuit ${n}`
        }
      }),
      circuitId: 1,
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
          },
          formatter: (value, { seriesIndex, dataPointIndex, w }) => {
            return value + 'ºC'
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
    ...mapActions({
      getOverviewAction(dispatch, payload) {
        return dispatch('overview-id10/getOverview', payload)
      },
      getChillerTemperatureAction(dispatch, payload) {
        return dispatch('barGraph-centralChiller-id1/getSeries', payload)
      }
    }),
    onCircuitChange() {
      this.getOverviewAction({
        machineId: this.machineId,
        serialNumber: this.serialNumber,
        circuitId: this.circuitId
      })
      this.getChillerTemperatureAction({
        serialNumber: this.serialNumber,
        circuitId: this.circuitId
      })
    }
  }
}
</script>