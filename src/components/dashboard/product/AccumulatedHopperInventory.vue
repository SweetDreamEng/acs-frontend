<template>
  <v-card height="100%">
    <v-card-title class="d-flex justify-space-between">
      <strong>Accumulated Hopper Inventory</strong>
    </v-card-title>
    <v-card-text>
      <div>
        <span class="display-1">12.3</span>
        <span><v-icon color="green">mdi-arrow-up</v-icon>12% of target</span>
      </div>
      <apexchart
        v-if="!isLoading1"
        type="line"
        :options="chartOptions"
        :series="series"
        height="140"
      >
      </apexchart>
    </v-card-text>
  </v-card>
</template>

<script>

// import MonthlyWeekly from '../MonthlyWeekly'
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
    series: {
      type: Array,
      default: () => [{
        name: 'Inventory',
        data: [62, 69, 91, 148, 10, 41, 35, 51, 49]
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
          type: 'line',
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
          width: 2
        },
        grid: {
          show: false
        },
        yaxis: {
          show: false
        },
        xaxis: {
          labels: {
            show: false
          },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        }
      }
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
