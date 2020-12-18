<template>
  <v-card :loading="loading" :disabled="loading" height="100%">
    <v-card-title>
      <div>
        <div>Accumulated Hopper Inventory</div>
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
        :options="chartOptions"
        :series="series"
        height="200"
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
    timeRangeLabel: {
      type: String,
      default: ''
    },
    hopperInventories: {
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
          zoom: {
            enabled: false
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
    },
    series() {
      return [{
        name: 'Inventory',
        data: this.hopperInventories
      }]
    }
  }
}
</script>
