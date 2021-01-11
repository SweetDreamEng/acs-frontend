<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <feeder-calibration-factor
          :loading="loadingCalibrationFactors"
          :feeders="calibrationFactors"
        >
        </feeder-calibration-factor>
      </v-col>
      <v-col md="4" sm="12">
        <hopper-stable
          :loading="loadingHopperStables"
          :stables="hopperStables"
        >
        </hopper-stable>
      </v-col>
      <v-col md="4" sm="12">
        <bar-graph
          title="Station Conveying"
          :loading="loadingStationConveyings"
          :series="conveyingSeries"
          :categories="conveyingCategories"
        >
        </bar-graph>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import BarGraph from '../../common/BarGraph'
import HopperStable from './components/HopperStable'
import FeederCalibrationFactor from './components/FeederCalibrationFactor'
export default {
  components: {
    BarGraph,
    HopperStable,
    FeederCalibrationFactor
  },
  props: {
    productId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      conveyingCategories: ['Loader 1', 'Loader 2', 'Loader 3', 'Loader 4', 'Loader 5', 'Loader 6', 'Loader 7', 'Loader 8', 'Loader 9']
    }
  },
  computed: {
    ...mapState({
      loadingStationConveyings: (state) => state.bdBlenderAnalytics.loadingStationConveyings,
      loadingHopperStables: (state) => state.bdBlenderAnalytics.loadingHopperStables,
      loadingCalibrationFactors: (state) => state.bdBlenderAnalytics.loadingCalibrationFactors,

      stationConveyingSeries: (state) => state.bdBlenderAnalytics.stationConveyingSeries,
      hopperStables: (state) => state.bdBlenderAnalytics.hopperStables,
      calibrationFactors: (state) => state.bdBlenderAnalytics.calibrationFactors
    }),
    conveyingSeries() {
      return [{
        data: this.stationConveyingSeries
      }]
    }
  },
  created() {
    this.getStationConveyings(this.productId)
    this.getHopperStables(this.productId)
    this.getFeederCalibrationFactors(this.productId)
  },
  methods: {
    ...mapActions({
      getStationConveyings: 'bdBlenderAnalytics/getStationConveyings',
      getHopperStables: 'bdBlenderAnalytics/getHopperStables',
      getFeederCalibrationFactors: 'bdBlenderAnalytics/getFeederCalibrationFactors'
    })
  }
}
</script>