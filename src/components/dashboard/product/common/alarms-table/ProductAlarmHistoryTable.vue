<template>
  <v-card
    :loading="alarmHistoryLoading"
    :disabled="alarmHistoryLoading"
  >
    <v-card-title color="primary">
      Alarms History
      <v-spacer></v-spacer>
      <v-btn
        icon
        class=" ml-2"
        @click="showTimeRangeChooser = true"
      >
        <v-icon>$mdi-filter</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="alarmHistory"
        no-data-text="No alarm history"
      >
        <!-- custom table header -->
        <template v-slot:header.alarm="{ header }">
          <v-icon color="primary">$mdi-message-alert</v-icon>
          {{ header.text }}
        </template>
        <template v-slot:header.activate="{ header }">
          <v-icon color="primary" left>$mdi-clock</v-icon>
          <span v-text="header.text"></span>
        </template>
        <template v-slot:header.resolve="{ header }">
          <v-icon color="primary" left>$mdi-clock</v-icon>
          <span v-text="header.text"></span>
        </template>

        <!-- custom table row -->
        <template v-slot:item.activate="{ item }">
          {{ getTimeFromTimestamp(item.activate) }}
        </template>
        <template v-slot:item.resolve="{ item }">
          {{ getTimeFromTimestamp(item.resolve) }}
        </template>
      </v-data-table>
    </v-card-text>
    <time-range-chooser
      :dlg="showTimeRangeChooser"
      :time-range="timeRange"
      @close="showTimeRangeChooser = false"
      @submit="onTimeRangeChanged"
    >
    </time-range-chooser>
  </v-card>
</template>

<script>
/*
|---------------------------------------------------------------------
| Product Alarm Card Component
|---------------------------------------------------------------------
|
| Table that lists alarms of a certain product
|
*/
import { mapState, mapGetters, mapActions } from 'vuex'
import TimeRangeChooser from '../../../TimeRangeChooser3'

const dateTimeIsoString = new Date().toISOString().substr(0, 10)

export default {
  components: {
    TimeRangeChooser
  },
  props: {
    serialNumber: {
      type: Number,
      default: 0
    },
    machineId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      timeRange: {
        timeRangeOption: 'last24Hours',
        dateFrom: dateTimeIsoString,
        dateTo: dateTimeIsoString,
        timeFrom: '00:00',
        timeTo: '00:00'
      },
      headers: [
        { text: 'Alarm', align: 'start', value: 'name', sortable: false },
        { text: 'Alarm activated at', align: 'center', value: 'activate' },
        { text: 'Alarm resolved at', align: 'center', value: 'resolve' }
      ],
      showTimeRangeChooser: false,
      tableItems: [],
      selectedTimeRange: {}
    }
  },
  computed: {
    ...mapState({
      alarmHistory: (state) => state.machines.alarmHistory,
      alarmHistoryLoading: (state) => state.machines.alarmHistoryLoading

    }),
    ...mapGetters('machines', ['timeRangeFromTo']),
    getTimeRange() {
      if (this.selectedTimeRange && this.selectedTimeRange.timeRangeOption !== 'custom') {
        const tR = {
          timeRangeOption: this.selectedTimeRange.timeRangeOption,
          dates: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)]
        }

        const from = new Date(this.timeRangeFromTo(tR).from)
        const to = new Date(this.timeRangeFromTo(tR).to)

        const timeRange = {
          dateFrom: from.toLocaleDateString(),
          dateTo: to.toLocaleDateString(),
          timeFrom: from.toLocaleTimeString(),
          timeTo: to.toLocaleTimeString()
        }

        return timeRange
      } else {
        const timeRange = {
          dateFrom: this.selectedTimeRange.dateFrom,
          dateTo: this.selectedTimeRange.dateTo,
          timeFrom: this.selectedTimeRange.timeFrom,
          timeTo: this.selectedTimeRange.timeTo
        }

        return timeRange
      }
    }
  },
  mounted() {
    this.getAlarmHistory({
      serialNumber: this.serialNumber,
      machineId: this.machineId,
      from: new Date().getTime() - 24 * 60 * 60 * 1000,
      to: new Date().getTime()
    })
  },
  methods: {
    ...mapActions({
      getAlarmHistory: 'machines/getAlarmHistory'
    }),
    getTimeFromTimestamp(timestamp) {
      const date = timestamp !== -1 ? new Date(timestamp) : ''

      return date !== '' ? `${date.toLocaleDateString()} ${date.toLocaleTimeString()}` : ''
    },
    onTimeRangeChanged(newTimeRange) {
      this.selectedTimeRange = newTimeRange
      const to = new Date(`${this.getTimeRange.dateTo} ${this.getTimeRange.timeTo}`).getTime()
      const from = new Date(`${this.getTimeRange.dateFrom} ${this.getTimeRange.timeFrom}`).getTime()

      const customRange = to - from

      if (customRange < 0) {
        this.$store.dispatch('app/showError', { message: 'Failed: ', error: { message: 'Please check your time range selection' } }, { root: true })
      } else if (customRange > 60 * 60 * 24 * 14 * 1000) {
        this.$store.dispatch('app/showError', { message: 'Failed: ', error: { message: 'Time range selection is limited to two weeks' } }, { root: true })
      } else {
        this.getAlarmHistory({
          serialNumber: this.serialNumber,
          machineId: this.machineId,
          from,
          to
        })

        this.showTimeRangeChooser = false
      }
    }
  }
}
</script>
