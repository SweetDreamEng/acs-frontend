<template>
  <v-card
    :loading="loadingAlarmsTable"
    :disabled="loadingAlarmsTable"
  >
    <v-card-title color="primary">
      Alarms
      <v-spacer></v-spacer>
      <v-btn
        icon
        small
        class="ml-2"
        @click="open()"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
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
import alarmsTableStore from './store'

export default {
  name: 'AlarmsTable',
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
  data () {
    return {
      headers: [
        { text: 'Alarm', align: 'start', value: 'name' },
        { text: 'Alarm activated at', align: 'start', value: 'createdAt' },
        { text: '', value: 'data-table-expand' }
      ]
    }
  },
  computed: {
    loadingAlarmsTable() {
      return this.$store.state[this.namespace]['loadingAlarmsTable']
    },
    alarmTypes() {
      return this.$store.state[this.namespace]['alarmTypes']
    },
    alarms() {
      return this.$store.state[this.namespace]['alarms']
    },
    tableItems() {
      return this.alarmTypes.filter((alarmType) => {
        const alarm = this.alarms.find((alarm) => alarm.type_id === alarmType.id)

        return alarm && alarm.active
      })
    }
  },
  created() {
    if (!this.isModuleCreated([this.namespace])) {
      this.registerModule()
    }
  },
  mounted() {
    this.open()
  },
  methods: {
    ...mapActions({
      getProductAlarms(dispatch, payload) {
        return dispatch(this.namespace + '/getProductAlarms', payload)
      }
    }),
    isModuleCreated(path) {
      let m = this.$store._modules.root

      return path.every((p) => {
        m = m._children[p]

        return m
      })
    },
    registerModule() {
      this.$store.registerModule(this.namespace, {
        namespaced: true,
        state: alarmsTableStore.alarmsTableState(),
        actions: alarmsTableStore.alarmsTableActions(this.fetch),
        mutations: alarmsTableStore.alarmsTableMutations()
      })
    },
    open() {
      this.getProductAlarms({
        serialNumber: this.serialNumber,
        machineId: this.machineId
      })
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
