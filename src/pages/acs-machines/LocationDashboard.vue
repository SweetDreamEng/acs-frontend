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
      <zones-table :zones="zones">
      </zones-table>

      <br>

      <machines-table-card
        style="min-height: 380px"
        label="Machines"
        :items="machinesForLocation"
        :loading="isLoading1"
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
      total: 9,

      markers: [{
        position: {
          lat: 25.44,
          lng: -80.47
        }
      }, {
        position: {
          lat: 40.66,
          lng: -73.94
        }
      }, {
        position: {
          lat: 31.89,
          lng: -97.08
        }
      }, {
        position: {
          lat: 37.9,
          lng: -122.08
        }
      }, {
        position: {
          lat: 31.99,
          lng: -83.31
        }
      }, {
        position: {
          lat: 39.42,
          lng: -74.49
        }
      }]
    }
  },
  computed: {
    ...mapState({
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
    this.initAcsZonesTable(this.$route.params.location)

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
      initAcsDashboard: 'machines/initAcsDashboard',
      initAcsZonesTable: 'machines/initAcsZonesTable',
      changeSelectedCompany: 'machines/changeSelectedCompany',
      getLocations: 'locations/getLocations'
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