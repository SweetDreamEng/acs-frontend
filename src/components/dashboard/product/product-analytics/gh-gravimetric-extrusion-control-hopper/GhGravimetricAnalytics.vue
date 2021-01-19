<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <overview
          namespace="overview-id3"
          :product-id="parseInt(productId)"
          :fetch="getOverview"
        >
        </overview>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-gh-utilization"
          title="Capacity Utilization"
          :height="220"
          :fetch="getUtilization"
          :product-id="parseInt(productId)"
          :names="['Utilization']"
        >
        </area-graph>
      </v-col>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-gh-consumption"
          title="Energy Consumption"
          :height="220"
          :fetch="getEnergyConsumption"
          :product-id="parseInt(productId)"
          :names="['Energy Consumption']"
        >
        </area-graph>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="4" sm="12">
        <machine-states :loading="loadingMachineStates" :machine-states="machineStates"></machine-states>
      </v-col>
      <v-col md="4" sm="12">
        <accumulated-hopper-inventory
          :loading="loadingHopperInventories"
          :hopper-inventories="hopperInventories"
          :time-range-label="timeRangeLabel('hopper-inventories')"
          @showTimeRange="onShowTimeRangeDlgOpen('hopper-inventories')"
        >
        </accumulated-hopper-inventory>
      </v-col>
      <v-col md="4" sm="12">
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
import commonApi from '../../common/fetches/api'

import AreaGraph from '../../common/area-graph/AreaGraph'
import Overview from '../../common/overview/Overview'
import MachineStates from './components/MachineStates'
import AccumulatedHopperInventory from './components/AccumulatedHopperInventory'
import AccumulatedHauloffLength from './components/AccumulatedHauloffLength'
import TimeRangeChooser from '../../../TimeRangeChooser'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AreaGraph,
    Overview,
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
      showTimeRangeChooser: false,
      getOverview: commonApi.getOverview,
      getUtilization: commonApi.getUtilization,
      getEnergyConsumption: commonApi.getEnergyConsumption
    }
  },
  computed: {
    ...mapState({
      actualRecipeValues: (state) => state.machines.actualRecipe2Values,
      targetRecipeValues: (state) => state.machines.targetRecipe2Values,
      machineStates: (state) => state.machines.systemStates,
      hopperInventories: (state) => state.machines.hopperInventories,
      hauloffLengths: (state) => state.machines.hauloffLengths,

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
  mounted() {
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