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
        :machine="machines"
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
      loadingInterval: null,

      isLoading1: true,

      series: [44, 55],

      ordersSeries: [{
        name: 'FPY',
        data: [
          ['2020-02-02', 34],
          ['2020-02-03', 43],
          ['2020-02-04', 40],
          ['2020-02-05', 43]
        ]
      }],

      customersSeries: [{
        name: 'Avg FPY',
        data: [
          ['2020-02-02', 13],
          ['2020-02-03', 11],
          ['2020-02-04', 13],
          ['2020-02-05', 12]
        ]
      }],

      tab: 0,
      locationDetailsView: false,

      page: 1,
      total: 9
    }
  },
  computed: {
    ...mapState({
      machines: (state) => state.machines.data,
      companies: (state) => state.customers.companies,
      selectedCompanyName: (state) => state.machines.selectedCompany ? state.machines.selectedCompany.name : ''
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
    
    let count = 0

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 400)
  },
  beforeDestroy() {
    this.clear()
  },
  methods: {
    ...mapActions({
      initAcsMachinesTable: 'machines/initAcsMachinesTable',
      changeSelectedCompany: 'machines/changeSelectedCompany',
      getLocations: 'locations/getLocations',
      getZones: 'zones/getZones'
    }),
    clear() {
      clearInterval(this.loadingInterval)
    },
    onCompanyChanged(company) {
      this.changeSelectedCompany(company)
    }
  }
}
</script>