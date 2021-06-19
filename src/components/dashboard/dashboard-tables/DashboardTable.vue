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
        <template v-slot:header.downtimeByReason="{ header }">
          <v-icon class="mdi-rotate-90" color="primary">$mdi-battery-30</v-icon>
          {{ header.text }}
        </template>
        
        <template v-slot:item.name="{ item }">
          <span class="primary--text font-weight-bold">{{ item.name }}</span>
        </template>
        <template v-slot:item.alarmsCount="{ item }">
          <span class="font-weight-bold" :class="getAlarmsTextColor(item.alarmsCount)">{{ getAlarmsCount(item.alarmsCount) }}</span>
        </template>
        <template v-slot:item.downtimeAvailability="{ item }">
          <div class="d-flex justify-center mx-auto" style="width: 180px;">
            <apexchart
              key="availability-chart"
              type="line"
              width="160"
              :options="availabilityChartOptions"
              :series="item.downtimeAvailability"
            >
            </apexchart>
          </div>
        </template>
        <template v-slot:item.downtimeByReason="{ item }">
          <div v-if="item && item.downtimeByReason" class="d-flex justify-center">
            <no-downtime v-if="hasNoDowntime(item.downtimeByReason)"></no-downtime>
            <apexchart
              v-else
              key="downtime-chart"
              width="240"
              height="80"
              :options="getSeriesOptions(item.downtimeByReason)"
              :series="getDowntimeSeries(item.downtimeByReason)"
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

import NoDowntime from './DashboardTableNoDowntime'
import DowntimeLegend from './DashboardTableDowntimeLegend'

const seriesColors = [{
  name: 'No Demand',
  color: '#a4bcbb'
}, {
  name: 'Preventative Maintenance',
  color: '#508FF0'
}, {
  name: 'Machine Failure',
  color: '#06d6a0'
}, {
  name: 'Power Outage',
  color: '#505554'
}, {
  name: 'Other',
  color: '#ffd166'
}, {
  name: 'Change Over',
  color: '#ea344e'
}]

export default {
  components: {
    NoDowntime, DowntimeLegend
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
        xaxis: {
          axisBorder: {
            show: false
          },
          labels: {
            show: false
          }
        },
        yaxis: {
          floating: true,
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
      availabilityChartOptions: {
        chart: {
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#FF1654', '#247BA0'],
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
        },
        legend: {
          show: false
        }
      }
    }
  },
  computed: {
    headers() {
      return [
        { text: this.headerLabel, value: 'name' },
        { text: 'Alarms', align: 'center', value: 'alarmsCount' },
        { text: 'Downtime By Reason', align: 'center', value: 'downtimeByReason', sortable: false },
        { text: 'Availability', align: 'center', value: 'downtimeAvailability' }
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
    hasNoDowntime(data) {
      let sum = 0

      data.map((item) => {
        sum += item.data

        return sum
      })
      
      return sum === 0
    },

    getDowntimeSeries(data) {
      const series = []

      data.map((item) => {
        const temp = {
          name: item.name,
          data: [item.data]
        }

        series.push(temp)

        return 0
      })

      return series
    },

    getSeriesOptions(series) {
      const _colors = []

      series.map((item) => {
        const seriesColor = seriesColors.find((data) => {
          return data.name === item.name
        })

        _colors.push(seriesColor ? seriesColor.color : '#fff')

        return _colors
      })

      return {
        ...this.chartOptions,
        colors: _colors,
        fill: {
          colors: _colors,
          opacity: 1
        }
      }
    },

    getAlarmsCount(data) {
      return data ? !data[0].sum ? 'No alarms reported' : `${data[0].sum} alarms reported` : 'No alarms reported'
    },

    getAlarmsTextColor(data) {
      return data ? !data[0].sum ? 'success--text' : 'error--text' : 'success--text'
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