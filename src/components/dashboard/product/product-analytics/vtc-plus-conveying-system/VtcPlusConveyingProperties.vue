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
    }
  },
  computed: {
    ...mapState('vtcPlusConveying', [
      'loadingPumpOnlines',
      'loadingPumpBlowBacks',
      'pumpOnlines',
      'pumpBlowBacks'
    ])
  },
  mounted() {
    this.getPumpOnlines({ serialNumber: this.serialNumber })
    this.getPumpBlowBacks({ serialNumber: this.serialNumber })
  },
  methods: {
    ...mapActions('vtcPlusConveying', [
      'getPumpOnlines',
      'getPumpBlowBacks'
    ])
  }
}
</script>