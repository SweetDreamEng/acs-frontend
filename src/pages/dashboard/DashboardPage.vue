<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="surface2" class="my-n8 pt-9 py-7">
      <v-container class="pb-0">
        <div v-if="$route.name === 'acs-machines'" class="d-flex mt-2 align-center">
          <v-breadcrumbs :items="breadcrumbItems">
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item
                :disabled="item.disabled"
              >
                {{ item.text }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
          <v-spacer></v-spacer>
          <company-menu
            :companies="companies"
            @companyChanged="onCompanyChanged"
          >
          </company-menu>
        </div>

        <top-card></top-card>
        <oee-container class="mt-2" :oees="oees"></oee-container>
      </v-container>
    </v-sheet>

    <v-container>
      <dashboard-table
        :loading="loadingLocationsTable"
        :items="locations"
        table-type="location"
      >
      </dashboard-table>

      <br>
      <saved-machines-table-card></saved-machines-table-card>
      <br>
      <machines-table-card></machines-table-card>
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

import { mapState, mapGetters, mapActions } from 'vuex'

import CompanyMenu from '../../components/dashboard/CompanyMenu'
import TopCard from '../../components/dashboard/TopCard'
import MachinesTableCard from '../../components/dashboard/MachinesTableCard'
import DashboardTable from '../../components/dashboard/dashboard-tables/DashboardTable'
import OeeContainer from '../../components/dashboard/OeeContainer'
import SavedMachinesTableCard from '../../components/dashboard/SavedMachinesTableCard'

export default {
  components: {
    CompanyMenu,
    MachinesTableCard,
    DashboardTable,
    TopCard,
    OeeContainer,
    SavedMachinesTableCard
  },
  data() {
    return {
      oees: [
        {
          location: 'Location 1',
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
          location: 'Location 2',
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
          location: 'Location 3',
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
          location: 'Location 4',
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
        },
        {
          location: 'Location 5',
          color: 'red',
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
          location: 'Location 6',
          color: 'red',
          value: 78,
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
          location: 'Location 7',
          color: 'green',
          value: 75,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 23],
              ['2020-02-03', 18],
              ['2020-02-04', 11],
              ['2020-02-05', 10]
            ]
          }]
        },
        {
          location: 'Location 8',
          color: 'red',
          value: 52,
          series: [{
            name: 'Avg FPY',
            data: [
              ['2020-02-02', 9],
              ['2020-02-03', 21],
              ['2020-02-04', 33],
              ['2020-02-05', 6]
            ]
          }]
        }
      ]
    }
  },
  computed: {
    ...mapState({
      loadingLocationsTable: (state) => state.machines.loadingLocationsTable,
      loadingDashboardDevicesTable: (state) => state.devices.loadingDashboardDevicesTable,

      locations: (state) => state.locations.data,
      companies: (state) => state.companies.companies,
      selectedCompanyName: (state) => state.machines.selectedCompany ? state.machines.selectedCompany.name : '',
      selectedCompany: (state) => state.machines.selectedCompany
    }),
    ...mapGetters('auth', ['canViewCompanies']),
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
    if (this.canViewCompanies)
      this.initAcsDashboard()
    this.getZones()
    this.initLocationsTable({ companyId: 0 })
  },
  methods: {
    ...mapActions({
      initAcsDashboard: 'machines/initAcsDashboard',
      initLocationsTable: 'machines/initLocationsTable',
      getZones: 'zones/getZones',
      changeSelectedCompany: 'machines/changeSelectedCompany',
      getDevicesAnalytics: 'devices/getDevicesAnalytics'
    }),
    onCompanyChanged(company) {
      this.changeSelectedCompany(company)

      this.initLocationsTable({
        companyId: this.selectedCompany.id
      })

      this.getDevicesAnalytics({
        page: 1,
        location_id: this.location,
        company_id: this.selectedCompany.id
      })
    }
  }
}
</script>
