<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="surface2" class="my-n8 py-8">
      <v-container class="pb-0">
        <top-card></top-card>
        <OeeBoxes></OeeBoxes>
      </v-container>
    </v-sheet>

    <v-container>
      <locations-table :locations="locations"></locations-table>

      <br>

      <machines-table-card
        :devices="devices"
        :loading="isLoading1"
      ></machines-table-card>
    </v-container>
  </div>
</template>

<script>

/*
|---------------------------------------------------------------------
| Dashboard Page Component
| url: /dashboard/analytics
|---------------------------------------------------------------------
|
*/

import { mapState, mapActions } from 'vuex'

import TopCard from '../../components/dashboard/TopCard'
import MachinesTableCard from '../../components/dashboard/MachinesTableCard'
import LocationsTable from '../../components/dashboard/dashboard-tables/LocationsTable'
import OeeBoxes from '../../components/dashboard/boxes/Index'

export default {
  components: {
    MachinesTableCard,
    LocationsTable,
    TopCard,
    OeeBoxes
  },
  data() {
    return {
      loadingInterval: null,

      isLoading1: true,

      page: 1,
      total: 9
    }
  },
  computed: {
    ...mapState({
      devices: (state) => state.devices.data,
      // locations: (state) => state.locations.data,
      zones: (state) => state.zones.data,
      privateColors: (state) => state.settings.private_colors,
      downtimeDistribution: (state) => state.machines.downtimeDistribution
    }),
    locations() {
      return [
        {
          location: {
            label: 'Location 1',
            id: 1
          },
          utilization: '32%',
          color: 'green',
          value: 75,
          oee: '93.1%',
          performance: '78%',
          rate: 56,
          downtime_distribution: [
            {
              name: 'Name',
              data: [this.downtimeDistribution[1]]
            },
            {
              name: 'Name',
              data: [this.downtimeDistribution[0]]
            },
            {
              name: 'Name',
              data: [this.downtimeDistribution[2]]
            }
          ]
        },
        {
          location: {
            label: 'Location 2',
            id: 2
          },
          utilization: '36%',
          color: 'green',
          value: 52,
          oee: '89.8%',
          performance: '28%',
          rate: 65,
          downtime_distribution: [
            {
              name: 'Name',
              data: [44]
            },
            {
              name: 'Name',
              data: [53]
            },
            {
              name: 'Name',
              data: [12]
            }
          ]
        },
        {
          location: {
            label: 'Location 3',
            id: 3
          },
          utilization: '82%',
          color: 'red',
          value: 78,
          oee: '78.2%',
          performance: '25%',
          rate: 34,
          downtime_distribution: [
            {
              name: 'Name',
              data: [41]
            },
            {
              name: 'Name',
              data: [33]
            },
            {
              name: 'Name',
              data: [12]
            }
          ]
        }
      ]
    }
  },
  mounted() {
    let count = 0

    this.setInitialSetting({}).then(() => {
      this.$vuetify.theme.themes.light.primary = this.privateColors[0]
      if (this.privateColors.length >= 2) {
        this.$vuetify.theme.themes.light.accent = this.privateColors[1]
        this.$vuetify.theme.themes.light.background = this.privateColors[2]
      }
    })

    this.getCustomerDevicesAnalytics()
    this.getLocations()
    this.getZones()
    this.initLocationsTable()

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 400)
  },
  beforeDestroy() {
    this.clear()
  },
  methods: {
    ...mapActions({
      initLocationsTable: 'machines/initLocationsTable',
      getCustomerDevicesAnalytics: 'devices/getCustomerDevicesAnalytics',
      getLocations: 'locations/getLocations',
      getZones: 'zones/getZones',
      setInitialSetting: 'settings/setInitialSetting'
    }),
    clear() {
      clearInterval(this.loadingInterval)
    }
  }
}
</script>
