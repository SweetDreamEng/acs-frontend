<template>
  <div>
    <div class="text-center">
      Production Rate
    </div>
    <apexchart
      v-if="!isLoading1"
      type="radialBar"
      height="180"
      width="180"
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
    },
    series: {
      type: Array,
      default: () => [56]
    }
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: true,

      chartOptions: {
        chart: {
          height: 350,
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            dataLabels: {
              show: false
            },
            track: {
              background: '#ccc'
            }
          }
        },
        labels: ['Production Rate']
      }
    }
  },
  computed: {
    primaryColor() {
      return this.$vuetify.theme.themes.light.secondary
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
