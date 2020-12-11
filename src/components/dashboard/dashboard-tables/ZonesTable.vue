<template>
  <v-card>
    <v-card-text v-if="!loading">
      <v-data-table
        :headers="headers"
        :items="zones"
        hide-default-footer
      >
        <template v-slot:item.rate="{ item }">
          <production-rate-chart
            :height="120"
            :series="[item.rate]"
          >
          </production-rate-chart>
        </template>
        <template v-slot:item.utilization="{ item }">
          <div class="d-flex align-center">
            <apexchart
              type="line"
              width="160"
              height="100"
              :options="utilizationChartOptions"
              :series="utilizationSeries"
            >
            </apexchart>
            {{ item.utilization }}
          </div>
        </template>
        <template v-slot:item.name="{ item }">
          <router-link :to="item.id.toString()" class="d-flex align-center" append>
            <v-icon>mdi-home</v-icon>
            <span class="title text-no-wrap ml-1">{{ item.name }}</span>
          </router-link>
        </template>
        <template v-slot:item.downtimeDistribution="{ item }">
          <div class="d-flex align-end justify-end">
            <apexchart
              v-if="hasNoDowntime(item.downtimeDistribution)"
              type="bar"
              width="240"
              height="80"
              :options="noDowntimeChartOptions"
              :series="noDowntimeSeries"
            >
            </apexchart>
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
        <div>
          <v-icon class="ml-2 mr-0" color="#269ffb">mdi-checkbox-blank</v-icon>
          Unplanned
        </div>
        <div>
          <v-icon class="ml-2 mr-0" color="#26e7a5">mdi-checkbox-blank</v-icon>
          Planned
        </div>
        <div>
          <v-icon class="ml-2 mr-0" color="#febb3b">mdi-checkbox-blank</v-icon>
          Idle
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
const series = [
  {
    name: 'Name',
    data: [44]
  },
  {
    name: 'Name',
    data: [53]
  },
  {
    name: 'Name',
    data: [12]
  }
]

import { mapState } from 'vuex'

import ProductionRateChart from '../charts/ProductionRateChart'
export default {
  components: {
    ProductionRateChart
  },
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      headers: [
        { text: 'Zone', value: 'name' },
        { text: 'Utilization', align: 'center', value: 'utilization' },
        { text: 'OEE', align: 'start', value: 'oee' },
        { text: 'Actual Performance', align: 'center', value: 'performance' },
        { text: 'Prod Rate', value: 'rate', align: 'center' },
        { text: 'Downtime Distrubton', align: 'center', value: 'downtimeDistribution', sortable: false }
      ],

      zonesData: [
        {
          zone: {
            id: 1,
            name: 'Zone 1',
            to: '1'
          },
          utilization: '32%',
          color: 'green',
          value: 75,
          oee: '93.1%',
          performance: '78%',
          rate: 56,
          downtime_distribution: series
        },
        {
          zone: {
            id: 2,
            name: 'Zone 2',
            to: '2'
          },
          utilization: '36%',
          color: 'green',
          value: 52,
          oee: '89.8%',
          performance: '28%',
          rate: 65,
          downtime_distribution: series
        },
        {
          zone: {
            id: 3,
            name: 'Zone 3',
            to: '3'
          },
          utilization: '82%',
          color: 'red',
          value: 78,
          oee: '78.2%',
          performance: '25%',
          rate: 34,
          downtime_distribution: series
        }
      ],

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
      noDowntimeChartOptions: {
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
            colors: {
              ranges: [{
                from: 0,
                to: 100,
                color: '#4CAF50'
              }]
            },
            dataLabels: {
              formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                return w.config.series[seriesIndex].name + ':  ' + value
              }
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
      noDowntimeSeries: [
        {
          name: 'Name',
          data: [100]
        }
      ],
      utilizationSeries: [{
        name: 'OEE',
        data: [10, 35, 41]
      }],
      utilizationChartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
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
          show: false
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
  computed: {
    ...mapState({
      zones: (state) => state.zones.data,
      loading: (state) => state.machines.loadingZonesTable
    })
  },
  methods: {
    hasNoDowntime(distribution) {
      if (distribution) {
        let sum = 0

        sum += distribution.reduce((a, b) => a + b, 0)
        
        return sum === 0
      } else {
        return false
      }
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
