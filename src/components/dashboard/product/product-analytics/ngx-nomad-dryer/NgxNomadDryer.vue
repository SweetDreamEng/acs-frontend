<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="4">
        <overview
          namespace="overview-id6"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col cols="12" md="4">
        <area-graph
          namespace="areaGraph-ngxDryer-utilization"
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
          namespace="areaGraph-ngxDryer-consumption"
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
        <hopper-states
          :loading="loadingStates"
          :hopper-states="hopperStates"
          @reload="getDryingHopperStates({ serialNumber })"
        >
        </hopper-states>
      </v-col>
      <v-col cols="12" md="8">
        <bar-graph
          namespace="barGraph-ngxDryer-id1"
          title="Hopper Air Temperatures"
          :height="320"
          :fetch="getHopperTemperatures"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :options="temperatureOptions"
          :names="['Outlet Temperature', 'Inlet Temperature', 'Set Point']"
          :categories="hopperAirTemperatureCategories"
        >
        </bar-graph>
      </v-col>
      <v-col cols="12" md="6">
        <area-graph
          namespace="areaGraph-ngxDryer-dew-temperature"
          title="Dew Point Temperature"
          :height="220"
          unit="ºC"
          :fetch="getDewPointTemperature"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :names="['Dew Point Temperature']"
        >
        </area-graph>
      </v-col>
      <v-col cols="12" md="6">
        <area-graph
          namespace="areaGraph-ngxDryer-region-temperature"
          title="Regen Temperatures"
          :height="220"
          unit="ºC"
          :fetch="getRegionAirTemperature"
          :machine-id="machineId"
          :serial-number="serialNumber"
        >
        </area-graph>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import api from '../ngx-dryer/services/api'
import commonApi from '../../common/fetches/api'

import BarGraph from '../../common/bar-graph/ProductBarGraph'
import AreaGraph from '../../common/area-graph/ProductAreaGraph'
import Overview from '../../common/overview/ProductOverview'
import HopperStates from '../ngx-nomad-dryer/components/HopperStates'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    BarGraph,
    AreaGraph,
    Overview,
    HopperStates
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
      getHopperTemperatures: api.getHopperTemperatures,
      getDewPointTemperature: api.getDewPointTemperature,
      getRegionAirTemperature: api.getRegionAirTemperature,
      getOverview: commonApi.getOverview,
      getUtilization: commonApi.getUtilization,
      getEnergyConsumption: commonApi.getEnergyConsumption,

      temperatureOptions: {
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: '10%',
            dataLabels: {
              position: 'top'
            },
            space: 0.25,
            endingShape: 'rounded'
          }
        },
        stroke: {
          show: true,
          width: 6,
          colors: ['#fff']
        }
      }
    }
  },
  computed: {
    ...mapState('ngxNomadDryer', [
      'hopperStates',
      'loadingStates'
    ]),
    hopperAirTemperatureCategories() {
      return ['']
    }
  },
  mounted() {
    this.getDryingHopperStates({ serialNumber: this.serialNumber })
  },
  methods: {
    ...mapActions('ngxNomadDryer', [
      'getDryingHopperStates'
    ])
  }
}
</script>