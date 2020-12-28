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
        <utilization
          :loading="loadingUtilization"
          :time-range-label="timeRangeLabel('utilization')"
          @showTimeRange="onShowTimeRangeDlgOpen('utilization')"
        >
        </utilization>
      </v-col>
      <v-col md="4" sm="12">
        <energy-consumption
          :loading="loadingEnergyConsumption"
          :time-range-label="timeRangeLabel('energy-consumption')"
          @showTimeRange="onShowTimeRangeDlgOpen('energy-consumption')"
        >
        </energy-consumption>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" md="6">
        <drying-hopper-states
          :loading="loadingSystemStates"
          :drying-hoppers="dryingHoppers"
        >
        </drying-hopper-states>
      </v-col>
      <v-col cols="12" md="6">
        <hopper-air-temperatures
          :loading="loadingActualTargetBar"
          :values-inlet="inletTemperatures"
          :values-target="targetTemperatures"
          :values-outlet="outletTemperatures"
        >
        </hopper-air-temperatures>
      </v-col>
    </v-row>
    <time-range-chooser
      :dlg="showTimeRangeChooser"
      :time-range-option="selectedTimeRange.timeRangeOption"
      :date-from="selectedTimeRange.dateFrom"
      :date-to="selectedTimeRange.dateTo"
      :time-from="selectedTimeRange.timeFrom"
      :time-to="selectedTimeRange.timeTo"
      @close="showTimeRangeChooser = false"
      @submit="_onTimeRangeChanged"
    >
    </time-range-chooser>
  </div>
</template>
<script>
import Overview from '../../common/Overview'
import Utilization from '../../common/Utilization'
import EnergyConsumption from '../../common/EnergyConsumption'
import DryingHopperStates from './DryingHopperStates'
import HopperAirTemperatures from './HopperAirTemperatures'
import TimeRangeChooser from '../../../TimeRangeChooser'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Overview,
    Utilization,
    EnergyConsumption,
    DryingHopperStates,
    HopperAirTemperatures,
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
      machine: (state) => state.machines.machine,
      dryingHoppers: (state) => state.machines.systemStates,
      inletTemperatures: (state) => state.machines.actualValuesBar,
      targetTemperatures: (state) => state.machines.targetValuesBar,
      outletTemperatures: (state) => state.machines.outletValuesBar,

      loadingOverview: (state) => state.machines.loadingOverview,
      loadingUtilization: (state) => state.machines.loadingUtilization,
      loadingEnergyConsumption: (state) => state.machines.loadingEnergyConsumption,
      loadingSystemStates: (state) => state.machines.loadingSystemStates,
      loadingActualTargetBar: (state) => state.machines.loadingActualTargetBar
    }),
    ...mapGetters({
      timeRangeLabel: 'machines/timeRangeLabel',
      selectedTimeRange: 'machines/selectedTimeRange'
    })
  },
  created() {
    this.getDryingHopperStats(this.productId)
    this.getHopperTemperatures(this.productId)
  },
  methods: {
    ...mapActions({
      onTimeRangeChanged: 'machines/onTimeRangeChanged',
      selectTimeRange: 'machines/selectTimeRange',
      getDryingHopperStats: 'machines/getDryingHopperStats',
      getHopperTemperatures: 'machines/getHopperTemperatures'
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