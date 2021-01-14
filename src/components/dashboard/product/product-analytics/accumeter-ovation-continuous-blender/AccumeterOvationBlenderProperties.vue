<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="4">
        <area-graph
          title="Blender Capability"
          unit-string="kgs/hr"
          :loading="loadingBlenderCapabilities"
          :series="lineSeries('Blender Capability', blenderCapabilities)"
          :time-range-label="timeRangeLabel(blenderCapabilityTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('blender-capability')"
        >
        </area-graph>
      </v-col>
      <v-col cols="12" md="4">
        <area-graph
          title="Target Rate"
          unit-string="kgs/hr"
          :loading="loadingTargetRates"
          :series="lineSeries('Current Target Rate', targetRates)"
          :time-range-label="timeRangeLabel(targetRateTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('target-rate')"
        >
        </area-graph>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" md="6">
        <area-graph
          title="Feeder Calibration"
          unit-string=""
          :loading="loadingFeederCalibrations"
          :series="feederSeries(feederCalibrations)"
          :time-range-label="timeRangeLabel(feederCalibrationTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('feeder-calibration')"
        >
        </area-graph>
      </v-col>
      <v-col cols="12" md="6">
        <area-graph
          title="Feeder Speed"
          unit-string=""
          :loading="loadingFeederSpeeds"
          :series="feederSeries(feederSpeeds)"
          :time-range-label="timeRangeLabel(feederSpeedTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('feeder-speed')"
        >
        </area-graph>
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

import AreaGraph from '../../common/AreaGraph'
import TimeRangeChooser from '../../../TimeRangeChooser1'

export default {
  components: {
    AreaGraph,
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
      showTimeRangeChooser: false
    }
  },
  computed: {
    ...mapState({
      loadingBlenderCapabilities: (state) => state.accumeterOvationBlender.loadingBlenderCapabilities,
      loadingFeederCalibrations: (state) => state.accumeterOvationBlender.loadingFeederCalibrations,
      loadingFeederSpeeds: (state) => state.accumeterOvationBlender.loadingFeederSpeeds,
      loadingTargetRates: (state) => state.accumeterOvationBlender.loadingTargetRates,

      feederCalibrations: (state) => state.accumeterOvationBlender.feederCalibrations,
      feederCalibrationTimeRange: (state) => state.accumeterOvationBlender.feederCalibrationTimeRange,
      blenderCapabilities: (state) => state.accumeterOvationBlender.blenderCapabilities,
      blenderCapabilityTimeRange: (state) => state.accumeterOvationBlender.blenderCapabilityTimeRange,
      feederSpeeds: (state) => state.accumeterOvationBlender.feederSpeeds,
      feederSpeedTimeRange: (state) => state.accumeterOvationBlender.feederSpeedTimeRange,
      targetRates: (state) => state.accumeterOvationBlender.targetRates,
      targetRateTimeRange: (state) => state.accumeterOvationBlender.targetRateTimeRange,

      selectedTimeRange: (state) => state.accumeterOvationBlender.selectedTimeRange
    }),
    ...mapGetters({
      timeRangeLabel: 'bdBlenderAnalytics/timeRangeLabel'
    })
  },
  mounted() {
    this.getBlenderCapabilities(this.productId)
    this.getFeederCalibrations(this.productId)
    this.getFeederSpeeds(this.productId)
    this.getTargetRates(this.productId)
  },
  methods: {
    ...mapActions({
      getBlenderCapabilities: 'accumeterOvationBlender/getBlenderCapabilities',
      getFeederCalibrations: 'accumeterOvationBlender/getFeederCalibrations',
      getFeederSpeeds: 'accumeterOvationBlender/getFeederSpeeds',
      getTargetRates: 'accumeterOvationBlender/getTargetRates',

      onTimeRangeChanged: 'accumeterOvationBlender/onTimeRangeChanged',
      selectTimeRange: 'accumeterOvationBlender/selectTimeRange'
    }),
    feederSeries(feederValues) {
      const feeders = [0, 1, 2, 3, 4, 5]

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