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
        <bar-graph
          namespace="barGraph-id1"
          title="Actual Target Weight"
          :height="360"
          :fetch="getWeight"
          :product-id="parseInt(productId)"
          :names="['Actual', 'Target']"
          :categories="['Feeder 1', 'Feeder 2', 'Feeder 3', 'Feeder 4', 'Feeder 5', 'Feeder 6', 'Feeder 7', 'Feeder 8']"
        >
        </bar-graph>
      </v-col>
      <v-col md="4" sm="12">
        <recipe
          :loading="loadingRecipe"
          :recipes="recipeValues"
          :ez-types="ezTypes"
          :mode="recipeMode"
        >
        </recipe>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <inventory
          :is-loading="loadingInventories"
          :inventories="inventories"
        >
        </inventory>
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
import Recipe from './components/Recipe'
import Inventory from './components/Inventory'
import TimeRangeChooser from '../../../TimeRangeChooser'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BarGraph,
    Overview,
    Recipe,
    Utilization,
    Inventory,
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
      getWeight: api.getWeight
    }
  },
  computed: {
    ...mapState('machines', [
      'loadingOverview',
      'loadingUtilization',
      'loadingEnergyConsumption',
      'machine'
    ]),
    ...mapState('bdBlenderAnalytics', [
      'loadingInventories',
      'loadingRecipe',
      'inventories',
      'recipeValues',
      'ezTypes',
      'recipeMode'
    ]),
    ...mapGetters('machines', [
      'timeRangeLabel', 
      'selectedTimeRange'
    ])
  },
  created() {
    this.getOverview({
      id: this.productId,
      isAdditional: false
    })
    this.getUtilization(this.productId)
    this.getEnergyConsumption(this.productId)
    this.getRecipe(this.productId)
    this.getInventory(this.productId)
  },
  methods: {
    ...mapActions('machines', [
      'getOverview',
      'getUtilization',
      'getEnergyConsumption',
      'onTimeRangeChanged',
      'selectTimeRange'
    ]),
    ...mapActions('bdBlenderAnalytics', [
      'getInventory',
      'getRecipe'
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