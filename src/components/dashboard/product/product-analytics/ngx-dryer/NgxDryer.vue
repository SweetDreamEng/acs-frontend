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
      <v-col cols="12" md="4">
        <drying-hopper-states
          :loading="loadingDryingHoppers"
          :drying-hoppers="dryingHoppers"
        >
        </drying-hopper-states>
      </v-col>
      <v-col cols="12" md="8">
        <bar-graph
          title="Hopper Air Temperatures"
          :loading="loadingTemperatures"
          :height="320"
          unit="°"
          :series="hopperAirTemperatureSeries"
          :categories="hopperAirTemperatureCategories"
        >
        </bar-graph>
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
import BarGraph from '../../common/BarGraph'
import Overview from '../../common/Overview'
import Utilization from '../../common/Utilization'
import EnergyConsumption from '../../common/EnergyConsumption'
import DryingHopperStates from './components/DryingHopperStates'
// import HopperAirTemperatures from './components/HopperAirTemperatures'
import TimeRangeChooser from '../../../TimeRangeChooser'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BarGraph,
    Overview,
    Utilization,
    EnergyConsumption,
    DryingHopperStates,
    // HopperAirTemperatures,
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
      dryingHoppers: (state) => state.ngxDryer.dryingHoppers,
      inletTemperatures: (state) => state.ngxDryer.inletTemperatures,
      targetTemperatures: (state) => state.ngxDryer.targetTemperatures,
      outletTemperatures: (state) => state.ngxDryer.outletTemperatures,

      loadingOverview: (state) => state.machines.loadingOverview,
      loadingUtilization: (state) => state.machines.loadingUtilization,
      loadingEnergyConsumption: (state) => state.machines.loadingEnergyConsumption,
      loadingDryingHoppers: (state) => state.ngxDryer.loadingDryingHoppers,
      loadingTemperatures: (state) => state.ngxDryer.loadingTemperatures
    }),
    ...mapGetters({
      timeRangeLabel: 'machines/timeRangeLabel',
      selectedTimeRange: 'machines/selectedTimeRange'
    }),
    hopperAirTemperatureSeries() {
      return [{
        name: 'Outlet Temperature',
        data: this.outletTemperatures
      }, {
        name: 'Inlet Temperature',
        data: this.inletTemperatures
      }, {
        name: 'Set Point',
        data: this.targetTemperatures
      }]
    },
    hopperAirTemperatureCategories() {
      return ['Hopper 1', 'Hopper 2', 'Hopper 3']
    }
  },
  created() {
    this.getOverview(this.productId)
    this.getUtilization(this.productId)
    this.getEnergyConsumption(this.productId)
    this.getDryingHopperStats(this.productId)
    this.getHopperTemperatures(this.productId)
  },
  methods: {
    ...mapActions({
      onTimeRangeChanged: 'machines/onTimeRangeChanged',
      selectTimeRange: 'machines/selectTimeRange',
      getOverview: 'machines/getOverview',
      getUtilization: 'machines/getUtilization',
      getEnergyConsumption: 'machines/getEnergyConsumption',
      getDryingHopperStats: 'ngxDryer/getDryingHopperStats',
      getHopperTemperatures: 'ngxDryer/getHopperTemperatures'
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