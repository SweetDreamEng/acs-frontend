<template>
  <v-card
    color="success darken-1"
    dark
    height="100%"
    class="d-flex flex-column justify-space-between"
  >
    <div class="pa-2 pb-0">
      <div class="title">Machine Status</div>
      <div>Blender</div>
      <div>Running</div>
    </div>
    <v-spacer></v-spacer>

    <apexchart
      type="area"
      height="100"
      :options="chartOptions"
      :series="series"
    ></apexchart>
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
    // MonthlyWeekly
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
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      series: [{
        name: 'Status',
        data: [
          ['2020-02-02', 13],
          ['2020-02-03', 16],
          ['2020-02-04', 9],
          ['2020-02-05', 12]
        ]
      }],
      chartOptions: {
        chart: {
          animations: {
            speed: 400,
            animateGradually: {
              enabled: false
            }
          },
          width: '100%',
          height: 60,
          type: 'area',
          sparkline: {
            enabled: true
          }
        },
        colors: ['#fff'],
        fill: {
          type: 'solid',
          opacity: 0.15
        },
        stroke: {
          curve: 'smooth',
          width: 1
        },
        xaxis: {
          type: 'datetime'
        },
        ...this.options
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