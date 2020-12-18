<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12" xs="12">
        <overview
          :machine="machine"
          :loading="loadingOverview"
        >
        </overview>
      </v-col>
      <v-col md="4" sm="12" xs="12">
        <utilization
          :loading="loadingUtilization"
          :time-range-label="timeRangeLabel('utilization')"
          @showTimeRange="onShowTimeRangeDlgOpen('utilization')"
        >
        </utilization>
      </v-col>
      <v-col md="4" sm="12" xs="12">
        <energy-consumption
          :loading="loadingEnergyConsumption"
          :time-range-label="timeRangeLabel('energy-consumption')"
          @showTimeRange="onShowTimeRangeDlgOpen('energy-consumption')"
        >
        </energy-consumption>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="4" sm="12" xs="12">
        <machine-state :loading="loadingSystemStates" :system-states="systemStates"></machine-state>
      </v-col>
      <v-col md="4" sm="12" xs="12">
        <feeder-stable :loading="loadingFeederStables2" :feeders="feederStables"></feeder-stable>
      </v-col>
      <v-col md="4" sm="12" xs="12">
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
      <v-col md="8" sm="12" xs="12">
        <recipe
          :targets="targetRecipeValues"
          :actuals="actualRecipeValues"
          :loading="loadingRecipe"
        >
        </recipe>
      </v-col>
      <v-col md="4" sm="12" xs="12">
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
import Overview from '../Overview'
import Utilization from '../Utilization'
// import ActualTargetRecipe from './accumeter-ovation-continuous-blender/ActualTargetRecipe'
import EnergyConsumption from '../EnergyConsumption'
import MachineState from './accumeter-ovation-continuous-blender/MachineState'
import FeederStable from './accumeter-ovation-continuous-blender/FeederStable'
import ProcessRate from './accumeter-ovation-continuous-blender/ProcessRate'
import Recipe from './accumeter-ovation-continuous-blender/Recipe'
import TimeRangeChooser from '../../TimeRangeChooser'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Overview,
    Utilization,
    // ActualTargetRecipe,
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
      machine: (state) => state.machines.machine,
      actualRecipeValues: (state) => state.machines.actualRecipe2Values,
      targetRecipeValues: (state) => state.machines.targetRecipe2Values,
      systemStates: (state) => state.machines.systemStates,
      feederStables: (state) => state.machines.feederStables,
      processRateSeries: (state) => state.machines.processRateSeries,

      loadingOverview: (state) => state.machines.loadingOverview,
      loadingUtilization: (state) => state.machines.loadingUtilization,
      loadingEnergyConsumption: (state) => state.machines.loadingEnergyConsumption,
      loadingRecipe: (state) => state.machines.loadingRecipe,
      loadingSystemStates: (state) => state.machines.loadingSystemStates,
      loadingFeederStables2: (state) => state.machines.loadingFeederStables2,
      loadingProcessRate: (state) => state.machines.loadingProcessRate
    }),
    ...mapGetters({
      timeRangeLabel: 'machines/timeRangeLabel',
      selectedTimeRange: 'machines/selectedTimeRange'
    })
  },
  created() {
    this.getSystemStates(this.productId)
    this.getFeederStables(this.productId)
    this.getProductionRate(this.productId)
    this.getRecipe2(this.productId)
  },
  methods: {
    ...mapActions({
      onTimeRangeChanged: 'machines/onTimeRangeChanged',
      selectTimeRange: 'machines/selectTimeRange',
      getSystemStates: 'machines/getSystemStates',
      getFeederStables: 'machines/getFeederStables',
      getProductionRate: 'machines/getProductionRate',
      getRecipe2: 'machines/getRecipe2'
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