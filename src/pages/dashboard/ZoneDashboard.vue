<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="surface2" class="my-n8 pt-8 py-7">
      <v-container class="pb-0">
        <div v-if="$route.name === 'zone-acs-dashboard'" class="d-flex mt-2 align-center">
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
      <machines-table></machines-table>
    </v-container>
  </div>
</template>

<script>

// import vuex helper functions
import { mapState, mapGetters, mapActions } from 'vuex'

import CompanyMenu from '../../components/dashboard/CompanyMenu'
import MachinesTable from '../../components/dashboard/dashboard-tables/DashboardTableMachinesTable'
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
      loadingMachinesTable: (state) => state.machines.loadingMachinesTable,
      companies: (state) => state.companies.companies,
      selectedCompanyName: (state) => state.machines.selectedCompany ? state.machines.selectedCompany.name : '',
      devices: (state) => state.devices.data,
      selectedCompany: (state) => state.machines.selectedCompany,
      userCompanyName: (state) => state.auth.user.companyName
    }),
    ...mapGetters({
      locationName: 'locations/locationName',
      zoneName: 'zones/zoneName',
      canViewCompanies: 'auth/canViewCompanies'
    }),
    breadcrumbItems() {
      return  [
        {
          text: this.userCompanyName,
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
    },
    acsBreadcrumbItems() {
      return [
        {
          text: this.selectedCompanyName,
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
  async mounted() {
    if (this.canViewCompanies)
      await this.initAcsDashboard()
    this.getLocations()
    this.getZones()
    this.getDowntimeGraphData({
      company_id: this.selectedCompany ? this.selectedCompany.id : 0,
      location_id: this.$route.params.location,
      zone_id: this.$route.params.zone,
      to: new Date().getTime(),
      from: new Date().getTime() - 60 * 60 * 24 * 1000
    })

    this.getDowntimeByTypeGraphSeries({
      company_id: this.selectedCompany ? this.selectedCompany.id : 0,
      location_id: this.$route.params.location,
      zone_id: this.$route.params.zone,
      to: new Date().getTime(),
      from: new Date().getTime() - 60 * 60 * 24 * 1000
    })

    this.getDowntimeByReasonGraphSeries({
      company_id: this.selectedCompany ? this.selectedCompany.id : 0,
      location_id: this.$route.params.location,
      zone_id: this.$route.params.zone,
      to: new Date().getTime(),
      from: new Date().getTime() - 60 * 60 * 24 * 1000
    })
  },
  methods: {
    ...mapActions({
      initAcsDashboard: 'machines/initAcsDashboard',
      getLocations: 'locations/getLocations',
      getZones: 'zones/getZones',
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
