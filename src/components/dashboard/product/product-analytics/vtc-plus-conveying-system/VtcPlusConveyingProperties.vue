<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="6">
        <pump-onlines
          :loading="loadingPumpOnlines"
          :onlines="pumpOnlines"
          class="mb-1"
        >
        </pump-onlines>
      </v-col>
      <v-col cols="12" md="6">
        <pump-blow-backs
          :loading="loadingPumpBlowBacks"
          :blow-backs="pumpBlowBacks"
          class="mb-1"
        >
        </pump-blow-backs>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import PumpOnlines from './components/PumpOnlines'
import PumpBlowBacks from './components/PumpBlowBacks'

export default {
  components: {
    PumpOnlines,
    PumpBlowBacks
  },
  props: {
    productId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      loadingPumpOnlines: (state) => state.vtcPlusConveying.loadingPumpOnlines,
      loadingPumpBlowBacks: (state) => state.vtcPlusConveying.loadingPumpBlowBacks,

      pumpOnlines: (state) => state.vtcPlusConveying.pumpOnlines,
      pumpBlowBacks: (state) => state.vtcPlusConveying.pumpBlowBacks
    })
  },
  mounted() {
    this.getPumpOnlines(this.productId)
    this.getPumpBlowBacks(this.productId)
  },
  methods: {
    ...mapActions({
      getPumpOnlines: 'vtcPlusConveying/getPumpOnlines',
      getPumpBlowBacks: 'vtcPlusConveying/getPumpBlowBacks'
    })
  }
}
</script>