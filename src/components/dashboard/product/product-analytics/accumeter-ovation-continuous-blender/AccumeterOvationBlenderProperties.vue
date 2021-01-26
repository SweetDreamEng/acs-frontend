<template>
  <div>
    <v-row dense>
      <v-col v-if="parameters.includes(101)" cols="12" md="4">
        <area-graph
          namespace="areaGraph-accumeterBlender-id1"
          title="Blender Capability"
          unit="kgs/hr"
          :fetch="getBlenderCapabilities"
          :product-id="parseInt(productId)"
          :names="['Blender Capability']"
        >
        </area-graph>
      </v-col>
      <v-col v-if="parameters.includes(102)" cols="12" md="4">
        <area-graph
          namespace="areaGraph-accumeterBlender-id2"
          title="Target Rate"
          unit="kgs/hr"
          :fetch="getTargetRates"
          :product-id="parseInt(productId)"
          :names="['Target Rate']"
        >
        </area-graph>
      </v-col>
      <v-col v-if="parameters.includes(103)" cols="12" md="6">
        <area-graph
          namespace="areaGraph-accumeterBlender-id3"
          title="Feeder Calibration"
          :fetch="getFeederCalibrations"
          :product-id="parseInt(productId)"
        >
        </area-graph>
      </v-col>
      <v-col v-if="parameters.includes(104)" cols="12" md="6">
        <area-graph
          namespace="areaGraph-accumeterBlender-id4"
          title="Feeder Speed"
          :fetch="getFeederSpeeds"
          :product-id="parseInt(productId)"
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
    productId: {
      type: String,
      default: ''
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