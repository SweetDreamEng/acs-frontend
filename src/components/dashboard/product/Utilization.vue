<template>
  <v-card height="100%">
    <v-card-title>
      <strong>Utilization</strong>
    </v-card-title>
    <v-card-text>
      <apexchart
        type="line"
        ref="chart"
        height="180"
        :options="chartOptions"
        :series="series"
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

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => [12,12,12,12,12,12,72,67,66,59,55,48]
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      offset: 0,
      traffic: Array(11).fill(0),

      series: [{
        data: Array(11).fill(0).slice(0)
      }],

      chartOptions: {
        chart: {
          id: 'realtime',
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        markers: {
          size: 0
        },
        xaxis: {
          range: 10
        },
        yaxis: {
          max: 10
        },
        legend: {
          show: false
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

    window.setInterval(() => {
      this.traffic.push(parseInt(Math.random() * 10))
      this.$refs.chart.updateSeries([{
        data: this.traffic.slice()
      }])
    }, 1000)
  
    window.setInterval(() => {
      this.$refs.chart.updateSeries([{
        data: this.traffic.slice()
      }], false, true)
    }, 60000)
  },
  methods: {
    clear() {
      clearInterval(this.loadingInterval)
    },

    getNewSeries() {
      this.data.push(this.data.shift())

      return this.data
    }
  }
}
</script>