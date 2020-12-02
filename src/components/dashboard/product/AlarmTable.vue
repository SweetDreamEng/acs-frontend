<template>
  <div>
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-card v-else>
      <v-card-title color="primary">
        {{ label }}
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
          hide-default-footer
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
              :color="alarmsOfType(item).length === 0 ? 'green' : 'red'"
              dark
              small
            >
            </v-chip>
          </template>
          <template v-slot:expanded-item="{  }">
            <td :colspan="headers.length" class="px-4">
              <div
                class="pa-1"
                v-for="alarm in alarms"
                :key="alarm.id"
              >
                Alarm generated at {{ alarm.timestamp }} time
              </div>
            </td>
          </template>
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
import moment from 'moment'
import store from '../../../store'
import TimeRangeChooser from '../TimeRangeChooser'

import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    TimeRangeChooser
  },
  props: {
    label: {
      type: String,
      default: ''
    },
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
    open(item) { },
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
    }
  }
}
</script>
