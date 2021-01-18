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
          title="Actual Target Temperature"
          :loading="loadingActTgtTemperatures"
          :height="320"
          unit="ºC"
          :series="actTgtTemperatureSeries"
          :categories="[['Actual', 'Temperature'], ['Set point', 'Temperature']]"
          :options="temperatureOptions"
        >
        </bar-graph>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Overview from '../common/components/Overview'
import MachineState from './components/MachineState'
import BarGraph from '../../common/BarGraph'

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
      }
    }
  },
  computed: {
    ...mapState({
      loadingOverview: (state) => state.truetempTcu.loadingOverview,
      loadingMachineState: (state) => state.truetempTcu.loadingMachineState,

      overview: (state) => state.truetempTcu.overview,
      machineState: (state) => state.truetempTcu.machineState,

      loadingActTgtTemperatures: (state) => state.truetempTcu.loadingActTgtTemperatures,
      actTgtTemperatures: (state) => state.truetempTcu.actTgtTemperatures
    }),
    actTgtTemperatureSeries() {
      return [{
        data: this.actTgtTemperatures
      }]
    }
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
    this.getActTgtTemperatures(this.productId)
  },
  methods: {
    ...mapActions({
      getOverview: 'truetempTcu/getOverview',
      getSystemStates: 'truetempTcu/getSystemStates',
      getActTgtTemperatures: 'truetempTcu/getActTgtTemperatures'
    })
  }
}
</script>