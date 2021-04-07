<template>
  <v-card>
    <v-card-title class="primary white--text">Alarm Reports</v-card-title>
    <v-card-text class="mt-4">
      <div
        v-for="(alarm, i) in activeAlarms"
        :key="i"
        class="d-flex align-center justify-space-between my-1"
      >
        <span>{{ machineName(alarm) }}</span>
        <v-alert
          type="error"
          dense
          outlined
          class="mb-0"
        >
          <small>{{ alarmName(alarm) }}</small>
        </v-alert>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$emit('close')">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    // markers: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   }
    // }
    alarmsReports: {
      type: Array,
      default: () => {
        return []
      }
    },
    activeAlarms: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    machineName(alarm) {
      const alarmType = this.alarmsReports.find((type) => type.id === alarm.type_id)

      return alarmType ? alarmType.machine_name : ''
    },
    alarmName(alarm) {
      const alarmType = this.alarmsReports.find((type) => type.id === alarm.type_id)

      return alarmType ? alarmType.name : ''
    }
  }
}
</script>
