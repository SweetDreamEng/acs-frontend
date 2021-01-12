<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <!-- <load-cell-bits
          :loading="loadingCellBits"
          :bits="cellBits"
        >
        </load-cell-bits> -->
        <area-graph
          title="Process Rate"
          unit-string="kgs/hr"
          :loading="loadingProcessRates"
          :series="processRateSeries"
          :time-range-label="timeRangeLabel(processRateTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('process-rate')"
        >
        </area-graph>
      </v-col>
    </v-row>
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
    <time-range-chooser
      :dlg="showTimeRangeChooser"
      :time-range="selectedTimeRange"
      @close="showTimeRangeChooser = false"
      @submit="_onTimeRangeChanged"
    >
    </time-range-chooser>
  </div>
</template>
<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import BarGraph from '../../common/BarGraph'
import AreaGraph from '../../common/AreaGraph'
import HopperStable from './components/HopperStable'
import FeederCalibrationFactor from './components/FeederCalibrationFactor'
// import LoadCellBits from './components/LoadCellBits'
import TimeRangeChooser from '../../../TimeRangeChooser1'

export default {
  components: {
    BarGraph,
    AreaGraph,
    HopperStable,
    FeederCalibrationFactor,
    // LoadCellBits,
    TimeRangeChooser
  },
  props: {
    productId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showTimeRangeChooser: false,
      selectedTimeRange: this.processRateTimeRange,
      conveyingCategories: ['Loader 1', 'Loader 2', 'Loader 3', 'Loader 4', 'Loader 5', 'Loader 6', 'Loader 7', 'Loader 8', 'Loader 9']
    }
  },
  computed: {
    ...mapState({
      loadingStationConveyings: (state) => state.bdBlenderAnalytics.loadingStationConveyings,
      loadingHopperStables: (state) => state.bdBlenderAnalytics.loadingHopperStables,
      loadingCalibrationFactors: (state) => state.bdBlenderAnalytics.loadingCalibrationFactors,
      loadingCellBits: (state) => state.bdBlenderAnalytics.loadingCellBits,
      loadingProcessRates: (state) => state.bdBlenderAnalytics.loadingProcessRates,

      stationConveyingSeries: (state) => state.bdBlenderAnalytics.stationConveyingSeries,
      hopperStables: (state) => state.bdBlenderAnalytics.hopperStables,
      calibrationFactors: (state) => state.bdBlenderAnalytics.calibrationFactors,
      cellBits: (state) => state.bdBlenderAnalytics.cellBits,
      processRates: (state) => state.bdBlenderAnalytics.processRates,
      processRateTimeRange: (state) => state.bdBlenderAnalytics.processRateTimeRange
    }),
    ...mapGetters({
      timeRangeLabel: 'bdBlenderAnalytics/timeRangeLabel'
    }),
    conveyingSeries() {
      return [{
        data: this.stationConveyingSeries
      }]
    },
    processRateSeries() {
      return [{
        name: 'Process Rate',
        data: this.processRates
      }]
    }
  },
  mounted() {
    this.getStationConveyings(this.productId)
    this.getHopperStables(this.productId)
    this.getFeederCalibrationFactors(this.productId)
    this.getLoadingCellBits(this.productId)
    this.getProcessRate(this.productId)
  },
  methods: {
    ...mapActions({
      getStationConveyings: 'bdBlenderAnalytics/getStationConveyings',
      getHopperStables: 'bdBlenderAnalytics/getHopperStables',
      getFeederCalibrationFactors: 'bdBlenderAnalytics/getFeederCalibrationFactors',
      getLoadingCellBits: 'bdBlenderAnalytics/getLoadingCellBits',
      getProcessRate: 'bdBlenderAnalytics/getProcessRate',

      onTimeRangeChanged: 'bdBlenderAnalytics/onTimeRangeChanged',
      selectTimeRange: 'bdBlenderAnalytics/selectTimeRange'
    }),
    onShowTimeRangeDlgOpen(key) {
      this.selectTimeRange(key)
      this.showTimeRangeChooser = true
    },
    _onTimeRangeChanged(data) {
      data.id = this.productId
      this.onTimeRangeChanged(data)
      this.showTimeRangeChooser = false
    }
  }
}
</script>