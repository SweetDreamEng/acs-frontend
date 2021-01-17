<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <area-graph
          title="Process Rate"
          unit-string="kgs/hr"
          :loading="loadingProcessRates"
          :series="lineSeries('Process Rate', processRates)"
          :time-range-label="timeRangeLabel(processRateTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('process-rate')"
        >
        </area-graph>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="4" sm="12">
        <area-graph
          title="Calibration Factor"
          unit-string="kgs/hr"
          :height="320"
          :loading="loadingCalibrationFactors"
          :series="feederSeries(calibrationFactors)"
          :time-range-label="timeRangeLabel(calibrationFactorTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('calibration-factor')"
        >
        </area-graph>
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
          :height="320"
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
import TimeRangeChooser from '../../../TimeRangeChooser1'

export default {
  components: {
    BarGraph,
    AreaGraph,
    HopperStable,
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
      conveyingCategories: ['Loader 1', 'Loader 2', 'Loader 3', 'Loader 4', 'Loader 5', 'Loader 6', 'Loader 7', 'Loader 8', 'Loader 9']
    }
  },
  computed: {
    ...mapState('bdBlenderAnalytics', [
      'loadingStationConveyings',
      'loadingHopperStables',
      'loadingCalibrationFactors',
      'loadingCellBits',
      'loadingProcessRates',
      'stationConveyingSeries',
      'hopperStables',
      'cellBits',
      'processRates',
      'processRateTimeRange',
      'calibrationFactors',
      'calibrationFactorTimeRange',
      'selectedTimeRange'
    ]),
    ...mapGetters({
      timeRangeLabel: 'bdBlenderAnalytics/timeRangeLabel'
    }),
    conveyingSeries() {
      return [{
        data: this.stationConveyingSeries
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
    ...mapActions('bdBlenderAnalytics', [
      'getStationConveyings',
      'getHopperStables',
      'getFeederCalibrationFactors',
      'getLoadingCellBits',
      'getProcessRate',
      'onTimeRangeChanged',
      'selectTimeRange'
    ]),
    feederSeries(feederValues) {
      const feeders = [0, 1, 2, 3, 4, 5, 6, 7]

      return feeders.map((i) => {
        return {
          name: `Feeder ${i + 1}`,
          data: feederValues.map((value) => [value[0], value[1][i].toFixed(2)])
        }
      })
    },
    lineSeries(name, values) {
      return [{
        name: name,
        data: values
      }]
    },
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