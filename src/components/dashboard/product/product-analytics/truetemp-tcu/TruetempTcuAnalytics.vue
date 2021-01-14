<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <overview
          :machine="machine"
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
        <area-graph
          title="Actual Target Temperature"
          unit-string="ºC"
          :loading="loadingActTgtTemperatures"
          :series="actTgtTemperatureSeries"
          :time-range-label="timeRangeLabel(actTgtTemeratureTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('actual-target-temperature')"
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
import Overview from '../../common/Overview'
import MachineState from './components/MachineState'
import AreaGraph from '../../common/AreaGraph'
import TimeRangeChooser from '../../../TimeRangeChooser1'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Overview,
    MachineState,
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
      loadingOverview: (state) => state.machines.loadingOverview,
      loadingMachineState: (state) => state.machines.loadingSystemStates,
      
      machine: (state) => state.machines.machine,
      machineState: (state) => state.machines.systemStates,

      loadingActTgtTemperatures: (state) => state.truetempTcu.loadingActTgtTemperatures,
      actTemperatures: (state) => state.truetempTcu.actTemperatures,
      tgtTemperatures: (state) => state.truetempTcu.tgtTemperatures,
      actTgtTemeratureTimeRange: (state) => state.truetempTcu.actTgtTemeratureTimeRange,

      selectedTimeRange: (state) => state.truetempTcu.selectedTimeRange
    }),
    ...mapGetters({
      timeRangeLabel: 'bdBlenderAnalytics/timeRangeLabel'
    }),
    actTgtTemperatureSeries() {
      return [{
        name: 'Actual Temperature',
        data: this.actTemperatures
      }, {
        name: 'Set point',
        data: this.tgtTemperatures
      }]
    }
  },
  created() {
    this.getOverview(this.productId)
    this.getSystemStates(this.productId)
    this.getActTgtTemperatures(this.productId)
  },
  methods: {
    ...mapActions({
      getOverview: 'machines/getOverview',
      getSystemStates: 'machines/getSystemStates',
      getActTgtTemperatures: 'truetempTcu/getActTgtTemperatures',

      onTimeRangeChanged: 'truetempTcu/onTimeRangeChanged',
      selectTimeRange: 'truetempTcu/selectTimeRange'
    }),
    onShowTimeRangeDlgOpen(key) {
      this.selectTimeRange(key)
      this.$nextTick(() => {
        this.showTimeRangeChooser = true
      })
    },
    _onTimeRangeChanged(data) {
      data.id = this.productId
      this.onTimeRangeChanged(data)
      this.showTimeRangeChooser = false
    }
  }
}
</script>