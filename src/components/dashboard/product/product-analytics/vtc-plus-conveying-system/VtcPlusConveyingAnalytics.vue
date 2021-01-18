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
        <bar-graph
          namespace="barGraph-id1"
          title="Pump Hours"
          :height="500"
          :fetch="getPumpHours"
          unit="h"
          :product-id="parseInt(productId)"
          :categories="pumpHoursOilCategories"
        >
        </bar-graph>
      </v-col>
      <v-col cols="12" md="6">
        <bar-graph
          namespace="barGraph-id2"
          title="Pump Hours Oil Change"
          :height="500"
          :fetch="getPumpHoursOil"
          unit="h"
          :names="['Actual', 'Target']"
          :product-id="parseInt(productId)"
          :categories="pumpHoursOilCategories"
        >
        </bar-graph>
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
import api from './services/api'
import BarGraph from '../../common/bar-graph/BarGraph'
import Overview from '../common/components/Overview'
import Utilization from '../common/components/Utilization'
import EnergyConsumption from '../common/components/EnergyConsumption'
import TimeRangeChooser from '../../../TimeRangeChooser'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BarGraph,
    Overview,
    Utilization,
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
      getPumpHours: api.getPumpHours,
      getPumpHoursOil: api.getPumpHoursOil
    }
  },
  computed: {
    ...mapState('machines', [
      'machine',
      'loadingOverview',
      'loadingUtilization',
      'loadingEnergyConsumption'
    ]),
    ...mapGetters({
      timeRangeLabel: 'machines/timeRangeLabel',
      selectedTimeRange: 'machines/selectedTimeRange'
    }),
    pumpHoursOilCategories() {
      return ['Pump 1', 'Pump 2', 'Pump 3', 'Pump 4', 'Pump 5', 'Pump 6', 'Pump 7', 'Pump 8', 'Pump 9', 'Pump 10', 'Pump 11', 'Pump 12']
    }
  },
  mounted() {
    this.getOverview({
      id: this.productId,
      isAdditional: false
    })
    this.getUtilization(this.productId)
    this.getEnergyConsumption(this.productId)
  },
  methods: {
    ...mapActions('machines', [
      'onTimeRangeChanged',
      'selectTimeRange',
      'getOverview',
      'getUtilization',
      'getEnergyConsumption'
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