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

export default {
  components: {
    CompanyMenu,
    MachinesTableCard,
    DashboardTable,
    TopCard
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      userRole: (state) => state.auth.user.role,
      loadingZonesTable: (state) => state.machines.loadingZonesTable,
      loadingDashboardDevicesTable: (state) => state.devices.loadingDashboardDevicesTable,

      zones: (state) => state.zones.data,

      companies: (state) => state.companies.companies,
      selectedCompanyName: (state) => state.machines.selectedCompany ? state.machines.selectedCompany.name : '',
      selectedCompany: (state) => state.machines.selectedCompany
    }),
    ...mapGetters({
      locationName: 'locations/locationName',
      canViewCompanies: 'auth/canViewCompanies'
    }),
    isAcsUser() {
      return ['acs_admin', 'acs_manager', 'acs_viewer'].includes(this.userRole)
    },
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
  async mounted() {
    if (this.canViewCompanies)
      await this.initAcsDashboard()
    this.getLocations()
    this.initZonesTable(this.$route.params.location)
    this.getDowntimeGraphData({
      company_id: this.selectedCompany ? this.selectedCompany.id : 0,
      location_id: this.$route.params.location,
      zone_id: 0,
      to: new Date().getTime(),
      from: new Date().getTime() - 60 * 60 * 24 * 1000
    })

    this.getDowntimeByTypeGraphSeries({
      company_id: this.selectedCompany ? this.selectedCompany.id : 0,
      location_id: this.$route.params.location,
      zone_id: 0,
      to: new Date().getTime(),
      from: new Date().getTime() - 60 * 60 * 24 * 1000
    })

    this.getDowntimeByReasonGraphSeries({
      company_id: this.selectedCompany ? this.selectedCompany.id : 0,
      location_id: this.$route.params.location,
      zone_id: 0,
      to: new Date().getTime(),
      from: new Date().getTime() - 60 * 60 * 24 * 1000
    })
  },
  methods: {
    ...mapActions({
      initAcsDashboard: 'machines/initAcsDashboard',
      initZonesTable: 'machines/initZonesTable',
      getLocations: 'locations/getLocations',
      changeSelectedCompany: 'machines/changeSelectedCompany',
      getDowntimeGraphData: 'devices/getDowntimeGraphData',
      getDowntimeByTypeGraphSeries: 'devices/getDowntimeByTypeGraphSeries',
      getDowntimeByReasonGraphSeries: 'devices/getDowntimeByReasonGraphSeries'
    }),
    onCompanyChanged(company) {
      this.changeSelectedCompany(company)

      this.$router.push({
        name: 'acs-machines'
      })
      
    }
  }
}
</script>
