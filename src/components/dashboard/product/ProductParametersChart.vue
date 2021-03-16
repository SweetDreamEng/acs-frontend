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
      :loading="loading"
      :disabled="loading"
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
          :series="dataToolSeries">
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
    ...mapState('machines', ['tags', 'dataToolSeries', 'dataToolTimeRange', 'selectedTags']),
    ...mapGetters('machines', ['timeRangeDataToolLabel', 'timeRangeFromTo']),
    yaxis() {
      return this.selectedTags.map((t, i) => {
        return {
          opposite: i % 2,
          labels: {
            style: {
              colors: this.colors[i]
            }
          },
          axisBorder: {
            show: true,
            color: this.colors[i]
          },
          title: {
            text: t.name,
            style: {
              color: this.colors[i]
            }
          },
          decimalsInFloat: 2
        }
      })
    },
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: 'area',
          stacked: false,
          toolbar: {
            show: false
          }
        },
        xaxis: {
          type: 'datetime',
          min: this.timeRangeFromTo(this.dataToolTimeRange).from,
          max: this.timeRangeFromTo(this.dataToolTimeRange).to
        },
        yaxis: this.yaxis,
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft',
            offsetY: 30,
            offsetX: 60
          }
        },
        legend: {
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
