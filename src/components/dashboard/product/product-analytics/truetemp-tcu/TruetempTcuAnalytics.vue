<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <overview
          namespace="overview-id11"
          :product-id="parseInt(productId)"
          :fetch="getOverview"
          :is-additional="isAdditional"
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
import commonApi from '../../common/fetches/api'

import BarGraph from '../../common/bar-graph/BarGraph'
import Overview from '../../common/overview/Overview'
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
      getActTgtTemperatures: api.getActTgtTemperatures,
      getOverview: commonApi.getOverview
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
      id: this.productId,
      isAdditional: this.isAdditional
    })
  },
  methods: {
    ...mapActions({
      getSystemStates: 'truetempTcu/getSystemStates'
    })
  }
}
</script>