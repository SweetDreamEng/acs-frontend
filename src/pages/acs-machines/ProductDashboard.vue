<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet color="surface2" class="my-n8 py-8">
      <v-container class="pb-0" fluid>
        <div class="d-flex mt-2 align-center">
          <v-breadcrumbs :items="breadcrumbItems"></v-breadcrumbs>
          <v-spacer></v-spacer>
          <company-menu
            :companies="companies"
            @companyChanged="onCompanyChanged"
          >
          </company-menu>
        </div>
      </v-container>
    </v-sheet>

    <v-container fluid>
      <v-row class="flex-grow-0" dense>
        <v-col cols="12">
          <div v-if="loadingAnalytics" class="d-flex flex-grow-1 align-center justify-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
          <template v-else>
            <product-analytics1 v-if="machine.machine_id === 1" :product-id="$route.params.productId"></product-analytics1>
            <product-analytics2 v-if="machine.machine_id === 2" :product-id="$route.params.productId"></product-analytics2>
            <product-analytics3 v-if="machine.machine_id === 3" :product-id="$route.params.productId"></product-analytics3>
            <product-analytics4 v-if="machine.machine_id === 4" :product-id="$route.params.productId"></product-analytics4>
            <product-analytics5 v-if="machine.machine_id === 5" :product-id="$route.params.productId"></product-analytics5>
            <product-analytics6 v-if="machine.machine_id === 6" :product-id="$route.params.productId"></product-analytics6>
            <product-analytics7 v-if="machine.machine_id === 7" :product-id="$route.params.productId"></product-analytics7>
            <product-analytics8 v-if="machine.machine_id === 8" :product-id="$route.params.productId"></product-analytics8>
            <product-analytics9 v-if="machine.machine_id === 9" :product-id="$route.params.productId"></product-analytics9>
          </template>
        </v-col>
        <v-col cols="12">
          <alarm-table
            label="Alarms"
            :alarms="alarms"
            :alarm-types="alarmTypes"
            @change="_onAlarmParamChange"
          >
          </alarm-table>
        </v-col>
        <v-col cols="12">
          <div class="display-1">Parameters & Points</div>
        </v-col>
        <v-col cols="12">
          <product-parameters-chart
            :machine="selectedMachine"
          >
          </product-parameters-chart>
        </v-col>
      </v-row>

      <!-- Note form and timeline -->
      <v-row>
        <v-col xs="12" sm="12" md="5">
          <note-form
            :device-id="parseInt($route.params.productId)"
          >
          </note-form>
        </v-col>
        <v-col xs="12" sm="12" md="7">
          <notes-timeline
            :notes="notes"
          >
          </notes-timeline>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Product Page Component
| url: dashboard/product/:id
|---------------------------------------------------------------------
|
| Product detail page
*/

// import vuex helper functions
import { mapState, mapGetters, mapActions } from 'vuex'

import ProductAnalytics1 from '../../components/dashboard/product/product-analytics/ProductAnalytics1'
import ProductAnalytics2 from '../../components/dashboard/product/product-analytics/ProductAnalytics2'
import ProductAnalytics3 from '../../components/dashboard/product/product-analytics/ProductAnalytics3'
import ProductAnalytics4 from '../../components/dashboard/product/product-analytics/ProductAnalytics4'
import ProductAnalytics5 from '../../components/dashboard/product/product-analytics/ProductAnalytics5'
import ProductAnalytics6 from '../../components/dashboard/product/product-analytics/ProductAnalytics6'
import ProductAnalytics7 from '../../components/dashboard/product/product-analytics/ProductAnalytics7'
import ProductAnalytics8 from '../../components/dashboard/product/product-analytics/ProductAnalytics8'
import ProductAnalytics9 from '../../components/dashboard/product/product-analytics/ProductAnalytics9'
import AlarmTable from '../../components/dashboard/product/AlarmTable'
import ProductParametersChart from '../../components/dashboard/product/ProductParametersChart'
import NotesTimeline from '../../components/dashboard/NotesTimeline'
import NoteForm from '../../components/dashboard/NoteForm'
import CompanyMenu from '../../components/dashboard/CompanyMenu'

export default {
  components: {
    ProductParametersChart,
    NotesTimeline,
    NoteForm,
    AlarmTable,
    ProductAnalytics1, ProductAnalytics2, ProductAnalytics3, ProductAnalytics4, ProductAnalytics5, ProductAnalytics6, ProductAnalytics7, ProductAnalytics8, ProductAnalytics9,
    CompanyMenu
  },
  props: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      machine: (state) => state.machines.machine,
      companies: (state) => state.customers.companies,
      alarmTypes: (state) => state.alarms.alarmTypes,
      alarms: (state) => state.alarms.alarms,
      isLoading: (state) => state.machines.isNoteAdding,
      notes: (state) => state.machines.notes,
      selectedCompanyName: (state) => state.machines.selectedCompany ? state.machines.selectedCompany.name : '',

      loadingAnalytics: (state) => state.machines.loadingOverview
    }),
    ...mapGetters('machines', [
      'selectedMachine'
    ]),
    ...mapGetters({
      zoneName: 'zones/zoneName',
      locationName: 'locations/locationName'
    }),
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
          disabled: false,
          exact: true,
          to: `/acs-machines/${this.$route.params.location}/${this.$route.params.zone}`
        }, {
          text: this.machine.customer_assigned_name,
          disabled: true
        }
      ]
    }
  },
  
  created() {
    this.getLocations()
    this.getZones()
    this.getCompanies()
    this.getOverview(this.$route.params.productId)
    this.getWeeklyRunningHours(this.$route.params.productId)
    this.getUtilization(this.$route.params.productId)
    this.getEnergyConsumption(this.$route.params.productId)
    this.getInventory(this.$route.params.productId)
    this.getRecipe(this.$route.params.productId)
    this.getWeight(this.$route.params.productId)
    this.getProductAlarms(this.$route.params.productId)
  },

  mounted() {
    this.selectMachine(this.$route.params.productId)
  },

  methods: {
    ...mapActions({
      getLocations: 'locations/getLocations',
      getZones: 'zones/getZones',
      getCompanies: 'customers/getCompanies',
      getOverview: 'machines/getOverview',
      getUtilization: 'machines/getUtilization',
      getEnergyConsumption: 'machines/getEnergyConsumption',
      getInventory: 'machines/getInventory',
      getRecipe: 'machines/getRecipe',
      getWeight: 'machines/getWeight',
      getWeeklyRunningHours: 'machines/getWeeklyRunningHours',
      initProduct: 'machines/initProduct',
      'selectMachine': 'machines/selectMachine',
      onAlarmParamChanged: 'alarms/onAlarmParamChanged',
      changeSelectedCompany: 'machines/changeSelectedCompany',
      getProductAlarms: 'alarms/getProductAlarms'
    }),
    _onAlarmParamChange(params) {
      this.onAlarmParamChanged(params)
    },
    onCompanyChanged(company) {
      this.changeSelectedCompany(company)
    }
  }
}
</script>
