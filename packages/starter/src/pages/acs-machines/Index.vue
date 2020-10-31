<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-card>
      <v-card-title>
        ACS Machines
        <v-btn
          text
          class="ml-auto"
          @click="showColumnFilter = !showColumnFilter"
        >{{ showColumnFilter ? 'Close' : 'Add/Remove Columns' }}</v-btn>
      </v-card-title>
      <v-card-subtitle>
        <v-expand-transition>
          <div v-show="showColumnFilter">
            <v-row>
              <v-col xs="12" sm="6" md="4" class="py-1">
                <v-checkbox class="mt-1" v-model="parameterIds" label="Customer Name" value="customerName"></v-checkbox>
                <v-checkbox class="mt-1" v-model="parameterIds" label="Running" value="status"></v-checkbox>
              </v-col>
              <v-col xs="12" sm="6" md="4" class="py-1">
                <v-checkbox class="mt-1" v-model="parameterIds" label="Machine Names" value="machinename"></v-checkbox>
                <v-checkbox class="mt-1" v-model="parameterIds" label="Capacity Utilization" value="capacity"></v-checkbox>
              </v-col>
              <v-col xs="12" sm="6" md="4" class="py-1">
                <v-checkbox class="mt-1" v-model="parameterIds" label="Consumption" value="consumption"></v-checkbox>
                <v-checkbox class="mt-1" v-model="parameterIds" label="Zones" value="department"></v-checkbox>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </v-card-subtitle>
      <v-card-text>
        <div v-if="isLoading1" class="d-flex flex-grow-1 align-center justify-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <v-data-table
          v-else
          :headers="filtedHeaders"
          :items="machines"
          :search="searchQuery"
          @click:row="productView"
        >
          <template v-slot:top>
            <v-text-field
              v-model="searchQuery"
              append-icon="mdi-magnify"
              solo
              hide-details
              dense
              clearable
              placeholder="Search"
              class="mx-1"
            ></v-text-field>
          </template>
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

          <template v-slot:item.customerName="{ item }">
            {{ customerName(item.customerId) }}
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
import { mapState } from 'vuex'
/*
|---------------------------------------------------------------------
| Machines Table Card Component
|---------------------------------------------------------------------
|
| Machines table card to list machines and their properties
|
*/
export default {
  data () {
    return {
      loadingInterval: null,
      isLoading1: true,

      headers: [
        { text: 'Customer Name', value: 'customerName' },
        { text: 'Running', align: 'center', value: 'status' },
        { text: 'Machine Name', align: 'start', value: 'machinename' },
        { text: 'Capacity Utilization', align: 'center', value: 'capacity' },
        { text: 'Consumption', align: 'center', value: 'consumption' },
        { text: 'Zones', align: 'center', value: 'department' }
      ],

      // hours: 8,
      searchQuery: '',
      showColumnFilter: false,
      parameterIds: ['customerName', 'status', 'machinename', 'capacity', 'consumption', 'department']
    }
  },
  computed: {
    ...mapState({
      machines: (state) => state.machines.data,
      customers: (state) => state.customers.data
    }),
    filtedHeaders() {
      return this.headers.filter((header) => {
        return this.parameterIds.includes(header.value)
      })
    }
  },
  mounted() {
    let count = 0

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 400)
  },
  methods: {
    clear() {
      clearInterval(this.loadingInterval)
    },
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
    customerName(id) {
      return this.customers.find((customer) => customer.id === id).name
    }
  }
}
</script>