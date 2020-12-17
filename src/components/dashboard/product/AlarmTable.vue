<template>
  <div>
    <v-card
      :loading="loading"
      :disabled="loading"
    >
      <v-card-title color="primary">
        Alarms
        <v-btn
          rounded
          outlined
          color="primary"
          dark
          class="ml-auto"
          @click="showTimeRangeChooser = true"
        >
          Local Time: {{ timeRangeLabel }}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="alarmTypes"
          :expanded.sync="expanded"
          show-expand
        >
          <!-- custom table header -->
          <template v-slot:header.alarm="{ header }">
            <v-icon color="primary">mdi-message-alert</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.status="{ header }">
            <v-icon color="primary">mdi-information</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.createdAt="{ header }">
            <v-icon color="primary">mdi-clock</v-icon>
            <span v-text="header.text"></span>
          </template>

          <!-- custom table row -->
          <template v-slot:item.createdAt="{ item }">
            {{ lastActivated(item) }}
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="isAlarmActivated(item) ? 'red' : 'green'"
              dark
              small
            >
              {{ alarmsCount(item) }}
            </v-chip>
          </template>
<!--           <template v-slot:expanded-item="{ }">
            <td :colspan="headers.length" class="px-4">
              <div
                v-for="alarm in alarms"
                :key="alarm.id"
                class="pa-1"
              >
                Alarm generated at {{ alarm.timestamp }} time
              </div>
            </td>
          </template> -->
        </v-data-table>
      </v-card-text>
    </v-card>

    <time-range-chooser
      :dlg="showTimeRangeChooser"
      :date-from="dateFrom"
      :date-to="dateTo"
      :time-from="timeFrom"
      :time-to="timeTo"
      @close="showTimeRangeChooser = false"
      @submit="onTimeRangeChanged"
    >
    </time-range-chooser>
  </div>
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
import TimeRangeChooser from '../TimeRangeChooser'

import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    TimeRangeChooser
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    alarmTypes: {
      type: Array,
      default: () => ([])
    },
    alarms: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      headers: [
        { text: 'Alarm', align: 'start', value: 'name' },
        { text: 'Status', align: 'center', value: 'status' },
        { text: 'Alarm activated at', align: 'start', value: 'createdAt' },
        { text: '', value: 'data-table-expand' }
      ],
      showTimeRangeChooser: false,
      expanded: []
    }
  },
  computed: {
    ...mapState('alarms', ['dateFrom', 'dateTo', 'timeFrom', 'timeTo']),
    ...mapGetters({
      timeRangeLabel: 'alarms/timeRangeLabel'
    })
  },
  methods: {
    onTimeRangeChanged(data) {
      this.$emit('change', data)
      this.showTimeRangeChooser = false
    },
    alarmsOfType(type) {
      return this.alarms.filter((alarm) => {
        return alarm.typeId === type.id
      })
    },
    lastActivated(type) {
      if (this.alarmsOfType(type).length === 0) {
        return 'No Alarm Detected'
      } else {
        return ''
      }
    },
    isAlarmActivated(alarmType) {
      return this.alarms.some((alarm) => alarm.tag_id === alarmType.tag_id)
    },
    alarmsCount(alarmType) {
      const alarms = this.alarms.filter((alarm) => alarm.tag_id === alarmType.tag_id)

      return alarms.length ? alarms.length : ''
    }
  }
}
</script>
