<template>
  <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
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
        <template v-slot:item.zone="{ item }">
          <div class="d-flex align-center">
            <v-icon>mdi-google-maps</v-icon>
            <span class="title text-no-wrap ml-1">{{ item.zone }}</span>
          </div>
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
        { text: 'Zone', value: 'zone' },
        { text: 'Utilization', align: 'center', value: 'utilization' },
        { text: 'OEE', align: 'start', value: 'oee' },
        { text: 'MR', value: 'mean_runtime' },
        { text: 'Deviations', align: 'center', value: 'deviations' },
        { text: 'Prod Rate', value: 'rate', align: 'center' },
        { text: 'Downtime Distrubton', align: 'center', value: 'downtime_distribution', sortable: false }
      ],

      zones: [
        {
          zone: 'Zone 1',
          utilization: '32%',
          color: 'green',
          value: 75,
          oee: '93.1%',
          mean_runtime: '07:08',
          deviations: 7,
          rate: 56,
          downtime_distribution: series
        },
        {
          zone: 'Zone 2',
          utilization: '36%',
          color: 'green',
          value: 52,
          oee: '89.8%',
          mean_runtime: '02:08',
          deviations: 34,
          rate: 65,
          downtime_distribution: series
        },
        {
          zone: 'Zone 3',
          utilization: '82%',
          color: 'red',
          value: 78,
          oee: '78.2%',
          mean_runtime: '23:25',
          deviations: 12,
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