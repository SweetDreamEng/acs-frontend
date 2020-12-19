<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="surface2" class="my-n8 py-8">
      <v-container class="pb-0">
        <top-card></top-card>
        <OeeBoxes></OeeBoxes>
      </v-container>
    </v-sheet>

    <v-container>
      <locations-table
        :loading="loadingLocationsTable"
        :locations="locations"
      >
      </locations-table>

      <br>

      <machines-table-card
        :devices="devices"
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
    }
  },
  computed: {
    ...mapState({
      loadingLocationsTable: (state) => state.machines.loadingLocationsTable,
      
      devices: (state) => state.devices.data,
      locations: (state) => state.locations.data,
      zones: (state) => state.zones.data,
      privateColors: (state) => state.settings.private_colors,
      downtimeDistribution: (state) => state.machines.downtimeDistribution
    })
  },
  mounted() {
    this.setInitialSetting({}).then(() => {
      this.$vuetify.theme.themes.light.primary = this.privateColors[0]
      if (this.privateColors.length >= 2) {
        this.$vuetify.theme.themes.light.accent = this.privateColors[1]
        this.$vuetify.theme.themes.light.background = this.privateColors[2]
      }
    })

    this.getCustomerDevicesAnalytics()
    this.getZones()
    this.initLocationsTable()
  },
  methods: {
    ...mapActions({
      initLocationsTable: 'machines/initLocationsTable',
      getCustomerDevicesAnalytics: 'devices/getCustomerDevicesAnalytics',
      getZones: 'zones/getZones',
      setInitialSetting: 'settings/setInitialSetting'
    })
  }
}
</script>
