<template>
  <apexchart
    type="bar"
    height="350"
    :options="chartOptions"
    :series="series"
  >
  </apexchart>
</template>
<script>
export default {
  props: {
    devices: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // chartOptions: {
      //   chart: {
      //     type: 'bar',
      //     height: 350
      //   },
      //   plotOptions: {
      //     bar: {
      //     }
      //   },
      //   dataLabels: {
      //     enabled: false
      //   },
      //   xaxis: {
      //     categories: this.devices.map((device) => device.customer_assigned_name)
      //   }
      // }
    }
  },
  computed: {
    series() {
      return [{
        data: this.devices.map((device) => device.alarms_count)
      }]
    },
    chartOptions() {
      return {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: this.devices.map((device) => device.customer_assigned_name)
        }
      }
    }
  }
}
</script>