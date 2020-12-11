<template>
  <v-card>
    <v-card-text>
      <v-data-table
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
        <template v-slot:item.location="{ item }">
          <router-link :to="'/dashboard/' + item.location.id" class="d-flex align-center">
            <v-icon>mdi-google-maps</v-icon>
            <span class="title text-no-wrap ml-1">{{ item.location.label }}</span>
          </router-link>
        </template>
        <template v-slot:item.downtime_distribution="{ item }">
          <div class="d-flex align-end justify-end">
            <apexchart
              v-if="hasNoDowntime(item.downtime_distribution)"
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
              :series="item.downtime_distribution"
            >
            </apexchart>
          </div>
        </template>
      </v-data-table>

      <div class="d-flex align-center justify-end mr-4">
        <div class="label font-italic">(Data displayed for last 7 days)</div>
        <div>
          <v-icon class="ml-2 mr-0" color="#4CAF50">mdi-checkbox-blank</v-icon>
          No Downtime
        </div>
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

import ProductionRateChart from '../charts/ProductionRateChart'
export default {
  components: {
    ProductionRateChart
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
    locations: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      headers: [
        { text: 'Location', value: 'location' },
        { text: 'Utilization', align: 'center', value: 'utilization' },
        { text: 'OEE', align: 'center', value: 'oee' },
        { text: 'Actual Performance', align: 'center', value: 'performance' },
        { text: 'Prod Rate', value: 'rate', align: 'center' },
        { text: 'Downtime Distrubton', align: 'right', value: 'downtime_distribution', sortable: false }
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
      },
      noDowntimeSeries: [
        {
          name: 'Name',
          data: [100]
        }
      ],
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
      }
    }
  },
  computed: {
  },
  methods: {
    hasNoDowntime(distribution) {
      let sum = 0

      for (let i = distribution.length - 1; i >= 0; i--) {
        sum += distribution[i].data.reduce((a, b) => a + b, 0)
      }
      
      return sum === 0
    }
  }
}
</script>
<style scoped>
  a {
    text-decoration: none;
  }
</style>
