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
import BarGraph from '../../common/BarGraph'
import TimeRangeChooser from '../../../TimeRangeChooser1'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Overview,
    MachineState,
    BarGraph,
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
      loadingOverview: (state) => state.machines.loadingOverview,
      loadingMachineState: (state) => state.machines.loadingSystemStates,
      
      machine: (state) => state.machines.machine,
      machineState: (state) => state.machines.systemStates,

      loadingActTgtTemperatures: (state) => state.truetempTcu.loadingActTgtTemperatures,
      actTgtTemperatures: (state) => state.truetempTcu.actTgtTemperatures,

      selectedTimeRange: (state) => state.truetempTcu.selectedTimeRange
    }),
    ...mapGetters({
      timeRangeLabel: 'bdBlenderAnalytics/timeRangeLabel'
    }),

    actTgtTemperatureSeries() {
      return [{
        data: this.actTgtTemperatures
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