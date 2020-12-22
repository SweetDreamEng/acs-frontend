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
        <machine-states :loading="loadingMachineStates" :machine-states="machineStates"></machine-states>
      </v-col>
      <v-col md="4" sm="12" xs="12">
        <accumulated-hopper-inventory
          :loading="loadingHopperInventories"
          :hopper-inventories="hopperInventories"
          :time-range-label="timeRangeLabel('hopper-inventories')"
          @showTimeRange="onShowTimeRangeDlgOpen('hopper-inventories')"
        >
        </accumulated-hopper-inventory>
      </v-col>
      <v-col md="4" sm="12" xs="12">
        <accumulated-hauloff-length
          :loading="loadingHauloffLengths"
          :hauloff-lengths="hauloffLengths"
          :time-range-label="timeRangeLabel('hauloff-lengths')"
          @showTimeRange="onShowTimeRangeDlgOpen('hauloff-lengths')"
        >
        </accumulated-hauloff-length>
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
import EnergyConsumption from '../EnergyConsumption'
import MachineStates from './gh-gravimetric-extrusion-control-hopper/MachineStates'
import AccumulatedHopperInventory from './gh-gravimetric-extrusion-control-hopper/AccumulatedHopperInventory'
import AccumulatedHauloffLength from './gh-gravimetric-extrusion-control-hopper/AccumulatedHauloffLength'
import TimeRangeChooser from '../../TimeRangeChooser'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Overview,
    Utilization,
    EnergyConsumption,
    MachineStates,
    AccumulatedHopperInventory,
    AccumulatedHauloffLength,
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
      machineStates: (state) => state.machines.systemStates,
      hopperInventories: (state) => state.machines.hopperInventories,
      hauloffLengths: (state) => state.machines.hauloffLengths,

      loadingOverview: (state) => state.machines.loadingOverview,
      loadingUtilization: (state) => state.machines.loadingUtilization,
      loadingEnergyConsumption: (state) => state.machines.loadingEnergyConsumption,
      loadingMachineStates: (state) => state.machines.loadingSystemStates,
      loadingHopperInventories: (state) => state.machines.loadingHopperInventories,
      loadingHauloffLengths: (state) => state.machines.loadingHauloffLengths,
      loadingRecipe: (state) => state.machines.loadingRecipe
    }),
    ...mapGetters({
      timeRangeLabel: 'machines/timeRangeLabel',
      selectedTimeRange: 'machines/selectedTimeRange'
    })
  },
  created() {
    this.getMachineStates(this.productId)
    this.getHopperInventories(this.productId)
    this.getHauloffLengths(this.productId)
  },
  methods: {
    ...mapActions({
      getMachineStates: 'machines/getMachineStates3',
      getHopperInventories: 'machines/getHopperInventories',
      getHauloffLengths: 'machines/getHauloffLengths',
      onTimeRangeChanged: 'machines/onTimeRangeChanged',
      selectTimeRange: 'machines/selectTimeRange'
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