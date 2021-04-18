<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="4">
        <overview
          namespace="overview-id11"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col v-if="parameters.includes(3)" cols="12" md="4">
        <area-graph
          namespace="areaGraph-trueTemp-utilization"
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
      <v-col v-if="parameters.includes(1)" cols="12" md="4">
        <machine-state
          :loading="loadingMachineState"
          :machine="machineState"
        ></machine-state>
      </v-col>
      <v-col v-if="parameters.includes(2)" cols="12" md="4">
        <bar-graph
          namespace="barGraph-id1"
          title="TCU Temperature"
          :height="320"
          unit="ºC"
          :fetch="getActTgtTemperatures"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :categories="['Actual Delivery Temperature', 'Actual Return Temperature', 'Target Setpoint 1']"
          :options="temperatureOptions"
        >
        </bar-graph>
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
import MachineState from './components/TruetempTcuMachineState'

import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Overview,
    MachineState,
    BarGraph,
    AreaGraph
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
      getOverview: commonApi.getOverview,
      temperatureOptions: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '40%',
            dataLabels: {
              position: 'top'
            },
            distributed: true,
            space: 0.25,
            endingShape: 'rounded'
          }
        },
        colors: ['#1c526b', '#cf5717', '#b5880d'],
        fill: {
          colors: ['#1c526b', '#cf5717', '#b5880d']
        },
        xaxis: {
          categories: ['Actual Delivery Temperature', 'Actual Return Temperature', 'Target Setpoint 1'],
          labels: {
            show: false
          }
        }
      },
      getActTgtTemperatures: api.getActTgtTemperatures,
      getUtilization: commonApi.getUtilization
    }
  },
  computed: {
    ...mapState({
      loadingMachineState: (state) => state.truetempTcu.loadingMachineState,
      machineState: (state) => state.truetempTcu.machineState
    })
  },
  mounted() {
    this.getSystemStates({
      machineId: this.machineId,
      serialNumber: this.serialNumber
    })
  },
  methods: {
    ...mapActions({
      getSystemStates: 'truetempTcu/getSystemStates'
    })
  }
}
</script>