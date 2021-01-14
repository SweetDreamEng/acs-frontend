<template>
  <v-card :disabled="loading">
    <v-card-text>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="locations"
        hide-default-footer
      >
        <template v-slot:item.rate="{ item }">
          <div style="max-width: 100px" class="d-flex align-center justify-center mx-auto">
            <production-rate-chart
              :height="120"
              :series="[item.rate]"
            >
            </production-rate-chart>
          </div>
        </template>
        <template v-slot:item.utilization="{ item }">
          <div class="d-flex align-center">
            <apexchart
              type="line"
              width="160"
              :options="utilizationChartOptions"
              :series="utilizationSeries"
            >
            </apexchart>
            {{ item.utilization }}
          </div>
        </template>
        <template v-slot:item.name="{ item }">
          <router-link :to="item.id.toString()" append class="d-flex align-center">
            <v-icon>mdi-google-maps</v-icon>
            <span class="title text-no-wrap ml-1">{{ item.name }}</span>
          </router-link>
        </template>
        <template v-slot:item.downtimeDistribution="{ item }">
          <div v-if="item && item.downtimeDistribution" class="d-flex align-end justify-end">
            <no-downtime v-if="hasNoDowntime(item.downtimeDistribution)"></no-downtime>
            <apexchart
              v-else
              type="bar"
              width="240"
              height="80"
              :options="chartOptions"
              :series="downtimeDistribution(item.downtimeDistribution)"
            >
            </apexchart>
          </div>
        </template>
      </v-data-table>

      <div class="d-flex justify-end mr-4">
        <downtime-legend></downtime-legend>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>

import ProductionRateChart from '../charts/ProductionRateChart'
import NoDowntime from './NoDowntime'
import DowntimeLegend from './DowntimeLegend'

export default {
  components: {
    ProductionRateChart, NoDowntime, DowntimeLegend
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    locations: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      headers: [
        { text: 'Location', value: 'name' },
        { text: 'Utilization', align: 'center', value: 'utilization' },
        { text: 'OEE', align: 'center', value: 'oee' },
        { text: 'Actual Performance', align: 'center', value: 'performance' },
        { text: 'Prod Rate', value: 'rate', align: 'center', width: '1%' },
        { text: 'Downtime Distrubton', align: 'right', value: 'downtimeDistribution', width: '1%', sortable: false }
      ],

      selected: ['name1', 'name2', 'name3'],

      searchQuery: '',

      chartOptions: {
        chart: {
          type: 'bar',
          stacked: true,
          stackType: '100%',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              enabled: false
            }
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          axisBorder: {
            show: false
          },
          labels: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          },
          title: {
            text: undefined
          }
        },
        tooltip: {
          enabled: false
        },
        legend: {
          show: false
        },
        grid: {
          show: false
        }
      },

      utilizationSeries: [{
        name: 'OEE',
        data: [10, 35, 41]
      }],
      utilizationChartOptions: {
        chart: {
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        layout: {
          padding: {
            top: -30,
            bottom: -30
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: '',
          align: 'left'
        },
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        grid: {
          show: false,
          padding: {
            top: 0,
            bottom: 0
          }
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        tooltip: {
          enabled: false
        },
        annotations: {
          yaxis: [
            {
              y: 25,
              borderColor: '#00E396'
            }
          ]
        }
      }
    }
  },
  methods: {
    hasNoDowntime(distribution) {
      let sum = 0

      sum += distribution.reduce((a, b) => a + b, 0)
      
      return sum === 0
    },

    downtimeDistribution(distribution) {
      return [
        {
          name: 'Name',
          data: [distribution[1]]
        },
        {
          name: 'Name',
          data: [distribution[0]]
        },
        {
          name: 'Name',
          data: [distribution[2]]
        }
      ]
    }
  }
}
</script>
<style scoped>
  a {
    text-decoration: none;
  }
</style>
