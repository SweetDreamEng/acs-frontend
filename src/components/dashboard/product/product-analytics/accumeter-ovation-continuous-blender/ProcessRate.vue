<template>
  <v-card
    height="100%"
    :loading="loading"
    :disabled="loading"
  >
    <v-card-title class="d-flex justify-space-between">
      <div>
        <div>Process Rate</div>
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

export default {
  components: {
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    rates: {
      type: Array,
      default: () => []
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
          curve: 'straight',
          width: 2
        },
        xaxis: {
          type: 'datetime'
        }
      }
    }
  },
  computed: {
    series() {
      return [{
        name: 'Process Rate',
        data: this.rates
      }]
    }
  }
}
</script>
