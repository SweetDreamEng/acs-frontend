<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="4" xs="12">
        <overview
          :machine="machine"
        >
        </overview>
      </v-col>
      <v-col md="8" sm="8" xs="12">
        <utilization></utilization>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="6" sm="12" xs="12">
        <OEE
          :mode="modeInventory"
          :param="paramInventory"
          :valuesHopInventory="valuesHopInventory"
          :valuesFrtInventory="valuesFrtInventory"
          :isLoading="isInventoryProductLoading"
          :time-range-label="timeRangeLabel('inventory')"
          :xaxisLabels="xaxisLabels('inventory')"
          @changeParams="_onProductInventoryParamChanged"
          @showTimeRange="onShowTimeRangeDlgOpen"
        >
        </OEE>
      </v-col>
      <v-col md="6" sm="12" xs="12">
        <actual-target-weight
          :mode="modeWeight"
          :param="paramWeight"
          :valuesTgtWeight="valuesTgtWeight"
          :valuesActWeight="valuesActWeight"
          :isLoading="isWeightProductLoading"
          @changeParams="_onProductWeightParamChange"
        >
        </actual-target-weight>
        <!-- <status-summary class="mt-1"></status-summary> -->
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="4" sm="8" xs="12">
        <average-runtime-by-week
          :weekly-running-hours="weeklyRuningHours"
        >
        </average-runtime-by-week>
      </v-col>
      <v-col md="4" sm="8" xs="12">
        <energy-consumption
          :energy-consumption="energyConsumption"
        >
        </energy-consumption>
      </v-col>
      <v-col md="4" sm="8" xs="12">
        <machine-status
          :total-running-percentage="totalRunningPercentage"
        >
        </machine-status>
      </v-col>
    </v-row>
<!--     <v-row dense>
      <v-col md="4" sm="8" xs="12">
        <recipe
          :recipe-values="recipeValues"
        >
        </recipe>
      </v-col>
    </v-row> -->

    <time-range-chooser
      :dlg="showTimeRangeChooser"
      :time-range-option="inventoryTimeRange.timeRangeOption"
      :date-from="inventoryTimeRange.dateFrom"
      :date-to="inventoryTimeRange.dateTo"
      :time-from="inventoryTimeRange.timeFrom"
      :time-to="inventoryTimeRange.timeTo"
      @close="showTimeRangeChooser = false"
      @submit="_onTimeRangeChanged"
    >
    </time-range-chooser>
  </div>
</template>
<script>
import Overview from '../Overview'
import HoursPerYear from '../HoursPerYear'
import MachineStatus from './bd-batch-blender/MachineStatus'
import Utilization from '../Utilization'
import ActualTargetWeight from '../ActualTargetWeight'
import AverageRuntimeByWeek from './bd-batch-blender/AverageRuntimeByWeek'
import OEE from '../OEE'
import EnergyConsumption from '../EnergyConsumption'
// import Recipe from './bd-batch-blender/Recipe'
import TimeRangeChooser from '../../TimeRangeChooser'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Overview,
    MachineStatus,
    Utilization,
    ActualTargetWeight,
    AverageRuntimeByWeek,
    OEE,
    EnergyConsumption,
    TimeRangeChooser
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
      machine: (state) => state.machines.machine,

      inventoryTimeRange: (state) => state.machines.inventoryTimeRange,

      modeWeight: (state) => state.machines.modeWeightProduct,
      modeInventory: (state) => state.machines.modeInventory,

      paramWeight: (state) => state.machines.paramWeightProduct,
      paramInventory: (state) => state.machines.paramInventory,

      valuesTgtWeight: (state) => state.machines.valuesTgtWeightProduct,
      valuesActWeight: (state) => state.machines.valuesActWeightProduct,
      valuesHopInventory: (state) => state.machines.valuesHopInventory,
      valuesFrtInventory: (state) => state.machines.valuesFrtInventory,

      isWeightProductLoading: (state) => state.machines.isWeightProductLoading,
      isInventoryProductLoading: (state) => state.machines.isInventoryProductLoading,

      energyConsumption: (state) => state.machines.energyConsumption,                   // Energy Consumption
      weeklyRuningHours: (state) => state.machines.weeklyRuningHours,                   // Weekly running hours
      totalRunningPercentage: (state) => state.machines.totalRunningPercentage,         // Weekly running hours
      recipeValues: (state) => state.machines.recipeValues                              // recipe
    }),
    ...mapGetters({
      timeRangeLabel: 'machines/timeRangeLabel',
      xaxisLabels: 'machines/xaxisLabels'
    })
  },
  methods: {
    ...mapActions({
      onProductWeightParamChange: 'machines/onProductWeightParamChange',
      onProductInventoryParamChanged: 'machines/onProductInventoryParamChanged',
      onTimeRangeChanged: 'machines/onTimeRangeChanged'
    }),
    _onProductWeightParamChange(data) {
      this.onProductWeightParamChange(data)
    },
    _onProductInventoryParamChanged(data) {
      this.onProductInventoryParamChanged(data)
    },
    onShowTimeRangeDlgOpen() {
      this.showTimeRangeChooser = true
    },
    _onTimeRangeChanged(data) {
      console.log(data)

      this.onTimeRangeChanged(data)
      this.showTimeRangeChooser = false
    }
  }
}
</script>