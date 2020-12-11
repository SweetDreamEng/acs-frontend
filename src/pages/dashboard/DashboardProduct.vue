<template>
  <div class="d-flex flex-grow-1 flex-column">

    <!-- loading spinner -->
    <div v-if="isLoading1 || !selectedMachine" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else>
      <v-row class="flex-grow-0" dense>
        <v-col cols="12">
          <product-analytics1
            v-if="$route.params.id == 1"
          >
          </product-analytics1>
          <product-analytics2
            v-if="$route.params.id == 2"
          >
          </product-analytics2>
          <product-analytics3
            v-if="$route.params.id == 3"
          >
          </product-analytics3>
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
    </div>
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
import AlarmTable from '../../components/dashboard/product/AlarmTable'
import ProductParametersChart from '../../components/dashboard/product/ProductParametersChart'
import NotesTimeline from '../../components/dashboard/NotesTimeline'
import NoteForm from '../../components/dashboard/NoteForm'

export default {
  components: {
    ProductParametersChart, NotesTimeline, NoteForm, AlarmTable, ProductAnalytics1, ProductAnalytics2, ProductAnalytics3
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
      notes: (state) => state.machines.notes
    }),
    ...mapGetters('machines', [
      'selectedMachine'
    ])
  },
  
  created() {
    this.getOverview(this.$route.params.id)
    this.getWeeklyRunningHours(this.$route.params.id)
    this.getUtilization(this.$route.params.id)
    this.getEnergyConsumption(this.$route.params.id)
  },

  mounted() {
    this.selectMachine(this.$route.params.id)
    this.initProduct(this.$route.params.id)
  },

  beforeDestroy() {
    this.clear()
  },

  methods: {
    ...mapActions({
      getOverview: 'machines/getOverview',
      getUtilization: 'machines/getUtilization',
      getEnergyConsumption: 'machines/getEnergyConsumption',
      getWeeklyRunningHours: 'machines/getWeeklyRunningHours',
      initProduct: 'machines/initProduct',
      'selectMachine': 'machines/selectMachine',
      'updateSelections': 'machines/updateSelections',
      onAlarmParamChanged: 'alarms/onAlarmParamChanged'
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
