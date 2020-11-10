<template>
  <div>
    <div class="text-center primary--text font-weight-bold">OEE</div>
    <apexchart
      v-if="!isLoading1"
      type="radialBar"
      height="160"
      :options="chartOptions"
      :series="series"
    >
    </apexchart>
  </div>
</template>

<script>
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

      series: [65],
      chartOptions: {
        chart: {
          type: 'radialBar',
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 359,
            track: {
              background: '#999'
              // strokeWidth: '97%',
              // dropShadow: {
              //   enabled: true,
              //   top: 2,
              //   left: 0,
              //   color: '#999',
              //   opacity: 1,
              //   blur: 2
              // }
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                fontSize: '22px'
              }
            }
          }
        },
        fill: {
          // type: 'gradient',
          // colors: ['#092954'],
          gradient: {
            shade: 'light',
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91]
          }
        },
        labels: ['OEE']
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
