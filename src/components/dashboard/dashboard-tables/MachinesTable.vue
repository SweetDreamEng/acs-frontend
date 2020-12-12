<template>
  <v-card>
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
            >
            </apexchart>
            {{ item.utilization }}
          </div>
        </template>
        <template v-slot:item.customer_assigned_name="{ item }">
          <router-link class="d-flex align-center" :to="item.serial_number" append>
            <v-icon>mdi-wrench</v-icon>
            <span class="title text-no-wrap ml-1">{{ item.customer_assigned_name }}</span>
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
import NoDowntime from './NoDowntime'

export default {
  components: {
    ProductionRateChart, NoDowntime
  },
  props: {
  },
  data () {
    return {
      headers: [
        { text: 'Machines', value: 'customer_assigned_name' },
        { text: 'Utilization', align: 'center', value: 'utilization' },
        { text: 'OEE', align: 'start', value: 'oee' },
        { text: 'Actual Performance', align: 'center', value: 'performance' },
        { text: 'Prod Rate', value: 'rate', align: 'center' },
        { text: 'Downtime Distrubton', align: 'center', value: 'downtimeDistribution', sortable: false }
      ],
      selectedMachineId: 0,

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
      machines: (state) => state.devices.data,
      loading: (state) => state.machines.loadingMachinesTable
    })
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