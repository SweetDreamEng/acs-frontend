<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <overview
          :machine="overview"
          :loading="loadingOverview"
        >
        </overview>
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
          title="Actual Target Temperature"
          :height="320"
          :fetch="getActTgtTemperatures"
          :product-id="parseInt(productId)"
          :categories="['Actual', 'Set point']"
          :options="temperatureOptions"
        >
        </bar-graph>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import api from './services/api'
import BarGraph from '../../common/bar-graph/BarGraph'
import Overview from '../common/components/Overview'
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
            horizontal: true,
            barHeight: '20%',
            dataLabels: {
              position: 'top'
            },
            endingShape: 'rounded'
          }
        }
      },
      getActTgtTemperatures: api.getActTgtTemperatures
    }
  },
  computed: {
    ...mapState({
      loadingOverview: (state) => state.truetempTcu.loadingOverview,
      loadingMachineState: (state) => state.truetempTcu.loadingMachineState,

      overview: (state) => state.truetempTcu.overview,
      machineState: (state) => state.truetempTcu.machineState
    })
  },
  mounted() {
    this.getOverview({
      id: this.productId,
      isAdditional: this.isAdditional
    })
    this.getSystemStates({
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