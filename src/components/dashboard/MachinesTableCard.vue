<template>
  <v-card :disabled="loading">
    <v-card-title>
      Report
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
    <v-card-text>
      <v-data-table
        id="machines-table"
        :headers="filtedHeaders"
        :items="devices"
        :search="searchQuery"
        :loading="loading"
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

        <!-- -->
        <template v-slot:item.status="{ item }">
          <v-icon :color="getColor(item)">{{ getIcon(item) }}</v-icon>
        </template>
        <template v-slot:item.location_id="{ item }">
          {{ locationName(item.location_id) }}
        </template>
        <template v-slot:item.zone_id="{ item }">
          {{ zoneName(item.zone_id) }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    loading: {
      type: Boolean,
      default: false
    },
    devices: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      headers: [
        { text: 'Running', align: 'center', value: 'status' },
        { text: 'Machine Name', align: 'start', value: 'name' },
        { text: 'Capacity Utilization', align: 'center', value: 'capacity' },
        { text: 'Consumption', align: 'center', value: 'consumption' },
        { text: 'Locations', align: 'center', value: 'location_id' },
        { text: 'Zones', align: 'center', value: 'zone_id' }
      ],

      hours: 8,
      searchQuery: '',
      row: '',
      headerColumnValues: ['Running', 'Machine Name', 'Capacity Utilization', 'Consumption', 'Locations', 'Zones']
    }
  },
  computed: {
    ...mapGetters({
      locationName: 'locations/locationName',
      zoneName: 'zones/zoneName'
    }),
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
    productView(item) {
      this.$router.push({
        name: 'product-details',
        params: {
          configurationId: item.machine_id,
          productId: item.serial_number
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
  #machines-table table tbody tr {
    cursor: pointer;
  }
</style>