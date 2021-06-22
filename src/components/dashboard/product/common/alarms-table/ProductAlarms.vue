<template>
  <div class="flex-column flex-grow-1">
    <v-tabs
      v-model="tab"
      :show-arrows="false"
      background-color="transparent"
    >
      <v-tab>Alarms</v-tab>
      <v-tab>Alarm History</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <product-alarms-table
          :namespace="namespace"
          :fetch="fetch"
          :machine-id="machineId"
          :serial-number="serialNumber"
        >
        </product-alarms-table>
      </v-tab-item>
      <v-tab-item>
        <product-alarm-history-table
          :machine-id="machineId"
          :serial-number="serialNumber"
        >
        </product-alarm-history-table>
      </v-tab-item></v-tabs-items>
  </div>
</template>
<script>
import ProductAlarmsTable from './ProductAlarmsTable'
import ProductAlarmHistoryTable from './ProductAlarmHistoryTable'

export default {
  components: {
    ProductAlarmsTable,
    ProductAlarmHistoryTable
  },
  props: {
    namespace: {
      type: String,
      default: ''
    },
    fetch: {
      type: Function,
      default: () => {}
    },
    serialNumber: {
      type: Number,
      default: 0
    },
    machineId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tab: null
    }
  },
  methods: {
  }
}
</script>
