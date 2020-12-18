<template>
  <v-card
    height="100%"
    :loading="loading"
    :disabled="loading"
  >
    <v-card-title>
      <div>
        <div>Capacity Utilization</div>
        <div class="caption font-italic">({{ timeRangeLabel }})</div>
      </div>
      <v-btn
        icon
        class="ml-auto"
        @click="$emit('showTimeRange')"
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <apexchart
        type="area"
        height="180"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    timeRangeLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'area',
          animations: {
            speed: 400
          },
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: {
          type: 'datetime'
        }
      }
    }
  },
  computed: {
    ...mapState({
      utilizationSeries: (state) => state.machines.utilizationSeries
    }),
    series() {
      return [{
        id: 1,
        name: 'utilization',
        data: this.utilizationSeries
      }]
    }
  }
}
</script>