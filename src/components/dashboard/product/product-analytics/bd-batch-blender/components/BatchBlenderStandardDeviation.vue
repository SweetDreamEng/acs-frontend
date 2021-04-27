<template>
  <v-card
    height="100%"
    :loading="hopperWeightLoading"
    :disabled="hopperWeightLoading"
  >
    <v-card-title>
      <span>Standard Deviations and Average Error</span>
    </v-card-title>
    <v-card-text
      v-for="(hopper, id) in selectedHoppers"
      :key="id"
    >
      {{ hopper.name }}
      <v-card-text>
        Standard Deviation: {{ getHopperSD(hopper.name) }}
      </v-card-text>
      <v-card-text>
        Average Error: {{ getHopperAverageErroro(hopper.name) }}
      </v-card-text>
    </v-card-text></v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
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
      loading: false
    }
  },

  computed: {
    ...mapState('machines', ['hopperWeightSeries', 'hopperSettingTimeRange', 'hopperWeightLoading', 'selectedHoppers']),
    ...mapGetters('machines', ['timeRangeDataToolLabel', 'timeRangeFromTo'])
  },
  methods: {
    getHopperSD(hopperName) {
      const hopperInfo = this.hopperWeightSeries.find((item) => {
        return item.name === `${hopperName} Actual`
      })

      return hopperInfo ? hopperInfo.sd : 0
    },
    getHopperAverageErroro(hopperName) {
      const hopperInfo = this.hopperWeightSeries.find((item) => {
        return item.name === `${hopperName} Actual`
      })

      return hopperInfo ? hopperInfo.average_error : 0
    }
  }
}
</script>
