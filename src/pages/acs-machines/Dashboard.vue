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
      <locations-table></locations-table>

      <br>

      <machines-table-card
        label="Machines"
        :items="machines"
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
      privateColors: (state) => state.settings.private_colors,
      downtimeDistribution: (state) => state.machines.downtimeDistribution
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

    let count = 0

    this.setInitialSetting({}).then(() => {
      this.$vuetify.theme.themes.light.primary = this.privateColors[0]
      if (this.privateColors.length >= 2) {
        this.$vuetify.theme.themes.light.accent = this.privateColors[1]
        this.$vuetify.theme.themes.light.background = this.privateColors[2]
      }
    })

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
      initLocationsTable: 'machines/initLocationsTable',
      changeSelectedCompany: 'machines/changeSelectedCompany',
      setInitialSetting: 'settings/setInitialSetting'
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
