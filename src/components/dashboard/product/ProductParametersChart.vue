<template>
  <div>
    <time-range-chooser2
      :dlg="showTimeRangeChooser"
      :time-range="dataToolTimeRange"
      :tags="tags"
      :selected-tags="selectedTags"
      @close="showTimeRangeChooser = false"
      @submit="onTimeRangeChanged"
    >
    </time-range-chooser2>
    <v-card
      :loading="loadingDataToolSeries"
      :disabled="loadingDataToolSeries"
    >
      <v-card-title>
        <span>Data Tool</span>
        <v-spacer></v-spacer>
        {{ timeRangeDataToolLabel(dataToolTimeRange) }}
        <v-btn
          icon
          class="ml-2"
          @click="showTimeRangeChooser = true"
        >
          <v-icon>$mdi-filter</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <apexchart
          type="line"
          height="450"
          :options="chartOptions"
          :series="dataToolSeries"
        >
        </apexchart>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TimeRangeChooser2 from '../TimeRangeChooser2'

export default {
  components: {
    TimeRangeChooser2
  },
  props: {
    machineId: {
      type: Number,
      default: 0
    },
    serialNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showTimeRangeChooser: false,
      loading: false,
      colors: ['#008ffb', '#00e396', '#feb019', '#ff4560', '#775dd0', '#adbcc9']
    }
  },

  computed: {
    ...mapState('machines', ['tags', 'dataToolSeries', 'dataToolTimeRange', 'selectedTags', 'loadingDataToolSeries']),
    ...mapGetters('machines', ['timeRangeDataToolLabel', 'timeRangeFromTo']),
    yaxis() {
      return this.selectedTags.map((t, i) => {
        return {
          seriesName: t.name,
          opposite: i % 2,
          labels: {
            style: {
              colors: this.colors[i % 6],
              fontWeight: 500
            }
          },
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: this.colors[i % 6]
          },
          title: {
            text: t.name,
            style: {
              color: this.colors[i % 6],
              fontWeight: 500
            }
          },
          decimalsInFloat: 3
        }
      })
    },
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: 'line',
          stacked: false,
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },
        xaxis: {
          type: 'datetime',
          min: this.timeRangeFromTo(this.dataToolTimeRange).from,
          max: this.timeRangeFromTo(this.dataToolTimeRange).to,
          labels: {
            formatter: (value, timestamp, opts) => {
              return [this.$options.filters.formatDate(value, 'yyyy-MM-dd'), this.$options.filters.formatDate(value, ' HH:mm:ss')]
            }
          }
        },
        yaxis: this.yaxis,
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft',
            offsetY: 60,
            offsetX: 30
          }
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          showForNullSeries: true,
          showForZeroSeries: true,
          horizontalAlign: 'left',
          offsetX: 40,
          markers: {
            fillColors: this.colors
          }
        }
      }
    }
  },

  async mounted() {
    this.loading = true

    try {
      await this.getTags(this.machineId)
      await this.getDataToolSeries({
        machineId: this.machineId,
        serialNumber: this.serialNumber,
        selectedTags: this.selectedTags,
        timeRange: this.dataToolTimeRange
      })
    } catch (err) {
      console.log(err)
    }

    this.loading = false
  },

  methods: {
    ...mapActions('machines', ['getDataToolSeries', 'getTags', 'updateDataToolOptions']),
    async onTimeRangeChanged(options) {
      this.loading = true
      this.updateDataToolOptions(options)
      this.showTimeRangeChooser = false

      try {
        await this.getDataToolSeries({
          machineId: this.machineId,
          serialNumber: this.serialNumber,
          selectedTags: this.selectedTags,
          timeRange: this.dataToolTimeRange
        })
      } catch (err) {
        console.log(err)
      }

      this.loading = false
    }
  }
}
</script>
