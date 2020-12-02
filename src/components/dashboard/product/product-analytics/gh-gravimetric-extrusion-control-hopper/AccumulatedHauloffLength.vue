<template>
  <v-card height="100%">
    <v-card-title class="d-flex justify-space-between">
      <div>Accumulated Hauloff Length</div>
      <v-btn
        icon
        small
        @click="showTimeRangeChooser = true"
      >
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <div>
        <span class="display-1">655.1</span>
        <span><v-icon color="green">mdi-arrow-up</v-icon>36% of target</span>
      </div>
      <apexchart
        v-if="!isLoading1"
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

export default {
  components: {
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'Weekly'
    },
    hauloffLengths: {
      type: Array,
      default: () => [{
        name: 'Hauloff Length',
        data: []
      }]
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true
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
        grid: {
          show: false
        },
        xaxis: {
          labels: {
            show: false
          },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        }
      }
    },
    series() {
      return [{
        name: 'Inventory',
        data: this.hauloffLengths
      }]
    }
  },
  mounted() {
    let count = 0

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 400)
  },
  methods: {
    clear() {
      clearInterval(this.loadingInterval)
    }
  }
}
</script>
