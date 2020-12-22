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
        :loading="loadingDashboardDevicesTable"
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

import CompanyMenu from '../../components/dashboard/CompanyMenu'
import TopCard from '../../components/dashboard/TopCard'
import MachinesTableCard from '../../components/dashboard/MachinesTableCard'
import LocationsTable from '../../components/dashboard/dashboard-tables/LocationsTable'
import OeeBoxes from '../../components/dashboard/boxes/Index'

export default {
  components: {
    CompanyMenu,
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
      loadingDashboardDevicesTable: (state) => state.devices.loadingDashboardDevicesTable,
      loadingLocationsTable: (state) => state.machines.loadingLocationsTable,
      machines: (state) => state.machines.data,
      companies: (state) => state.customers.companies,
      selectedCompanyName: (state) => state.machines.selectedCompany ? state.machines.selectedCompany.name : '',
      privateColors: (state) => state.settings.private_colors,
      downtimeDistribution: (state) => state.machines.downtimeDistribution,
      devices: (state) => state.devices.data,
      locations: (state) => state.locations.data
    }),

    breadcrumbItems() {
      return [
        {
          text: this.selectedCompanyName,
          disabled: true
        }, {
          text: 'Dashboard',
          disabled: true
        }
      ]
    }
  },
  mounted() {
    this.initAcsDashboard()
    this.initLocationsTable()
    this.getAcsDevicesAnalytics()
  },
  methods: {
    ...mapActions({
      initAcsDashboard: 'machines/initAcsDashboard',
      initLocationsTable: 'machines/initLocationsTable',
      getAcsDevicesAnalytics: 'devices/getAcsDevicesAnalytics',
      changeSelectedCompany: 'machines/changeSelectedCompany'
    }),
    onCompanyChanged(company) {
      this.changeSelectedCompany(company)
    }
  }
}
</script>
