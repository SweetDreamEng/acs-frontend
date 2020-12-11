<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="primary lighten-1" class="my-n4 mb-n8 pb-8">
      <v-container class="pb-0">
        <top-card></top-card>
        <v-row dense>
          <v-col cols="12">
            <OeeBoxes></OeeBoxes>
          </v-col>
        </v-row>
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
      locations: (state) => state.locations.data,
      zones: (state) => state.zones.data,
      privateColors: (state) => state.settings.private_colors
    })
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
