<template>
  <v-card :disabled="loading">
    <v-card-text>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="devices"
        :items-per-page="5"
        :page.sync="page"
        hide-default-footer
        @click:row="(item) => $router.push({ path: item.machine_id + '/' + item.serial_number, append: true })"
      >
        <template v-slot:header.customer_assigned_name="{ header }">
          <v-icon small color="primary">mdi-wrench</v-icon>
          {{ header.text }}
        </template>
        <template v-slot:item.rate="{ item }">
          <production-rate-chart
            :height="120"
            :series="[item.rate]"
          >
          </production-rate-chart>
        </template>
        <template v-slot:item.utilization="{ item }">
          <div class="d-flex align-center mx-auto" style="width: 180px;">
            <apexchart
              type="line"
              width="100%"
              height="100"
              :options="utilizationChartOptions"
              :series="utilizationSeries"
            >
            </apexchart>
            {{ item.utilization }}
          </div>
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

      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="7"
        @input="getDevices"
      ></v-pagination>
    </v-card-text>
  </v-card>
</template>

<script>

import { mapState, mapActions } from 'vuex'

import ProductionRateChart from '../charts/ProductionRateChart'
import NoDowntime from './NoDowntime'
import DowntimeLegend from './DowntimeLegend'

export default {
  components: {
    ProductionRateChart, NoDowntime, DowntimeLegend
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
        { text: 'Prod Rate', value: 'rate', align: 'center', width: '1%', class: 'prod-rate-header' },
        { text: 'Downtime Distrubton', align: 'center', value: 'downtimeDistribution', sortable: false, width: '1%' }
      ],
      searchQuery: '',
      page: 1,
      itemsPerPage: 5,

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
      loading: (state) => state.machines.loadingMachinesTable,
      devices: (state) => state.devices.data,
      totalDevices: (state) => state.devices.totalDevices,
      pageCount: (state) => state.devices.pageCount
    })
  },
  mounted() {
    this.getDashboardMachinesTable({
      location: this.$route.params.location,
      zone: this.$route.params.zone,
      page: 1,
      itemsPerPage: this.itemsPerPage
    })
  },
  methods: {
    ...mapActions({
      getDashboardMachinesTable: 'machines/getDashboardMachinesTable'
    }),
    getDevices() {
      this.getDashboardMachinesTable({
        location: this.$route.params.location,
        zone: this.$route.params.zone,
        page: this.page,
        itemsPerPage: this.itemsPerPage
      })
    },
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