<template>
  <v-card
    height="100%"
    :loading="loadingUtilization"
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
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <apexchart
        ref="chart"
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
/*
|---------------------------------------------------------------------
| DEMO Dashboard Card Component
|---------------------------------------------------------------------
|
| Demo card component to be used to gather some ideas on how to build
| your own dashboard component
|
*/
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    machineId: {
      type: Number,
      default: 0
    },
    timeRangeLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      interval1: null,
      interval2: null,

      traffic: Array(11).fill(0),

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
      loadingUtilization: (state) => state.machines.loadingUtilization,
      utilizationSeries: (state) => state.machines.utilizationSeries
    }),
    series() {
      return [{
        id: 1,
        name: 'utilization',
        data: this.utilizationSeries
      }]
    }
  },
  mounted() {
    this.getUtilization(this.machineId).then((reponse) => {
      console.log(this.utilizationSeries)
      // this.interval1 = window.setInterval(async () => {
      //   await this.getUtilization(this.machineId)

      //   console.log(this.utilizationSeries)

      //   this.$refs.chart.updateSeries([{
      //     data: this.utilizationSeries
      //   }])
      // }, 3000)
    })

    // // let count = 0

    // this.interval2 = window.setInterval(() => {
    //   if (this.$refs.chart) {
    //     this.$refs.chart.updateSeries([{
    //       data: this.traffic.slice()
    //     }], false, true)
    //   }
    // }, 60000)
  },
  destroyed() {
    clearInterval(this.interval1)
    clearInterval(this.interval2)
  },
  methods: {
    ...mapActions({
      getUtilization: 'machines/getUtilization'
    }),
    getNewSeries() {
      this.data.push(this.data.shift())

      return this.data
    }
  }
}
</script>