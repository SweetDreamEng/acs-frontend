<template>
  <div class="d-flex flex-grow-1 flex-column">

    <!-- loading spinner -->
    <div v-if="isLoading1 || !selectedMachine" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else>
      <div class="display-1">{{ selectedMachine.machinename }}</div>
      <v-row class="flex-grow-0" dense>
        <v-col cols="12">
          <alarm-table
            label="Alarms"
            :loading="isLoading1"            
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
          <note-form></note-form>
        </v-col>
        <v-col xs="12" sm="12" md="7">
          <notes-timeline
            :machine="selectedMachine"
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
import { mapGetters, mapActions } from 'vuex'

import AlarmTable from '../../components/dashboard/product/AlarmTable'
import ProductParametersChart from '../../components/dashboard/product/ProductParametersChart'
import NotesTimeline from '../../components/dashboard/NotesTimeline'
import NoteForm from '../../components/dashboard/NoteForm'

export default {
  components: {
    ProductParametersChart, NotesTimeline, NoteForm, AlarmTable
  },
  props: {
  },
  data() {
    return {
      loadingInterval: null,
      isLoading1: false,

      parameterIds: [],

      showChecks: false
    }
  },
  created () {
  },
  mounted() {
    let count = 0

    this.selectMachine(this.$route.params.id)

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 400)
  },
  beforeDestroy() {
    this.clear()
  },
  computed: {
    ...mapGetters('machines', [
      'selectedMachine'
    ])
  },
  methods: {
    ...mapActions({
      'selectMachine': 'machines/selectMachine',
      'updateSelections': 'machines/updateSelections'
    }),
    clear() {
      clearInterval(this.loadingInterval)
    },
    onMachineUpdate() {
      this.updateSelections(this.selections)
      this.dialog = false
    }
  }
}
</script>
