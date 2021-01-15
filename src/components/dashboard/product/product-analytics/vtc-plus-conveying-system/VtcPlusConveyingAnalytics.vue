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
        <pump-hours
          :loading="loadingPumpHours"
          :hours="pumpHours"
        >
        </pump-hours>
      </v-col>
      <v-col cols="12" md="6">
        <pump-hours-oil-change
          :loading="loadingPumpHoursOil"
          :values-actual="actualPumpHoursOil"
          :values-target="targetPumpHoursOil"
        >
        </pump-hours-oil-change>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="8" sm="12">
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
import Overview from '../../common/Overview'
import Utilization from '../../common/Utilization'
import EnergyConsumption from '../../common/EnergyConsumption'
import PumpHours from './components/PumpHours'
import PumpHoursOilChange from './components/PumpHoursOilChange'
import TimeRangeChooser from '../../../TimeRangeChooser'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Overview,
    Utilization,
    EnergyConsumption,
    PumpHours,
    PumpHoursOilChange,
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
      pumpHours: (state) => state.vtcPlusConveying.pumpHours,
      actualPumpHoursOil: (state) => state.vtcPlusConveying.actualPumpHoursOil,
      targetPumpHoursOil: (state) => state.vtcPlusConveying.targetPumpHoursOil,
      
      loadingOverview: (state) => state.machines.loadingOverview,
      loadingUtilization: (state) => state.machines.loadingUtilization,
      loadingEnergyConsumption: (state) => state.machines.loadingEnergyConsumption,
      loadingPumpHours: (state) => state.vtcPlusConveying.loadingPumpHours,
      loadingPumpHoursOil: (state) => state.vtcPlusConveying.loadingPumpHoursOil
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
    this.getPumpHours(this.productId)
    this.getPumpHoursOil(this.productId)
  },
  methods: {
    ...mapActions({
      onTimeRangeChanged: 'machines/onTimeRangeChanged',
      selectTimeRange: 'machines/selectTimeRange',
      getOverview: 'machines/getOverview',
      getUtilization: 'machines/getUtilization',
      getEnergyConsumption: 'machines/getEnergyConsumption',
      getPumpHoursOil: 'vtcPlusConveying/getPumpHoursOil',
      getPumpHours: 'vtcPlusConveying/getPumpHours'
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