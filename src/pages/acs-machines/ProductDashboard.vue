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
            <product-analytics1 :product-id="$route.params.productId"></product-analytics1>
            <product-analytics2 :product-id="$route.params.productId"></product-analytics2>
          </template>
        </v-col>
        <v-col cols="12">
          <alarm-table
            label="Alarms"
            :loading="isLoading1"
            :alarm-types="alarmTypes"
            :alarms="alarms"
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
            :loading="isLoading1"
          >
          </product-parameters-chart>
        </v-col>
      </v-row>

      <!-- Note form and timeline -->
      <v-row>
        <v-col xs="12" sm="12" md="5">
          <note-form
            :machine-id="parseInt($route.params.id)"
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
import AlarmTable from '../../components/dashboard/product/AlarmTable'
import ProductParametersChart from '../../components/dashboard/product/ProductParametersChart'
import NotesTimeline from '../../components/dashboard/NotesTimeline'
import NoteForm from '../../components/dashboard/NoteForm'
import CompanyMenu from '../../components/dashboard/CompanyMenu'

export default {
  components: {
    ProductParametersChart, NotesTimeline, NoteForm, AlarmTable, ProductAnalytics1, CompanyMenu
  },
  props: {
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: false
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
  },

  mounted() {
    this.selectMachine(this.$route.params.productId)
  },

  beforeDestroy() {
    this.clear()
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
      'updateSelections': 'machines/updateSelections',
      onAlarmParamChanged: 'alarms/onAlarmParamChanged',
      changeSelectedCompany: 'machines/changeSelectedCompany'
    }),
    clear() {
      clearInterval(this.loadingInterval)
    },
    onMachineUpdate() {
      this.updateSelections(this.selections)
      this.dialog = false
    },
    _onAlarmParamChange(params) {
      this.onAlarmParamChanged(params)
    },
    onCompanyChanged(company) {
      this.changeSelectedCompany(company)
    }
  }
}
</script>
