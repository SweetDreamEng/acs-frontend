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

/*
|---------------------------------------------------------------------
| Dashboard Page Component
| url: /dashboard/analytics
|---------------------------------------------------------------------
|
*/

// import vuex helper functions
import { mapState, mapGetters, mapActions } from 'vuex'

import CompanyMenu from '../../components/dashboard/CompanyMenu'
import MachinesTableCard from '../../components/dashboard/MachinesTableCard'
import ZonesTable from '../../components/dashboard/dashboard-tables/ZonesTable'
import TopCard from '../../components/dashboard/TopCard'
import ZoneCards from '../../components/dashboard/boxes/ZoneCard'

export default {
  components: {
    CompanyMenu,
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
      
      machines: (state) => state.machines.data,
      companies: (state) => state.customers.companies,
      selectedCompanyName: (state) => state.machines.selectedCompany ? state.machines.selectedCompany.name : '',
      zones: (state) => state.zones.data,
      devices: (state) => state.devices.data
    }),
    ...mapGetters({
      locationName: 'locations/locationName'
    }),
    machinesForLocation() {
      return this.machines.filter((machine) => {
        return parseInt(machine.location.id) === parseInt(this.$route.params.location)
      })
    },
    zoneIds() {
      return this.machinesForLocation.map((machine) => machine.department.id)
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
          disabled: true
        }
      ]
    }
  },
  mounted() {
    this.getLocations()
    this.initAcsDashboard()
    this.initZonesTable(this.$route.params.location)
    this.getAcsDevicesAnalytics()
  },
  methods: {
    ...mapActions({
      initAcsDashboard: 'machines/initAcsDashboard',
      initZonesTable: 'machines/initZonesTable',
      getAcsDevicesAnalytics: 'devices/getAcsDevicesAnalytics',
      changeSelectedCompany: 'machines/changeSelectedCompany',
      getLocations: 'locations/getLocations'
    }),
    onCompanyChanged(company) {
      this.changeSelectedCompany(company)
    }
  }
}
</script>