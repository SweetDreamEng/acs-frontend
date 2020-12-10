<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <div class="d-flex flex-column flex-grow-1">
        <apexchart
          height="300"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  props: {
    title: {
      type: String,
      default: () => ('All Alarms- Severity')
    },
    series: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
    }
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: 'donut'
        },
        plotOptions: {
          pie: {
            customScale: 0.86,
            donut: {
              size: '72%'
            },
            dataLabels: {
              enabled: false
            }
          }
        },
        colors: ['#775DD0', '#00C8E1', '#FFB900'],
        labels: ['Social Media', 'Blog', 'External'],
        legend: {
          show: false
        }
      }
    }
  }
}
</script>
