<template>
  <div class="mr-2">
    <v-badge
      color="pink"
      bordered
      :content="alarmsCount ? alarmsCount : '0'"
      :dot="isAlarmsReportLoading"
      offset-x="46"
      offset-y="12"
    >
      <v-btn
        color="pink"
        fab
        dark
        x-small
        @click="showAlarms = true"
      >
        <v-icon color="white">$mdi-bell</v-icon>
      </v-btn>
    </v-badge>
    <v-dialog v-model="showAlarms" max-width="400">
      <alarm-reports :active-alarms="activeAlarms" @close="showAlarms=false"></alarm-reports>
    </v-dialog>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Toolbar User Component
|---------------------------------------------------------------------
|
| Quickmenu for user menu shortcuts on the toolbar
|
*/
import { mapState, mapActions } from 'vuex'

import AlarmReports from '../dashboard/AlarmReports'

export default {
  components: {
    AlarmReports
  },
  data() {
    return {
      showAlarms: false
    }
  },
  computed: {
    ...mapState({
      alarmsCount: (state) => state.alarms.alarmsCount,
      activeAlarms: (state) => state.alarms.alarmsReports,
      isAlarmsReportLoading: (state) => state.alarms.isAlarmsReportLoading
    })
  },
  methods: {
  }
}
</script>
