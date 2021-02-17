<template>
  <div>
    <v-row dense>
      <v-col v-if="parameters.includes(101)" cols="12" md="4">
        <area-graph
          namespace="areaGraph-accumeterBlender-id1"
          title="Blender Capability"
          unit="imperial-metric"
          :fetch="getBlenderCapabilities"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :names="['Blender Capability']"
        >
        </area-graph>
      </v-col>
      <v-col v-if="parameters.includes(102)" cols="12" md="4">
        <area-graph
          namespace="areaGraph-accumeterBlender-id2"
          title="Target Rate"
          unit="imperial-metric"
          :fetch="getTargetRates"
          :machine-id="machineId"
          :serial-number="serialNumber"
          :names="['Target Rate']"
        >
        </area-graph>
      </v-col>
      <v-col v-if="parameters.includes(103)" cols="12" md="6">
        <area-graph
          namespace="areaGraph-accumeterBlender-id3"
          title="Feeder Calibration"
          :fetch="getFeederCalibrations"
          :machine-id="machineId"
          :serial-number="serialNumber"
        >
        </area-graph>
      </v-col>
      <v-col v-if="parameters.includes(104)" cols="12" md="6">
        <area-graph
          namespace="areaGraph-accumeterBlender-id4"
          title="Feeder Speed"
          :fetch="getFeederSpeeds"
          :machine-id="machineId"
          :serial-number="serialNumber"
        >
        </area-graph>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import api from './services/api'

import AreaGraph from '../../common/area-graph/AreaGraph'

import { mapState, mapGetters, mapActions } from 'vuex'
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
      getBlenderCapabilities: api.getBlenderCapabilities,
      getTargetRates: api.getTargetRates,
      getFeederCalibrations: api.getFeederCalibrations,
      getFeederSpeeds: api.getFeederSpeeds
    }
  },
  computed: {
  },
  mounted() {
  }
}
</script>