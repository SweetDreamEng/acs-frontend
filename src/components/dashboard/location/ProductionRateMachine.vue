<template>
  <div>
    <apexchart
      v-if="!isLoading1"
      height="180"
      :series="series"
      :options="chartOptions"
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

      series: [{
        name: 'zone 1',
        data: [44]
      }, {
        name: 'zone 2',
        data: [53]
      }, {
        name: 'zone 3',
        data: [23]
      }],

      chartOptions: {
        chart: {
          type: 'bar',
          height: 430,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top'
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: [2001]
        },
        bar: {
          distributed: true
        },
        colors: ['#46E27A', '#293450', '#87D4F9']
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