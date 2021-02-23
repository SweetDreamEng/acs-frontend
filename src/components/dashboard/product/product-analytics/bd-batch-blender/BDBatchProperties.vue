<template>
  <div>
    <v-row dense>
      <v-col v-if="parameters.includes(101)" cols="12" md="4">
        <area-graph
          namespace="areaGraph-dbBlender-process-rate"
          title="Process Rate"
          unit="kgs/hr"
          :height="300"
          :fetch="getProcessRate"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :names="['Process Rate']"
        >
        </area-graph>
      </v-col>
      <v-col cols="12" md="4">
        <area-graph
          namespace="areaGraph-dbBlender-capability"
          title="Blender Capability"
          unit="kgs/hr"
          :height="300"
          :fetch="getBlenderCapability"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :names="['Blender Capability']"
        >
        </area-graph>
      </v-col>
      <v-col v-if="parameters.includes(102)" cols="12" md="4">
        <area-graph
          namespace="areaGraph-dbBlender-calibration"
          title="Calibration Factor"
          unit="kgs/hr"
          :height="300"
          :fetch="getFeederCalibrationFactors"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :names="['Calibration Factor']"
        >
        </area-graph>
      </v-col>
      <v-col v-if="parameters.includes(103)" cols="12" md="4">
        <hopper-stable
          :loading="loadingHopperStables"
          :stables="hopperStables"
        >
        </hopper-stable>
      </v-col>
      <v-col v-if="parameters.includes(104)" cols="12" md="4">
        <bar-graph
          namespace="barGraph-dbBlender-id2"
          title="Station Conveying"
          :height="320"
          :fetch="getStationConveyings"
          :machine-id="machineId"
          :serial-number="serialNumber"
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
      getStationConveyings: api.getStationConveyings,
      getBlenderCapability: api.getBlenderCapability,
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
    this.getHopperStables({ serialNumber: this.serialNumber })
  },
  methods: {
    ...mapActions('bdBlenderAnalytics', [
      'getHopperStables'
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