<template>
  <div class="test-machine">
    <v-card>
      <v-card-title>
        {{ label }}
        <v-combobox
          v-model="headerColumnValues"
          :items="headerColumns"
          chips
          solo
          label="Add/Remove Coloumns"
          multiple
          class="flex-grow-0 ml-auto"
        >
          <template v-slot:selection="{ attrs, item }">
            <v-chip
              v-bind="attrs"
              close
              small
              @click:close="remove(item)"
            >
              {{ item }}
            </v-chip>
          </template>
        </v-combobox>
      </v-card-title>
      <v-card-subtitle>
        <TimeRangeChooser />
        <div>
          <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            solo
            hide-details
            dense
            clearable
            placeholder="Search"
          ></v-text-field>
        </div>
      </v-card-subtitle>
      <v-card-text>
        <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <v-data-table
          v-else
          id="machines-table"
          :headers="filtedHeaders"
          :items="items"
          hide-default-footer
          :search="searchQuery"
          @click:row="productView"
        >
          <template v-slot:header.status="{ header }">
            <v-icon color="primary">mdi-chevron-double-right</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.machinename="{ header }">
            <v-icon small color="primary">mdi-wrench</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.capacity="{ header }">
            <v-icon color="primary">mdi-trending-up</v-icon>
            {{ header.text | percentageLabel }}
          </template>
          <template v-slot:header.consumption="{ header }">
            <v-icon class="mdi-rotate-90" color="primary">mdi-battery-30</v-icon>
            {{ header.text }}
          </template>
          <template v-slot:header.department="{ header }">
            <v-icon small color="primary">mdi-factory</v-icon>
            {{ header.text }}
          </template>

          <template v-slot:item.status="{ item }">
            <v-icon :color="getColor(item)">{{ getIcon(item) }}</v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
/*
|---------------------------------------------------------------------
| Machines Table Card Component
|---------------------------------------------------------------------
|
| Machines table card to list machines and their properties
|
*/
import TimeRangeChooser from './TimeRangeChooser1'
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
    items: {
      type: Array,
      default: () => {
        []
      }
    }
  },
  data () {
    return {
      headers: [
        { text: 'Running', align: 'center', value: 'status' },
        { text: 'Machine Name', align: 'start', value: 'machinename' },
        { text: 'Capacity Utilization', align: 'center', value: 'capacity' },
        { text: 'Consumption', align: 'center', value: 'consumption' },
        { text: 'Zones', align: 'center', value: 'department' }
      ],

      hours: 8,
      searchQuery: '',
      timeRageDlg: false,
      row: '',
      headerColumnValues: ['Running', 'Machine Name', 'Capacity Utilization', 'Consumption', 'Zones'],

      timeRageOptions: [
        {
          label: 'Last 30 minutes',
          value: 'last30Min'
        },
        {
          label: 'Last hour',
          value: 'lastHour'
        },
        {
          label: 'Last 4 hours',
          value: 'last4Hours'
        },
        {
          label: 'Last 12 hours',
          value: 'last12Hours'
        },
        {
          label: 'Last 24 hours',
          value: 'last24Hours'
        },
        {
          label: 'Last 48 hours',
          value: 'last48Hours'
        },
        {
          label: 'Last 3 days',
          value: 'last3Days'
        },
        {
          label: 'Last 7 days',
          value: 'last7Days'
        },
        {
          label: 'Last 24 days',
          value: 'last24Days'
        },
        {
          label: 'Custom',
          value: 'custom'
        }
      ],
      timeRange: 'last24Hours'
      // dateFromMenu: false,
      // dateFrom: '',
      // timeFromMenu: false,
      // timeFrom: '',
      // dateToMenu: false,
      // dateTo: '',
      // timeToMenu: false,
      // timeTo: ''
    }
  },
  computed: {
    filtedHeaders() {
      return this.headers.filter((header) => {
        return this.headerColumnValues.includes(header.text)
      })
    },
    headerColumns() {
      return this.headers.map((header) => header.text)
    },
    timeRangeLabel() {
      return this.timeRageOptions.find((range) => range.value === this.timeRange).label
    }
  },
  methods: {
    ...mapActions([
      'selectMachine'
    ]),
    open(item) { },
    getColor (item) {
      if (item.status === 'Warning') return 'orange'
      else if (item.status === 'Alarm') return 'green'
      else if (item.status === 'Not') return 'red'
      else return 'green'
    },
    getIcon(item) {
      if (item.status === 'Warning') return 'mdi-alert'
      else if (item.status === 'Alarm') return 'mdi-check-circle-outline'
      else if (item.status === 'Not') return 'mdi-bell-circle'
      else return 'mdi-check-circle-outline'
    },
    invalidItem(item) {
      return item.status === 'Not' ? true : false
    },
    productView(item) {
      this.$router.push({
        name: 'dashboard-product',
        params: {
          id: item.id
        }
      })
    },
    remove (item) {
      this.headerColumnValues.splice(this.headerColumnValues.indexOf(item), 1)
      this.headerColumnValues = [...this.headerColumnValues]
    },
    applyTimeRange(timeRange) {
      console.log(timeRange)

      this.timeRange = timeRange
      this.timeRageDlg = false
    }
  }
}
</script>
<style>
  #machines-table table tbody tr {
    cursor: pointer;
  }
</style>