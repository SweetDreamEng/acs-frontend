<template>
  <div>
    <v-row dense>
      <v-col cols="12">
        <area-graph
          namespace="areaGraph-dbBlender-process-rate"
          title=""
          unit="imperial-metric"
          :height="300"
          :fetch="getProcessRate"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :names="['Process Rate']"
        >
        </area-graph>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import api from './services/api'
import AreaGraph from '../../common/area-graph/ProductAreaGraph'
import HopperStable from './components/BatchBlenderHopperStable'
import LoadCell from './components/BatchAndLoadCell'

export default {
  components: {
    AreaGraph
  },
  props: {
    machineId: {
      type: Number,
      default: 0
    },
    serialNumber: {
      type: Number,
      default: 0
    },
    parameters: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showTimeRangeChooser: false,
      conveyingCategories: ['Loader 1', 'Loader 2', 'Loader 3', 'Loader 4', 'Loader 5', 'Loader 6', 'Loader 7', 'Loader 8', 'Loader 9'],
      calibrationFactorCategories: ['Hopper 1', 'Hopper 2', 'Hopper 3', 'Hopper 4', 'Hopper 5', 'Hopper 6', 'Hopper 7', 'Hopper 8'],
      getStationConveyings: api.getStationConveyings,
      getBlenderCapability: api.getBlenderCapability,
      getProcessRate: api.getProcessRate,
      getFeederCalibrationFactors: api.getFeederCalibrationFactors
    }
  },
  computed: {
    ...mapState('bdBlenderAnalytics', [
      'loadingHopperStables',
      'loadingLoadCell',
      'hopperStables',
      'loadCells'
    ])
  },
  mounted() {
    this.getHopperStables({ serialNumber: this.serialNumber })
    this.getLoadCells({ serialNumber: this.serialNumber })
  },
  methods: {
    ...mapActions('bdBlenderAnalytics', [
      'getHopperStables',
      'getLoadCells'
    ])
  }
}
</script>