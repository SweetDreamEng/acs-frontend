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
          :product-id="parseInt(productId)"
        >
        </area-graph>
      </v-col>
      <v-col cols="12" md="6">
        <area-graph
          namespace="areaGraph-ngxDryer-id2"
          title="Dryer Online Hours"
          unit="h"
          :fetch="getDryerOnlineHours"
          :product-id="parseInt(productId)"
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
import BedStates from './components/BedStates'

import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  components: {
    AreaGraph,
    BedStates
  },
  props: {
    productId: {
      type: String,
      default: ''
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
    this.getBedStates(this.productId)
  },
  methods: {
    ...mapActions('ngxDryer', [
      'getBedStates'
    ])
  }
}
</script>