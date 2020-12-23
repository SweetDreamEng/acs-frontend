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
          <bd-batch-blender v-if="parseInt($route.params.configurationId) === 1" :product-id="$route.params.productId"></bd-batch-blender>
          <accumeter-ovation-continuous-blender v-if="parseInt($route.params.configurationId) === 2" :product-id="$route.params.productId"></accumeter-ovation-continuous-blender>
          <gh-gravimetric-extrusion-control-hopper v-if="parseInt($route.params.configurationId) === 3" :product-id="$route.params.productId"></gh-gravimetric-extrusion-control-hopper>
          <gh-f-gravimetric-additive-feeder v-if="parseInt($route.params.configurationId) === 4" :product-id="$route.params.productId"></gh-f-gravimetric-additive-feeder>
          <vtc-plus-conveying-system v-if="parseInt($route.params.configurationId) === 5" :product-id="$route.params.productId"></vtc-plus-conveying-system>
          <ngx-dryer v-if="parseInt($route.params.configurationId) === 6" :product-id="$route.params.productId"></ngx-dryer>
          <ngx-nomad-dryer v-if="parseInt($route.params.configurationId) === 7" :product-id="$route.params.productId"></ngx-nomad-dryer>
          <t-50-central-granulator v-if="parseInt($route.params.configurationId) === 8" :product-id="$route.params.productId"></t-50-central-granulator>
          <gp-portable-chiller v-if="parseInt($route.params.configurationId) === 9" :product-id="$route.params.productId"></gp-portable-chiller>
        </v-col>
        <v-col cols="12">
          <alarm-table
            label="Alarms"
            :loading="isLoading1"
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
            :loading="isLoading1"
          >
          </product-parameters-chart>
        </v-col>
      </v-row>

      <!-- Note form and timeline -->
      <v-row>
        <v-col cols="12" md="5">
          <note-form
            :device-id="parseInt($route.params.productId)"
          >
          </note-form>
        </v-col>
        <v-col cols="12" md="7">
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

import AlarmTable from '../../components/dashboard/product/AlarmTable'
import ProductParametersChart from '../../components/dashboard/product/ProductParametersChart'
import NotesTimeline from '../../components/dashboard/NotesTimeline'
import NoteForm from '../../components/dashboard/NoteForm'
import BdBatchBlender from '../../components/dashboard/product/product-analytics/bd-batch-blender'
import AccumeterOvationContinuousBlender from '../../components/dashboard/product/product-analytics/accumeter-ovation-continuous-blender'
import GhGravimetricExtrusionControlHopper from '../../components/dashboard/product/product-analytics/gh-gravimetric-extrusion-control-hopper'
import GhFGravimetricAdditiveFeeder from '../../components/dashboard/product/product-analytics/gh-f-gravimetric-additive-feeder'
import VtcPlusConveyingSystem from '../../components/dashboard/product/product-analytics/vtc-plus-conveying-system'
import NgxDryer from '../../components/dashboard/product/product-analytics/ngx-dryer'
import NgxNomadDryer from '../../components/dashboard/product/product-analytics/ngx-nomad-dryer'
import T50CentralGranulator from '../../components/dashboard/product/product-analytics/t50-central-granulator'
import GpPortableChiller from '../../components/dashboard/product/product-analytics/gp-portable-chiller'

export default {
  components: {
    ProductParametersChart,
    NotesTimeline,
    NoteForm,
    AlarmTable,
    BdBatchBlender,
    AccumeterOvationContinuousBlender,
    GhGravimetricExtrusionControlHopper,
    GhFGravimetricAdditiveFeeder,
    VtcPlusConveyingSystem,
    NgxDryer,
    NgxNomadDryer,
    GpPortableChiller,
    T50CentralGranulator
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
    this.getLocations()
    this.getZones()
    this.getOverview(this.$route.params.productId)
    this.getUtilization(this.$route.params.productId)
    this.getEnergyConsumption(this.$route.params.productId)
    this.getProductAlarms(this.$route.params.productId)

    this.getNotes(this.$route.params.productId)
  },

  mounted() {

    this.$channel.bind('alarm.created', (data) => {
      console.log(data)
    })
  },

  methods: {
    ...mapActions({
      getLocations: 'locations/getLocations',
      getZones: 'zones/getZones',
      getOverview: 'machines/getOverview',
      getUtilization: 'machines/getUtilization',
      getEnergyConsumption: 'machines/getEnergyConsumption',
      onAlarmParamChanged: 'alarms/onAlarmParamChanged',
      getProductAlarms: 'alarms/getProductAlarms',
      getNotes: 'notes/getNotes'
    }),
    _onAlarmParamChange(params) {
      this.onAlarmParamChanged(params)
    }
  }
}
</script>
