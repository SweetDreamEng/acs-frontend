<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-dbBlender-process-rate"
          title="Process Rate"
          unit="kgs/hr"
          :fetch="getProcessRate"
          :product-id="parseInt(productId)"
          :names="['Process Rate']"
        >
        </area-graph>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="4" sm="12">
        <area-graph
          namespace="areaGraph-dbBlender-calibration"
          title="Calibration Factor"
          unit="kgs/hr"
          :height="300"
          :fetch="getFeederCalibrationFactors"
          :product-id="parseInt(productId)"
          :names="['Calibration Factor']"
        >
        </area-graph>
      </v-col>
      <v-col md="4" sm="12">
        <hopper-stable
          :loading="loadingHopperStables"
          :stables="hopperStables"
        >
        </hopper-stable>
      </v-col>
      <v-col md="4" sm="12">
        <bar-graph
          namespace="barGraph-dbBlender-id2"
          title="Station Conveying"
          :height="320"
          :fetch="getStationConveyings"
          :product-id="parseInt(productId)"
          :categories="conveyingCategories"
        >
        </bar-graph>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import api from './services/api'
import BarGraph from '../../common/bar-graph/BarGraph'
import AreaGraph from '../../common/area-graph/AreaGraph'
import HopperStable from './components/HopperStable'

export default {
  components: {
    BarGraph,
    AreaGraph,
    HopperStable
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
      conveyingCategories: ['Loader 1', 'Loader 2', 'Loader 3', 'Loader 4', 'Loader 5', 'Loader 6', 'Loader 7', 'Loader 8', 'Loader 9'],
      getStationConveyings: api.getStationConveyings,
      getProcessRate: api.getProcessRate,
      getFeederCalibrationFactors: api.getFeederCalibrationFactors
    }
  },
  computed: {
    ...mapState('bdBlenderAnalytics', [
      'loadingHopperStables',
      'loadingCellBits',
      'hopperStables',
      'cellBits'
    ])
  },
  mounted() {
    this.getHopperStables(this.productId)
    this.getLoadingCellBits(this.productId)
  },
  methods: {
    ...mapActions('bdBlenderAnalytics', [
      'getHopperStables',
      'getLoadingCellBits'
    ]),
    lineSeries(name, values) {
      return [{
        name: name,
        data: values
      }]
    }
  }
}
</script>