<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <Overview
          :loading="loadingOverview"
          :overview="overview"
        >
        </Overview>
      </v-col>
      <v-col md="4" sm="12">
        <machine-state
          :loading="loadingMachineState"
          :machine="machineState"
        ></machine-state>
      </v-col>
      <v-col md="4" sm="12">
        <bar-graph
          namespace="barGraph-id1"
          title="TCU Temperature"
          :height="320"
          unit="ºC"
          :fetch="getActTgtTemperatures"
          :product-id="parseInt(productId)"
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

import BarGraph from '../../common/bar-graph/BarGraph'
import Overview from './components/Overview'
import MachineState from './components/MachineState'

import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Overview,
    MachineState,
    BarGraph
  },
  props: {
    productId: {
      type: String,
      default: ''
    },
    isAdditional: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showTimeRangeChooser: false,
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
      loadingOverview: (state) => state.truetempTcu.loadingOverview,

      overview: (state) => state.truetempTcu.overview,
      machineState: (state) => state.truetempTcu.machineState
    })
  },
  mounted() {
    this.getSystemStates({
      id: this.productId,
      isAdditional: this.isAdditional
    })
    this.getOverview({
      id: this.productId,
      isAdditional: this.isAdditional
    })
  },
  methods: {
    ...mapActions({
      getOverview: 'truetempTcu/getOverview',
      getSystemStates: 'truetempTcu/getSystemStates'
    })
  }
}
</script>