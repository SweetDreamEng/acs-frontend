<template>
  <v-card
    height="100%"
    :loading="loading"
    :disabled="loading"
  >
    <v-card-title>
      <div>
        <div>{{ title }}</div>
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
        height="220"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    unitString: {
      type: String,
      default: ''
    },
    timeRangeLabel: {
      type: String,
      default: ''
    },
    series: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          type: 'area',
          animations: {
            speed: 400
          },
          toolbar: {
            show: false
          }
        },
        yaxis: {
          title: {
            text: `${this.title} (${this.unitString})`
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
  }
}
</script>