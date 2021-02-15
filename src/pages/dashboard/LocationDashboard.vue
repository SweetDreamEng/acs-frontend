<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="surface2" class="my-n8 pt-8 py-7">
      <v-container class="pb-0">
        <div v-if="$route.name === 'location-acs-dashboard'" class="d-flex mt-2 align-center">
          <v-breadcrumbs :items="acsBreadcrumbItems"></v-breadcrumbs>
          <v-spacer></v-spacer>
          <company-menu
            :companies="companies"
            @companyChanged="onCompanyChanged"
          >
          </company-menu>
        </div>
        <v-breadcrumbs v-else :items="breadcrumbItems"></v-breadcrumbs>
        <top-card></top-card>
        <oee-container class="mt-2" :oees="oees"></oee-container>
      </v-container>
    </v-sheet>
    <v-container>
      <dashboard-table
        :loading="loadingZonesTable"
        :items="zones"
        table-type="zone"
      >
      </dashboard-table>

      <br>

      <machines-table-card :location="parseInt($route.params.location)"></machines-table-card>
    </v-container>
  </div>
</template>

<script>

// import vuex helper functions
import { mapState, mapGetters, mapActions } from 'vuex'

import CompanyMenu from '../../components/dashboard/CompanyMenu'
import MachinesTableCard from '../../components/dashboard/MachinesTableCard'
import DashboardTable from '../../components/dashboard/dashboard-tables/DashboardTable'
import TopCard from '../../components/dashboard/TopCard'
import OeeContainer from '../../components/dashboard/OeeContainer'

export default {
  components: {
    CompanyMenu,
    MachinesTableCard,
    DashboardTable,
    TopCard,
    OeeContainer
  },
  data() {
    return {
      oees: [
        {
          zone: 'Zone 1',
          color: 'green',
          value: 75,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 13],
              ['2020-02-03', 16],
              ['2020-02-04', 9],
              ['2020-02-05', 12]
            ]
          }]
        },
        {
          zone: 'Zone 2',
          color: 'green',
          value: 52,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 13],
              ['2020-02-03', 11],
              ['2020-02-04', 13],
              ['2020-02-05', 12]
            ]
          }]
        },
        {
          zone: 'Zone 3',
          color: 'red',
          value: 78,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 6],
              ['2020-02-03', 18],
              ['2020-02-04', 3],
              ['2020-02-05', 22]
            ]
          }]
        },
        {
          zone: 'Zone 4',
          color: 'green',
          value: 75,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 3],
              ['2020-02-03', 21],
              ['2020-02-04', 13],
              ['2020-02-05', 32]
            ]
          }]
        }
      ]
    }
  },
  computed: {
    ...mapState({
      loadingZonesTable: (state) => state.machines.loadingZonesTable,
      loadingDashboardDevicesTable: (state) => state.devices.loadingDashboardDevicesTable,

      zones: (state) => state.zones.data,

      companies: (state) => state.customers.companies,
      selectedCompanyName: (state) => state.machines.selectedCompany ? state.machines.selectedCompany.name : ''
    }),
    ...mapGetters({
      locationName: 'locations/locationName',
      canViewCompanies: 'auth/canViewCompanies'
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
    },
    acsBreadcrumbItems() {
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
    if (this.canViewCompanies)
      this.initAcsDashboard()
    this.getLocations()
    this.initZonesTable(this.$route.params.location)
  },
  methods: {
    ...mapActions({
      initAcsDashboard: 'machines/initAcsDashboard',
      initZonesTable: 'machines/initZonesTable',
      getLocations: 'locations/getLocations',
      changeSelectedCompany: 'machines/changeSelectedCompany'
    }),
    onCompanyChanged(company) {
      this.changeSelectedCompany(company)
    }
  }
}
</script>
