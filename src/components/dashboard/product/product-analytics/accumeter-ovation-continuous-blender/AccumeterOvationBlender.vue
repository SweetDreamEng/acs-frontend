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
      <v-col md="4" sm="12">
        <machine-state :loading="loadingSystemStates" :system-states="systemStates"></machine-state>
      </v-col>
      <v-col md="4" sm="12">
        <feeder-stable :loading="loadingFeederStables" :feeders="feederStables"></feeder-stable>
      </v-col>
      <v-col md="4" sm="12">
        <process-rate
          :loading="loadingProcessRate"
          :rates="processRateSeries"
          :time-range-label="timeRangeLabel('process-rate')"
          @showTimeRange="onShowTimeRangeDlgOpen('process-rate')"
        >
        </process-rate>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="8" sm="12">
        <recipe
          :targets="targetRecipeValues"
          :actuals="actualRecipeValues"
          :loading="loadingRecipe"
        >
        </recipe>
      </v-col>
      <v-col md="4" sm="12">
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
import Overview from '../common/components/Overview'
import Utilization from '../common/components/Utilization'
import EnergyConsumption from '../common/components/EnergyConsumption'
import MachineState from './components/MachineState'
import FeederStable from './components/FeederStable'
import ProcessRate from './components/ProcessRate'
import Recipe from './components/Recipe'
import TimeRangeChooser from '../../../TimeRangeChooser'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Overview,
    Utilization,
    EnergyConsumption,
    MachineState,
    FeederStable,
    ProcessRate,
    Recipe,
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
      loadingUtilization: (state) => state.machines.loadingUtilization,
      loadingEnergyConsumption: (state) => state.machines.loadingEnergyConsumption,
      loadingRecipe: (state) => state.accumeterOvationBlender.loadingRecipe,
      loadingSystemStates: (state) => state.accumeterOvationBlender.loadingSystemStates,
      loadingFeederStables: (state) => state.accumeterOvationBlender.loadingFeederStables,
      loadingProcessRate: (state) => state.accumeterOvationBlender.loadingProcessRate,

      machine: (state) => state.machines.machine,
      actualRecipeValues: (state) => state.accumeterOvationBlender.actualRecipeValues,
      targetRecipeValues: (state) => state.accumeterOvationBlender.targetRecipeValues,
      systemStates: (state) => state.accumeterOvationBlender.systemStates,
      feederStables: (state) => state.accumeterOvationBlender.feederStables,
      processRateSeries: (state) => state.accumeterOvationBlender.processRateSeries
    }),
    ...mapGetters({
      timeRangeLabel: 'machines/timeRangeLabel',
      selectedTimeRange: 'machines/selectedTimeRange'
    })
  },
  created() {
    this.getOverview(this.productId)
    this.getUtilization(this.productId)
    this.getEnergyConsumption(this.productId)
    this.getSystemStates(this.productId)
    this.getFeederStables(this.productId)
    this.getProductionRate(this.productId)
    this.getRecipe(this.productId)
  },
  methods: {
    ...mapActions({
      onTimeRangeChanged: 'machines/onTimeRangeChanged',
      selectTimeRange: 'machines/selectTimeRange',
      getOverview: 'machines/getOverview',
      getUtilization: 'machines/getUtilization',
      getEnergyConsumption: 'machines/getEnergyConsumption',
      getSystemStates: 'accumeterOvationBlender/getSystemStates',
      getFeederStables: 'accumeterOvationBlender/getFeederStables',
      getProductionRate: 'accumeterOvationBlender/getProductionRate',
      getRecipe: 'accumeterOvationBlender/getRecipe'
    }),
    onShowTimeRangeDlgOpen(key) {
      console.log(key)
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