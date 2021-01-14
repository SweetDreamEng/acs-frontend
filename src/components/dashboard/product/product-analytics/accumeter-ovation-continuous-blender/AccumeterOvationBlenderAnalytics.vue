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
          :time-range-label="timeRangeLabel(utilizationTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('utilization')"
        >
        </utilization>
      </v-col>
      <v-col md="4" sm="12">
        <energy-consumption
          :loading="loadingEnergyConsumption"
          :time-range-label="timeRangeLabel(energyConsumptionTimeRange)"
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
        <area-graph
          title="Process Rate"
          unit-string="kgs/hr"
          :loading="loadingProcessRate"
          :series="processRateSeries"
          :time-range-label="timeRangeLabel(processRateTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('process-rate')"
        >
        </area-graph>
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
      :time-range="selectedTimeRange"
      @close="showTimeRangeChooser = false"
      @submit="_onTimeRangeChanged"
    >
    </time-range-chooser>
  </div>
</template>
<script>
import AreaGraph from '../../common/AreaGraph'
import Overview from '../common/components/Overview'
import Utilization from '../common/components/Utilization'
import EnergyConsumption from '../common/components/EnergyConsumption'
import MachineState from './components/MachineState'
import FeederStable from './components/FeederStable'
import Recipe from './components/Recipe'
import TimeRangeChooser from '../../../TimeRangeChooser1'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AreaGraph,
    Overview,
    Utilization,
    EnergyConsumption,
    MachineState,
    FeederStable,
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
      processRates: (state) => state.accumeterOvationBlender.processRateSeries,

      utilizationTimeRange: (state) => state.machines.utilizationTimeRange,
      energyConsumptionTimeRange: (state) => state.machines.energyConsumptionTimeRange,
      processRateTimeRange: (state) => state.accumeterOvationBlender.processRateTimeRange
    }),
    ...mapGetters({
      timeRangeLabel: 'bdBlenderAnalytics/timeRangeLabel',
      selectedTimeRange: 'machines/selectedTimeRange'
    }),
    processRateSeries() {
      return [{
        name: 'Process Rate',
        data: this.processRates
      }]
    }
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
      getOverview: 'machines/getOverview',
      getUtilization: 'machines/getUtilization',
      getEnergyConsumption: 'machines/getEnergyConsumption',
      getSystemStates: 'accumeterOvationBlender/getSystemStates',
      getFeederStables: 'accumeterOvationBlender/getFeederStables',
      getProductionRate: 'accumeterOvationBlender/getProductionRate',
      getRecipe: 'accumeterOvationBlender/getRecipe',

      onTimeRangeChanged: 'accumeterOvationBlender/onTimeRangeChanged',
      selectTimeRange: 'accumeterOvationBlender/selectTimeRange'
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