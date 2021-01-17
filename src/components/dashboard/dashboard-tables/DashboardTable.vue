<template>
  <v-card :disabled="loading">
    <v-card-text>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="items"
        hide-default-footer
        class="link-table"
        @click:row="rowClicked"
      >
        <template v-slot:item.name="{ item }">
          <span class="primary--text font-weight-bold">{{ item.name }}</span>
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
              width="160"
              :options="utilizationChartOptions"
              :series="utilizationSeries"
            >
            </apexchart>
            {{ item.utilization }}
          </div>
        </template>
        <template v-slot:item.downtimeDistribution="{ item }">
          <div v-if="item && item.downtimeDistribution" class="mx-auto">
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
    items: {
      type: Array,
      default: () => []
    },
    tableType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
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
  computed: {
    headers() {
      return [
        { text: this.headerLabel, value: 'name' },
        { text: 'Utilization', align: 'center', value: 'utilization' },
        { text: 'OEE', align: 'center', value: 'oee' },
        { text: 'Actual Performance', align: 'center', value: 'performance' },
        { text: 'Prod Rate', value: 'rate', align: 'center', width: '1%', class: 'prod-rate-header' },
        { text: 'Downtime Distrubton', align: 'center', value: 'downtimeDistribution', width: '1%', sortable: false }
      ]
    },
    headerLabel() {
      switch (this.tableType) {
      case 'location':
        return 'Locations'
      case 'zone':
        return 'Zones'
      case 'machine':
        return 'Machines'
      default:
        return ''
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
    },

    rowClicked(item) {
      switch (this.tableType) {
      case 'location':
        this.$router.push({ path: item.id.toString(), append: true })
        break
      case 'zone':
        this.$router.push({ path: item.id.toString(), append: true })
        break
      case 'machine':
        this.$router.push({ path: item.machine_id + '/' + item.serial_number, append: true })
        break
      default:
        break 
      }
    }
  }
}
</script>