<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="4">
<!--         <area-graph
          title="Blender Capability"
          unit-string="kgs/hr"
          :loading="loadingBlenderCapabilities"
          :series="lineSeries('Blender Capability', blenderCapabilities)"
          :time-range-label="timeRangeLabel(blenderCapabilityTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('blender-capability')"
        >
        </area-graph> -->
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

import TimeRangeChooser from '../../../TimeRangeChooser1'

export default {
  components: {
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
      // loadingBlenderCapabilities: (state) => state.ghGravimetricControlHopper.loadingBlenderCapabilities,

      // feederCalibrations: (state) => state.ghGravimetricControlHopper.feederCalibrations,
      // feederCalibrationTimeRange: (state) => state.ghGravimetricControlHopper.feederCalibrationTimeRange,

      selectedTimeRange: (state) => state.ghGravimetricControlHopper.selectedTimeRange
    }),
    ...mapGetters({
      timeRangeLabel: 'bdBlenderAnalytics/timeRangeLabel'
    })
  },
  mounted() {
    // this.getBlenderCapabilities(this.productId)
  },
  methods: {
    ...mapActions({
      // getBlenderCapabilities: 'ghGravimetricControlHopper/getBlenderCapabilities',

      onTimeRangeChanged: 'ghGravimetricControlHopper/onTimeRangeChanged',
      selectTimeRange: 'ghGravimetricControlHopper/selectTimeRange'
    }),
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