<template>
  <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="machines"
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
              class="my-n4"
            >
            </apexchart>
            {{ item.utilization }}
          </div>
        </template>
        <template v-slot:item.zone="{ item }">
          <router-link class="d-flex align-center" :to="'/dashboard/product/' + item.id">
            <v-icon>mdi-wrench</v-icon>
            <span class="title text-no-wrap ml-1">{{ item.machine.title }}</span>
          </router-link>
        </template>
        <template v-slot:item.downtime_distribution="{ item }">
          <apexchart
            type="bar"
            width="240"
            height="80"
            :options="chartOptions"
            :series="item.downtime_distribution"
          >
          </apexchart>
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
    }
  },
  data () {
    return {
      headers: [
        { text: 'Machines', value: 'zone' },
        { text: 'Utilization', align: 'center', value: 'utilization' },
        { text: 'OEE', align: 'start', value: 'oee' },
        { text: 'Actual Performance', align: 'center', value: 'performance' },
        { text: 'Prod Rate', value: 'rate', align: 'center' },
        { text: 'Downtime Distrubton', align: 'center', value: 'downtime_distribution', sortable: false }
      ],
      selectedMachineId: 0,
      machines: [
        {
          id: 1,
          machine: {
            title: 'Machine 1',
            to: 'loc1/zone1'
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
          id: 2,
          machine: {
            title: 'Machine 2',
            to: 'loc1/zone2'
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
          id: 3,
          machine: {
            title: 'Machine 3',
            to: 'loc1/zone3'
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
          height: 350,
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
  },
  methods: {
  }
}
</script>
<style scoped>
  a {
    text-decoration: none;
  }
</style>