<template>
  <v-card
    height="100%"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <v-card-title class="d-flex justify-space-between">
      <div>Recipe Set-Points & Actual-Points</div>
      <v-btn
        icon
        small
        @click="showTimeRangeChooser = true"
      >
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <apexchart
        type="area"
        :options="chartOptions"
        :series="series"
        height="160"
      >
      </apexchart>
    </v-card-text>
  </v-card>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    setPoints: {
      type: Array,
      default: () => [{}]
    },
    actualPoints: {
      type: Array,
      default: () => [{}]
    }
  },
  data() {
    return {
      showTimeRangeChooser: false,

      chartOptions: {
        chart: {
          height: 120,
          type: 'area',
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          curve: 'smooth',
          width: 2
        }
      }
    }
  },
  computed: {
    series() {
      return [
        {
          id: 1,
          name: 'Actual Points',
          data: this.actualPoints
        },
        {
          id: 2,
          name: 'Set Points',
          data: this.setPoints
        }
      ]
    }
  },
  methods: {
  }
}
</script>