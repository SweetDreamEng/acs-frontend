<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="surface2" class="my-n8 py-8">
      <v-container class="pb-0">
        <div class="d-flex mt-2 align-center">
          <v-breadcrumbs :items="breadcrumbItems"></v-breadcrumbs>
          <v-spacer></v-spacer>
          <company-menu
            :companies="companies"
            @companyChanged="onCompanyChanged"
          >
          </company-menu>
        </div>
        <top-card></top-card>
      </v-container>
    </v-sheet>
    <v-container>
      <machines-table
        :devices="devices"
      >
      </machines-table>
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

// import vuex helper functions
import { mapState, mapGetters, mapActions } from 'vuex'

// DEMO Cards for dashboard
import CompanyMenu from '../../components/dashboard/CompanyMenu'
import MachinesTable from '../../components/dashboard/dashboard-tables/MachinesTable'
import SalesCard from '../../components/dashboard/SalesCard'
import TopCard from '../../components/dashboard/TopCard'

export default {
  components: {
    CompanyMenu,
    MachinesTable,
    TopCard
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      machines: (state) => state.machines.data,
      companies: (state) => state.customers.companies,
      selectedCompanyName: (state) => state.machines.selectedCompany ? state.machines.selectedCompany.name : '',
      devices: (state) => state.devices.data
    }),
    ...mapGetters({
      locationName: 'locations/locationName',
      zoneName: 'zones/zoneName'
    }),
    machinesForZone() {
      return this.machines.filter((machine) => {
        return parseInt(machine.location.id) === parseInt(this.$route.params.location)
          && parseInt(machine.zone.id) === parseInt(this.$route.params.zone)
      })
    },
    breadcrumbItems() {
      return [
        {
          text: this.selectedCompanyName,
          disabled: true
        }, {
          text: 'Dashboard',
          disabled: false,
          exact: true,
          to: '/acs-machines'
        }, {
          text: this.locationName(parseInt(this.$route.params.location)),
          disabled: false,
          exact: true,
          to: `/acs-machines/${this.$route.params.location}`
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
    this.initAcsMachinesTable(this.$route.params.zone)
    this.changeSelectedCompany()
  },
  methods: {
    ...mapActions({
      initAcsMachinesTable: 'machines/initAcsMachinesTable',
      getAcsDevicesAnalytics: 'devices/getAcsDevicesAnalytics',
      changeSelectedCompany: 'machines/changeSelectedCompany',
      getLocations: 'locations/getLocations',
      getZones: 'zones/getZones'
    }),
    onCompanyChanged(company) {
      this.changeSelectedCompany(company)
    }
  }
}
</script>