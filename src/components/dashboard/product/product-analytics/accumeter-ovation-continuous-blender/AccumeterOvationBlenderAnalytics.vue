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
    ...mapState('machines', [
      'loadingOverview',
      'loadingUtilization',
      'loadingEnergyConsumption',
      'machine',
      'utilizationTimeRange',
      'energyConsumptionTimeRange'
    ]),
    ...mapState('accumeterOvationBlender', [
      'loadingRecipe',
      'loadingSystemStates',
      'loadingFeederStables',
      'loadingProcessRate',
      'actualRecipeValues',
      'targetRecipeValues',
      'systemStates',
      'feederStables',
      'processRateTimeRange'
    ]),
    ...mapState({
      processRates: (state) => state.accumeterOvationBlender.processRateSeries
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
    ...mapActions('machines', [
      'getOverview',
      'getUtilization',
      'getEnergyConsumption'
    ]),
    ...mapActions('accumeterOvationBlender', [
      'getSystemStates',
      'getFeederStables',
      'getProductionRate',
      'getRecipe',
      'onTimeRangeChanged',
      'selectTimeRange'
    ]),
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