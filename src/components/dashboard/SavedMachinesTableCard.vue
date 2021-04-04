<template>
  <v-card :disabled="loadingDashboardSavedMachinesTable">
    <v-card-title>
      Saved Machines
      <br />
      <br />
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
            color="primary lighten-2"
            outlined
            @click:close="remove(item)"
          >
            {{ item }}
          </v-chip>
        </template>
      </v-combobox>
    </v-card-title>
    <v-card-text>
      <v-data-table
        id="saved-machines-table"
        :headers="filtedHeaders"
        :items="savedMachines"
        :search="searchQuery"
        :loading="loadingDashboardSavedMachinesTable"
        :items-per-page="10"
        :page.sync="page"
        class="link-table"
        hide-default-footer
        @click:row="productView"
      >
        <template v-slot:header.status="{ header }">
          <v-icon color="primary">$mdi-chevron-double-right</v-icon>
          {{ header.text }}
        </template>
        <template v-slot:header.name="{ header }">
          <v-icon small color="primary">$mdi-wrench</v-icon>
          {{ header.text }}
        </template>
        <template v-slot:header.capacity="{ header }">
          <v-icon color="primary">$mdi-trending-up</v-icon>
          {{ header.text | percentageLabel }}
        </template>
        <template v-slot:header.consumption="{ header }">
          <v-icon class="mdi-rotate-90" color="primary">$mdi-battery-30</v-icon>
          {{ header.text }}
        </template>
        <template v-slot:header.location_id="{ header }">
          <v-icon small color="primary">$mdi-factory</v-icon>
          {{ header.text }}
        </template>

        <!-- -->
        <template v-slot:item.status="{ item }">
          <v-list-item-avatar class="mr-1" :color="getColor(item)" size="25">
            <v-icon small>
              {{ getIcon(item) }}
            </v-icon>
          </v-list-item-avatar>
        </template>
        <template v-slot:item.configuration="{ item }">
          <span v-if="item.configuration">{{ item.configuration.name }}</span>
        </template>
        <template v-slot:item.location_id="{ item }">
          {{ locationName(item.location_id) }}
        </template>
        <template v-slot:item.zone_id="{ item }">
          {{ zoneName(item.zone_id) }}
        </template>
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="savedMachinesPageCountReport"
        :total-visible="7"
        @input="getSavedMachines({ page: page })"
      ></v-pagination>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
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
    location: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      headers: [
        { text: 'Running', align: 'center', value: 'status' },
        { text: 'Machine Name', align: 'start', value: 'name' },
        { text: 'Machine Type', align: 'start', value: 'configuration' },
        { text: 'Capacity Utilization', align: 'center', value: 'capacity' },
        { text: 'Consumption', align: 'center', value: 'consumption' },
        { text: 'Locations', align: 'center', value: 'location_id' },
        { text: 'Zones', align: 'center', value: 'zone_id' }
      ],
      page: 1,
      hours: 8,
      searchQuery: '',
      row: '',
      headerColumnValues: [
        'Running',
        'Machine Name',
        'Machine Type',
        'Capacity Utilization',
        'Consumption',
        'Locations',
        'Zones'
      ]
    }
  },
  computed: {
    ...mapState({
      savedMachines: (state) => state.devices.savedMachines,
      loadingDashboardSavedMachinesTable: (state) => state.devices.loadingDashboardSavedMachinesTable,
      savedMachinesPageCountReport: (state) => state.devices.savedMachinesPageCountReport
    }),
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
  mounted() {
    this.getSavedMachines({
      page: this.page
    })
  },
  methods: {
    ...mapActions({
      getSavedMachines: 'devices/getSavedMachines'
    }),
    open(item) { },
    getColor (item) {
      return item.status ? 'green' : 'red'
    },
    getIcon(item) {
      if (item.status) return '$mdi-check-circle-outline'
      else return '$mdi-lan-disconnect'
    },
    productView(item) {
      if (item.location_id && item.zone_id) {
        this.$router.push({
          name: 'dashboard-product',
          params: {
            location: item.location_id,
            zone: item.zone_id,
            configurationId: item.machine_id,
            productId: item.serial_number
          }
        })
      } else {
        this.$router.push({
          name: 'product-details',
          params: {
            configurationId: item.machine_id,
            productId: item.serial_number
          }
        })
      }
    },
    remove (item) {
      this.headerColumnValues.splice(this.headerColumnValues.indexOf(item), 1)
      this.headerColumnValues = [...this.headerColumnValues]
    }
  }
}
</script>