<template>
  <v-card height="100%">
    <v-card-subtitle>
      <v-card-subtitle class="d-flex justify-space-between">
        <strong>Average runtime by week</strong>
        <small class="ml-auto">1 Mon</small>
      </v-card-subtitle>
    </v-card-subtitle>
    <v-card-text>
      <apexchart type="bar" height="150" :options="chartOptions" :series="series"></apexchart>
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
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      series: [{
        name: 'Average runtime by week',
        data: [430, 448, 470, 540, 580, 690, 1100]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        grid: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Mod', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      }
    }
  },
  computed: {
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