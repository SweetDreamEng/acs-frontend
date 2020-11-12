<template>
  <apexchart
    v-if="!isLoading1"
    type="radialBar"
    :width="width"
    :height="height"
    :options="chartOptions"
    :series="series"
  >
  </apexchart>
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
    },
    width: {
      type: Number,
      default: undefined
    },
    height: {
      type: Number,
      default: 160
    },
    series: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      chartOptions: {
        chart: {
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: '#d6d93d'
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: 0
              }
            }
          }
        },
        labels: ['Results']
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
