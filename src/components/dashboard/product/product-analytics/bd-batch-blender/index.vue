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
      <v-col md="8" sm="12">
        <actual-target-weight
          :values-tgt-weight="valuesTgtWeight"
          :values-act-weight="valuesActWeight"
          :is-loading="loadingWeight"
        >
        </actual-target-weight>
      </v-col>
      <v-col md="4" sm="12">
        <recipe></recipe>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <OEE
          :is-loading="loadingInventories"
        >
        </OEE>
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
import ActualTargetWeight from '../../common/ActualTargetWeight'
import OEE from '../../common/OEE'
import EnergyConsumption from '../../common/EnergyConsumption'
import Recipe from './Recipe'
import TimeRangeChooser from '../../../TimeRangeChooser'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Overview,
    Recipe,
    Utilization,
    ActualTargetWeight,
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
      showTimeRangeChooser: false
    }
  },
  computed: {
    ...mapState({
      loadingOverview: (state) => state.machines.loadingOverview,
      loadingWeight: (state) => state.machines.loadingWeight,
      machine: (state) => state.machines.machine,
      valuesTgtWeight: (state) => state.machines.targetWeights,
      valuesActWeight: (state) => state.machines.actualWeights,
      
      loadingUtilization: (state) => state.machines.loadingUtilization,
      loadingEnergyConsumption: (state) => state.machines.loadingEnergyConsumption,
      loadingInventories: (state) => state.machines.loadingInventories
    }),
    ...mapGetters({
      timeRangeLabel: 'machines/timeRangeLabel',
      selectedTimeRange: 'machines/selectedTimeRange'
    })
  },
  created() {
    this.getRecipe(this.productId)
    this.getInventory(this.productId)
    this.getWeight(this.productId)
  },
  methods: {
    ...mapActions({
      getInventory: 'machines/getInventory',
      getRecipe: 'machines/getRecipe',
      getWeight: 'machines/getWeight',
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