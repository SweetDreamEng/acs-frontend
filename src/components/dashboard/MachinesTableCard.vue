<template>
  <div class="test-machine">
    <v-card>
      <v-card-title>
        {{ label }}
        <v-combobox
          v-model="headerColumnValues"
          :items="headerColumns"
          chips
          label="Add/Remove Coloumns"
          multiple
          class="flex-grow-0 ml-auto"
        >
          <template v-slot:selection="{ item }">
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
        <div class="d-flex flex-wrap justify-space-between">
          <span class="mr-2 font-weight-bold" style="margin-top: 4px">Use slider to adjust time period for 8-24 hours</span>
          <v-slider
            v-model="hours"
            max="24"
            min="8"
            step="1"
            thumb-label
            ticks
            prepend-icon="mdi-clock"
            style="min-width: 140px; max-width: 260px;"
            hide-details
          ></v-slider>
        </div>
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
          :headers="filtedHeaders"
          :items="items"
          :item-class="itemRowBackground"
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
export default {
  components: {
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
      showColumnFilter: false,
      headerColumnValues: []
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
    itemRowBackground(item) {
      return item.status === 'Not' ? 'background-alert' : ''
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
    }
  }
}
</script>
<style>
  /*table tbody tr.background-alert {
    background: #f98787 !important;
  }*/
</style>