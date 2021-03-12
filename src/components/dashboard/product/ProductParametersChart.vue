<template>
  <div>
    <time-range-chooser2
      :dlg="showTimeRangeChooser"
      :time-range="dataToolTimeRange"
      :tags="tags"
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
        <v-btn
          icon
          class="ml-auto"
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
      selectedTags: []
    }
  },

  computed: {
    ...mapState('machines', ['tags', 'dataToolSeries', 'dataToolTimeRange', 'loadingDataToolSeries']),
    ...mapGetters('machines', ['timeRangeLabel', 'timeRangeFromTo']),
    yaxis() {
      return this.selectedTags.map((t) => {
        return {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true
          },
          title: {
            text: t.name
          },
          tooltip: {
            enabled: true
          }
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
          offsetX: 40
        }
      }
    }
  },

  mounted() {
    this.getTags(this.machineId)
    this.getDataToolSeries({
      machineId: this.machineId,
      serialNumber: this.serialNumber,
      selectedTags: this.selectedTags,
      timeRange: this.dataToolTimeRange
    })
  },

  methods: {
    ...mapActions('machines', ['getDataToolSeries', 'getTags', 'updateDataToolTimeRange']),
    onTimeRangeChanged(options) {
      this.selectedTags = options.selectedTags
      this.updateDataToolTimeRange(options.timeRange)
      this.showTimeRangeChooser = false
      this.getDataToolSeries({
        machineId: this.machineId,
        serialNumber: this.serialNumber,
        selectedTags: this.selectedTags,
        timeRange: this.dataToolTimeRange
      })
    }
  }
}
</script>
