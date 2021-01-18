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
          namespace="barGraph-id1"
          title="Hopper Air Temperatures"
          :height="320"
          :fetch="getHopperTemperatures"
          :product-id="parseInt(productId)"
          :names="['Outlet Temperature', 'Inlet Temperature', 'Set Point']"
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
import api from './services/api'
import BarGraph from '../../common/bar-graph/BarGraph'
import Overview from '../common/components/Overview'
import Utilization from '../common/components/Utilization'
import EnergyConsumption from '../common/components/EnergyConsumption'
import DryingHopperStates from './components/DryingHopperStates'
import TimeRangeChooser from '../../../TimeRangeChooser'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BarGraph,
    Overview,
    Utilization,
    EnergyConsumption,
    DryingHopperStates,
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
      getHopperTemperatures: api.getHopperTemperatures
    }
  },
  computed: {
    ...mapState('machines', [
      'machine',
      'loadingOverview',
      'loadingUtilization',
      'loadingEnergyConsumption'
    ]),
    ...mapState('ngxDryer', [
      'dryingHoppers',
      'loadingDryingHoppers'
    ]),
    ...mapGetters('machines', ['timeRangeLabel', 'selectedTimeRange']),
    hopperAirTemperatureCategories() {
      return ['Hopper 1', 'Hopper 2', 'Hopper 3']
    }
  },
  mounted() {
    this.getOverview({
      id: this.productId,
      isAdditional: false
    })
    this.getUtilization(this.productId)
    this.getEnergyConsumption(this.productId)
    this.getDryingHopperStats(this.productId)
  },
  methods: {
    ...mapActions('machines', [
      'onTimeRangeChanged',
      'selectTimeRange',
      'getOverview',
      'getUtilization',
      'getEnergyConsumption'
    ]),
    ...mapActions('ngxDryer', [
      'getDryingHopperStats'
    ]),
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