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
        <oee-container :oees="oees"></oee-container>
      </v-container>
    </v-sheet>
    <v-container>
      <zones-table
        :loading="loadingZonesTable"
        :zones="zones"
      >
      </zones-table>

      <br>

      <machines-table-card :location="parseInt($route.params.location)"></machines-table-card>
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
import OeeContainer from '../../components/dashboard/OeeContainer'

export default {
  components: {
    CompanyMenu,
    MachinesTableCard,
    ZonesTable,
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
      
      machines: (state) => state.machines.data,
      companies: (state) => state.customers.companies,
      selectedCompanyName: (state) => state.machines.selectedCompany ? state.machines.selectedCompany.name : '',
      zones: (state) => state.zones.data
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
  },
  methods: {
    ...mapActions({
      initAcsDashboard: 'machines/initAcsDashboard',
      initZonesTable: 'machines/initZonesTable',
      changeSelectedCompany: 'machines/changeSelectedCompany',
      getLocations: 'locations/getLocations'
    }),
    onCompanyChanged(company) {
      this.changeSelectedCompany(company)
    }
  }
}
</script>