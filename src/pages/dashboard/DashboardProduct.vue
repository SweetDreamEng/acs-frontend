<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet v-if="$route.name !== 'product-details'" color="surface2" class="my-n8 py-8">
      <v-container class="pb-0" fluid>
        <v-breadcrumbs :items="breadcrumbItems"></v-breadcrumbs>
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
import AlarmTable from '../../components/dashboard/product/AlarmTable'
import ProductParametersChart from '../../components/dashboard/product/ProductParametersChart'
import NotesTimeline from '../../components/dashboard/NotesTimeline'
import NoteForm from '../../components/dashboard/NoteForm'

export default {
  components: {
    ProductParametersChart,
    NotesTimeline,
    NoteForm,
    AlarmTable,
    ProductAnalytics1, ProductAnalytics2
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
      alarmTypes: (state) => state.alarms.alarmTypes,
      alarms: (state) => state.alarms.alarms,
      isLoading: (state) => state.machines.isNoteAdding,
      notes: (state) => state.notes.data,

      loadingAnalytics: (state) => state.machines.loadingOverview
    }),
    ...mapGetters('machines', [
      'selectedMachine'
    ]),
    ...mapGetters({
      locationName: 'locations/locationName',
      zoneName: 'zones/zoneName'
    }),
    breadcrumbItems() {
      return [
        {
          text: 'Dashboard',
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
          disabled: false,
          exact: true,
          to: `/dashboard/analytics/${this.$route.params.location}/${this.$route.params.zone}`
        }, {
          text: this.machine.customer_assigned_name,
          disabled: true
        }
      ]
    }
  },
  
  created() {
    this.getOverview(this.$route.params.productId)
    this.getWeeklyRunningHours(this.$route.params.productId)
    this.getUtilization(this.$route.params.productId)
    this.getEnergyConsumption(this.$route.params.productId)
    this.getInventory(this.$route.params.productId)
    this.getRecipe(this.$route.params.productId)
    this.getWeight(this.$route.params.productId)

    // Accumeter Ovation Continuous Blender
    this.getRecipe2(this.$route.params.productId)

    this.getNotes(this.$route.params.productId)
  },

  mounted() {
    this.getLocations()
    this.getZones()
    this.selectMachine(this.$route.params.id)
  },

  beforeDestroy() {
    this.clear()
  },

  methods: {
    ...mapActions({
      getLocations: 'locations/getLocations',
      getZones: 'zones/getZones',
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

      getRecipe2: 'machines/getRecipe2',

      getNotes: 'notes/getNotes'
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
    }
  }
}
</script>
