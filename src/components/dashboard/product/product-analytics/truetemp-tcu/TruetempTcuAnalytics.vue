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
          :categories="[['Actual Return', 'Temperature'], ['Actual Return', 'Temperature'], ['Target', 'Setpoint 1']]"
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
import Overview from '../../common/overview/ProductOverview'
import MachineState from './components/MachineState'

import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Overview,
    MachineState,
    BarGraph
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
      },
      getActTgtTemperatures: api.getActTgtTemperatures
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