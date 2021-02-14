<template>
  <div>
    <v-row dense>
      <v-col cols="12" sm="6" lg="4">
        <bed-states
          :loading="loadingBedStates"
          :states="bedStates"
        >
        </bed-states>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" md="6">
        <area-graph
          namespace="areaGraph-ngxDryer-id1"
          title="DH Online Hours"
          unit="h"
          :fetch="getDhOnlineHours"
          :machine-id="machineId"
          :serial-number="serialNumber"
        >
        </area-graph>
      </v-col>
      <v-col cols="12" md="6">
        <area-graph
          namespace="areaGraph-ngxDryer-id2"
          title="Dryer Online Hours"
          unit="h"
          :fetch="getDryerOnlineHours"
          :machine-id="machineId"
          :serial-number="serialNumber"
        >
        </area-graph>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" md="6">
        <area-graph
          namespace="areaGraph-ngxDryer-id3"
          title="Blower Run Hours"
          unit="h"
          :fetch="getBlowerRunHours"
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
import BedStates from './components/BedStates'

import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  components: {
    AreaGraph,
    BedStates
  },
  props: {
    machineId: {
      type: Number,
      default: 0
    },
    serialNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      getDhOnlineHours: api.getDhOnlineHours,
      getDryerOnlineHours: api.getDryerOnlineHours,
      getBlowerRunHours: api.getBlowerRunHours
    }
  },
  computed: {
    ...mapState('ngxDryer', [
      'loadingBedStates',
      'bedStates'
    ])
  },
  mounted() {
    this.getBedStates({ serialNumber: this.serialNumber })
  },
  methods: {
    ...mapActions('ngxDryer', [
      'getBedStates'
    ])
  }
}
</script>