<template>
  <div>
    <time-range-chooser2
      :dlg="showTimeRangeChooser"
      :time-range="hopperSettingTimeRange"
      :tags="hoppers"
      :selected-tags="selectedHoppers"
      :no-alarms="true"
      @close="showTimeRangeChooser = false"
      @submit="onTimeRangeChanged"
    >
    </time-range-chooser2>
    <v-card
      :loading="hopperWeightLoading"
      :disabled="hopperWeightLoading"
    >
      <v-card-title>
        <span>Target Weights vs Actual Weights</span>
        <v-spacer></v-spacer>
        {{ timeRangeDataToolLabel(hopperSettingTimeRange) }}
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
          :series="hopperWeightSeries"
        >
        </apexchart>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TimeRangeChooser2 from '../../../../TimeRangeChooser2'

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
      hoppers: [{
        id: 0, name: 'Hopper 1'
      }, {
        id: 1, name: 'Hopper 2'
      }, {
        id: 2, name: 'Hopper 3'
      }, {
        id: 3, name: 'Hopper 4'
      }, {
        id: 4, name: 'Hopper 5'
      }, {
        id: 5, name: 'Hopper 6'
      }, {
        id: 6, name: 'Hopper 7'
      }, {
        id: 7, name: 'Hopper 8'
      }],
      options: {

      }
      // colors: ['#008ffb', '#00e396', '#feb019', '#ff4560', '#775dd0', '#adbcc9']
    }
  },

  computed: {
    ...mapState('machines', ['hopperWeightSeries', 'hopperSettingTimeRange', 'hopperWeightLoading', 'selectedHoppers']),
    ...mapGetters('machines', ['timeRangeDataToolLabel', 'timeRangeFromTo']),
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: 'line',
          stacked: false,
          toolbar: {
            show: false
          },
          colors: this.colors
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },
        xaxis: {
          type: 'datetime',
          min: this.timeRangeFromTo(this.hopperSettingTimeRange).from,
          max: this.timeRangeFromTo(this.hopperSettingTimeRange).to,
          labels: {
            formatter: (value, timestamp, opts) => {
              return [this.$options.filters.formatDate(value, 'MM-dd'), this.$options.filters.formatDate(value, ' HH:mm:ss')]
            }
          }
        },
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
      await this.getBlenderWeights({
        machineId: this.machineId,
        serialNumber: this.serialNumber,
        selectedHoppers: this.selectedHoppers,
        timeRange: this.hopperSettingTimeRange
      })
    } catch (err) {
      console.log(err)
    }

    this.loading = false
  },

  methods: {
    ...mapActions('machines', ['getBlenderWeights', 'updateHopperSetting']),
    async onTimeRangeChanged(options) {
      this.loading = true
      this.updateHopperSetting(options)
      this.showTimeRangeChooser = false

      try {
        await this.getBlenderWeights({
          machineId: this.machineId,
          serialNumber: this.serialNumber,
          selectedHoppers: this.selectedHoppers,
          timeRange: this.hopperSettingTimeRange
        })
      } catch (err) {
        console.log(err)
      }

      this.loading = false
    }
  }
}
</script>
