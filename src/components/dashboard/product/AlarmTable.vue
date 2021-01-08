<template>
  <div>
    <v-card
      :loading="loading"
      :disabled="loading"
    >
      <v-card-title color="primary">
        Alarms
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="tableItems"
          no-data-text="No current alarms"
        >
          <!-- custom table header -->
          <template v-slot:header.alarm="{ header }">
            <v-icon color="primary">mdi-message-alert</v-icon>
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
        </v-data-table>
      </v-card-text>
    </v-card>
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
import { mapState, mapGetters } from 'vuex'

export default {
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
    }),
    tableItems() {
      return this.alarmTypes.filter((alarmType) => { this.alarms.find((alarm) => alarm.type_id === alarmType.id) })
    }
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
      if (this.isAlarmActivated(type)) {
        const alarm = this.alarms.find((alarm) => alarm.type_id === type.id)

        return this.$options.filters.formatDate(alarm.timestamp)
      } else {
        return 'No Alarm Detected'
      }
    },
    isAlarmActivated(alarmType) {
      const alarm = this.alarms.find((alarm) => alarm.type_id === alarmType.id)
      
      return (alarm) ? alarm.active : false
    },
    alarmsForType(alarmType) {
      return this.alarms.filter((alarm) => alarm.type_id === alarmType.id)
    }
  }
}
</script>
