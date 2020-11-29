<template>
  <v-card height="100%">
    <v-card-subtitle class="d-flex justify-space-between">
      <strong>Energy Consumption</strong>
      <MonthlyWeekly />
    </v-card-subtitle>
    <v-card-text>
      <div>
        <span class="display-1">887.3 kWH</span>
        <span><v-icon color="green">mdi-arrow-down</v-icon>12% of target</span>
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

/*
|---------------------------------------------------------------------
| DEMO Dashboard Card Component
|---------------------------------------------------------------------
|
| Demo card component to be used to gather some ideas on how to build
| your own dashboard component
|
*/
import MonthlyWeekly from '../MonthlyWeekly'
export default {
  components: {
    MonthlyWeekly
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
        name: 'Desktops',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
