<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="surface2" class="my-n8 py-8">
      <v-container class="pb-0">
        <v-breadcrumbs :items="breadcrumbItems"></v-breadcrumbs>
        <top-card></top-card>
        <ZoneCards></ZoneCards>
      </v-container>
    </v-sheet>
    <v-container>
      <zones-table
        :loading="loadingZonesTable"
        :zones="zones"
      >
      </zones-table>

      <br>

      <machines-table-card
        :devices="devices"
      ></machines-table-card>
    </v-container>
  </div>
</template>

<script>

// import vuex helper functions
import { mapState, mapGetters, mapActions } from 'vuex'

import MachinesTableCard from '../../components/dashboard/MachinesTableCard'
import ZonesTable from '../../components/dashboard/dashboard-tables/ZonesTable'
import TopCard from '../../components/dashboard/TopCard'
import ZoneCards from '../../components/dashboard/boxes/ZoneCard'

export default {
  components: {
    MachinesTableCard,
    ZonesTable,
    TopCard,
    ZoneCards
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      loadingZonesTable: (state) => state.machines.loadingZonesTable,

      devices: (state) => state.devices.data,
      zones: (state) => state.zones.data
    }),
    ...mapGetters({
      locationName: 'locations/locationName'
    }),
    breadcrumbItems() {
      return  [
        {
          text: 'Dashboard',
          disabled: false,
          exact: true,
          to: '/dashboard/analytics'
        },
        {
          text: this.locationName(parseInt(this.$route.params.location)),
          disabled: true
        }
      ]
    }
  },
  mounted() {
    this.initZonesTable(this.$route.params.location)
    this.getDevicesAnalytics(this.$route.params.location)
  },
  methods: {
    ...mapActions({
      initZonesTable: 'machines/initZonesTable',
      getDevicesAnalytics: 'devices/getDevicesAnalytics'
    })
  }
}
</script>