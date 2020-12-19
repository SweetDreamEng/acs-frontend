<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="surface2" class="my-n8 py-8">
      <v-container class="pb-0">
        <v-breadcrumbs :items="breadcrumbItems"></v-breadcrumbs>
        <top-card></top-card>
      </v-container>
    </v-sheet>
    <v-container>
      <machines-table
        :loading="loadingMachinesTable"
        :devices="devices"
      >
      </machines-table>
    </v-container>
  </div>
</template>

<script>

// import vuex helper functions
import { mapState, mapGetters, mapActions } from 'vuex'

// DEMO Cards for dashboard
import MachinesTable from '../../components/dashboard/dashboard-tables/MachinesTable'
import SalesCard from '../../components/dashboard/SalesCard'
import TopCard from '../../components/dashboard/TopCard'

export default {
  components: {
    MachinesTable,
    TopCard
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      loadingMachinesTable: (state) => state.machines.loadingMachinesTable,

      devices: (state) => state.devices.data
    }),
    ...mapGetters({
      locationName: 'locations/locationName',
      zoneName: 'zones/zoneName'
    }),
    breadcrumbItems() {
      return  [
        {
          text: 'Dashboard',
          disabled: false,
          exact: true,
          to: '/dashboard/analytics'
        }, {
          text: this.locationName(parseInt(this.$route.params.location)),
          disabled: false,
          exact: true,
          to: `/dashboard/analytics/${this.$route.params.location}`
        }, {
          text: this.zoneName(parseInt(this.$route.params.zone)),
          disabled: true
        }
      ]
    }
  },
  mounted() {
    this.getLocations()
    this.getZones()
    this.initMachinesTable(this.$route.params.zone)
  },
  methods: {
    ...mapActions({
      initMachinesTable: 'machines/initMachinesTable',
      getLocations: 'locations/getLocations',
      getZones: 'zones/getZones'
    })
  }
}
</script>