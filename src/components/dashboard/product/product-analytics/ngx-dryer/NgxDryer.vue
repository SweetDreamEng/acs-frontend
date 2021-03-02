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
        <drying-hopper-states
          :loading="loadingDryingHoppers"
          :drying-hoppers="dryingHoppers"
        >
        </drying-hopper-states>
      </v-col>
      <v-col cols="12" md="8">
        <bar-graph
          namespace="barGraph-ngxDryer-id1"
          title="Hopper Air Temperatures"
          :height="320"
          :fetch="getHopperTemperatures"
          :machine-id="machineId"
          :serial-number="serialNumber"
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
import api from './services/api'
import commonApi from '../../common/fetches/api'

import BarGraph from '../../common/bar-graph/ProductBarGraph'
import AreaGraph from '../../common/area-graph/ProductAreaGraph'
import Overview from '../../common/overview/ProductOverview'
import DryingHopperStates from './components/DryingHopperStates'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    BarGraph,
    AreaGraph,
    Overview,
    DryingHopperStates
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
      getEnergyConsumption: commonApi.getEnergyConsumption
    }
  },
  computed: {
    ...mapState('ngxDryer', [
      'dryingHoppers',
      'loadingDryingHoppers'
    ]),
    hopperAirTemperatureCategories() {
      return ['Hopper 1', 'Hopper 2', 'Hopper 3']
    }
  },
  mounted() {
    this.getDryingHopperStats({ serialNumber: this.serialNumber, machineId: this.machineId })
  },
  methods: {
    ...mapActions('ngxDryer', [
      'getDryingHopperStats'
    ])
  }
}
</script>