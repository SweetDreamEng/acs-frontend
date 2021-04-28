<template>
  <v-card
    height="100%"
    :loading="hopperWeightLoading"
    :disabled="hopperWeightLoading"
  >
    <v-card-title>
      <span>Standard Deviation and Average Error</span>
    </v-card-title>
    <v-tabs v-model="tabs" show-arrows>
      <v-tab
        v-for="(hopper, id) in selectedHoppers"
        :key="id"
        :href="`#${getTabLink(hopper.name)}`"
      >
        {{ hopper.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item
        v-for="(hopper, id) in selectedHoppers"
        :key="id"
        :value="getTabLink(hopper.name)"
      >
        <div class="pl-2 pr-2 mt-1">
          <v-row align="center" class="pa-2 pl-3">
            <v-col cols="2" class="pa-0">
              <v-list-item-avatar
                class="mr-1"
                color="info"
                size="30"
              >
                <v-icon color="white">
                  $mdi-standard-definition
                </v-icon>
              </v-list-item-avatar>
            </v-col>
            <v-col cols="7" class="pa-0">
              Standard Deviation
            </v-col>
            <v-col cols="3" class="pa-0">
              {{ getHopperSD(hopper.name) }}
            </v-col>
          </v-row>
          <v-row align="center" class="pa-2 pl-3">
            <v-col cols="2" class="pa-0">
              <v-list-item-avatar
                class="mr-1"
                color="error"
                size="30"
              >
                <v-icon color="white">
                  $mdi-contrast
                </v-icon>
              </v-list-item-avatar>
            </v-col>
            <v-col cols="7" class="pa-0">
              Average Error
            </v-col>
            <v-col cols="3" class="pa-0">
              {{ getHopperAverageError(hopper.name) }}
            </v-col>
          </v-row>
          <v-row align="center" class="pa-2 pl-3">
            <v-col cols="2" class="pa-0">
              <v-list-item-avatar
                class="mr-1"
                color="warning"
                size="30"
              >
                <v-icon color="white">
                  $mdi-chevron-double-down
                </v-icon>
              </v-list-item-avatar>
            </v-col>
            <v-col cols="7" class="pa-0">
              Min Value
            </v-col>
            <v-col cols="3" class="pa-0">
              {{ getHopperMinValue(hopper.name) }}
            </v-col>
          </v-row>
          <v-row align="center" class="pa-2 pl-3">
            <v-col cols="2" class="pa-0">
              <v-list-item-avatar
                class="mr-1"
                color="success"
                size="30"
              >
                <v-icon color="white">
                  $mdi-chevron-double-up
                </v-icon>
              </v-list-item-avatar>
            </v-col>
            <v-col cols="7" class="pa-0">
              Max Value
            </v-col>
            <v-col cols="3" class="pa-0">
              {{ getHopperMaxValue(hopper.name) }}
            </v-col>
          </v-row>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
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
      loading: false,
      tabs: null
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
    getHopperAverageError(hopperName) {
      const hopperInfo = this.hopperWeightSeries.find((item) => {
        return item.name === `${hopperName} Actual`
      })

      return hopperInfo ? hopperInfo.average_error : 0
    },
    getHopperMinValue(hopperName) {
      const hopperInfo = this.hopperWeightSeries.find((item) => {
        return item.name === `${hopperName} Actual`
      })

      return hopperInfo ? hopperInfo.min : 0
    },
    getHopperMaxValue(hopperName) {
      const hopperInfo = this.hopperWeightSeries.find((item) => {
        return item.name === `${hopperName} Actual`
      })

      return hopperInfo ? hopperInfo.max : 0
    },
    getTabLink(hopperName) {
      return `${hopperName.split(' ')[0]}-${hopperName.split(' ')[1]}`
    }
  }
}
</script>
