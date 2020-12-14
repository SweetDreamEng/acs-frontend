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
          :machine-id="1"
          :time-range-label="timeRangeLabel('utilization')"
          @showTimeRange="onShowTimeRangeDlgOpen('utilization')"
        >
        </utilization>
      </v-col>
      <v-col md="4" sm="12" xs="12">
        <energy-consumption
          :machine-id="1"
          :time-range-label="timeRangeLabel('energy-consumption')"
          @showTimeRange="onShowTimeRangeDlgOpen('energy-consumption')"
        >
        </energy-consumption>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="4" sm="12" xs="12">
        <actual-target-weight
          :values-tgt-weight="valuesTgtWeight"
          :values-act-weight="valuesActWeight"
          :is-loading="loadingWeight"
        >
        </actual-target-weight>
      </v-col>
      <v-col md="4" sm="12" xs="12">
        <OEE
          :is-loading="loadingInventories"
        >
        </OEE>
      </v-col>
      <v-col md="4" sm="12" xs="12">
        <recipe></recipe>
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
// import MachineStatus from './bd-batch-blender/MachineStatus'
import Utilization from '../Utilization'
import ActualTargetWeight from '../ActualTargetWeight'
// import AverageRuntimeByWeek from './bd-batch-blender/AverageRuntimeByWeek'
import OEE from '../OEE'
import EnergyConsumption from '../EnergyConsumption'
import Recipe from './bd-batch-blender/Recipe'

import TimeRangeChooser from '../../TimeRangeChooser'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Overview,
    Recipe,
    // MachineStatus,
    Utilization,
    ActualTargetWeight,
    // AverageRuntimeByWeek,
    OEE,
    EnergyConsumption,
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
      
      dateFrom: '',
      dateTo: '',
      timeFrom: '',
      timeTo: '',

      statusSeries: [{
        name: 'Status',
        data: [
          ['2020-02-02', 13],
          ['2020-02-03', 16],
          ['2020-02-04', 9],
          ['2020-02-05', 12]
        ]
      }]
    }
  },
  computed: {
    ...mapState({
      loadingOverview: (state) => state.machines.loadingOverview,
      loadingWeight: (state) => state.machines.loadingWeight,
      machine: (state) => state.machines.machine,

      loadingInventories: (state) => state.machines.loadingInventories,

      loadingWeeklyRunningHours1: (state) => state.machines.loadingWeeklyRunningHours1,
      weeklyRuningHours: (state) => state.machines.weeklyRuningHours,                   // Weekly running hours

      modeWeight: (state) => state.machines.modeWeightProduct,
      modeInventory: (state) => state.machines.modeInventory,

      paramWeight: (state) => state.machines.paramWeightProduct,
      paramInventory: (state) => state.machines.paramInventory,

      valuesTgtWeight: (state) => state.machines.targetWeights,
      valuesActWeight: (state) => state.machines.actualWeights,
      valuesHopInventory: (state) => state.machines.valuesHopInventory,
      valuesFrtInventory: (state) => state.machines.valuesFrtInventory,

      isWeightProductLoading: (state) => state.machines.isWeightProductLoading,
      isInventoryProductLoading: (state) => state.machines.isInventoryProductLoading,

      totalRunningPercentage: (state) => state.machines.totalRunningPercentage,         // Weekly running hours
      recipeValues: (state) => state.machines.recipeValues                              // recipe
    }),
    ...mapGetters({
      timeRangeLabel: 'machines/timeRangeLabel',
      xaxisLabels: 'machines/xaxisLabels',
      selectedTimeRange: 'machines/selectedTimeRange'
    })
  },
  methods: {
    ...mapActions({
      onProductWeightParamChange: 'machines/onProductWeightParamChange',
      onProductInventoryParamChanged: 'machines/onProductInventoryParamChanged',
      onTimeRangeChanged: 'machines/onTimeRangeChanged',
      selectTimeRange: 'machines/selectTimeRange'
    }),
    _onProductWeightParamChange(data) {
      this.onProductWeightParamChange(data)
    },
    _onProductInventoryParamChanged(data) {
      this.onProductInventoryParamChanged(data)
    },
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