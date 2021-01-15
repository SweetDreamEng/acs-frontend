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
          <component 
            :is="analyticsComponent($route.params.configurationId)" 
            :product-id="$route.params.productId"
          >
          </component>
        </v-col>
        <v-col cols="12">
          <alarm-table
            :loading="loadingAlarmsTable"
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
            :tags="productTags"
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
import BdBatchBlender from '../../components/dashboard/product/product-analytics/bd-batch-blender/BDBatchAnalytics'
import AccumeterOvationContinuousBlender from '../../components/dashboard/product/product-analytics/accumeter-ovation-continuous-blender/AccumeterOvationBlenderAnalytics'
import GhGravimetricExtrusionControlHopper from '../../components/dashboard/product/product-analytics/gh-gravimetric-extrusion-control-hopper/GhGravimetricAnalytics'
import GhFGravimetricAdditiveFeeder from '../../components/dashboard/product/product-analytics/gh-f-gravimetric-additive-feeder'
import VtcPlusConveyingSystem from '../../components/dashboard/product/product-analytics/vtc-plus-conveying-system/VtcPlusConveying'
import NgxDryer from '../../components/dashboard/product/product-analytics/ngx-dryer/NgxDryer'
import NgxNomadDryer from '../../components/dashboard/product/product-analytics/ngx-nomad-dryer'
import T50CentralGranulator from '../../components/dashboard/product/product-analytics/t50-central-granulator'
import GpPortableChiller from '../../components/dashboard/product/product-analytics/gp-portable-chiller'
import TruetempTcu from '../../components/dashboard/product/product-analytics/truetemp-tcu/TruetempTcuAnalytics.vue'

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
    T50CentralGranulator,
    TruetempTcu
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
      alarmTypes: (state) => state.alarms.alarmTypes,
      alarms: (state) => state.alarms.alarms,
      isLoading: (state) => state.machines.isNoteAdding,
      notes: (state) => state.notes.data,

      loadingAlarmsTable: (state) => state.alarms.loadingAlarmsTable
    }),
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
    },
    productTags() {
      switch (parseInt(this.$route.params.configurationId)) {
      case 1:
        return ['batch size', 'batch counter', 'blender capability', 'process rate', 'feeder calibration factor', 'load cell A zero bits', 'load cell A cal bits', 'load cell B zero bits', 'load cell B cal bits', 'weight hopper tare', 'hopper stable', 'station conveying']
      case 2:
        return ['manual mode engaged', 'current target rate', 'feeder speed', 'accumulated hop inventory', 'feeder calibration value', 'blender capability']
      case 3:
        return ['extruder rpm setpoint', 'extruder rpm actual', 'extruder target throughput', 'extruder actual throughput', 'extruder wtp/rpm value', 'hauloff setpoint', 'hauloff actual', 'layflat setting', 'hopper dumping']
      case 4:
        return ['feeder rpm setpoint', 'tracking extruder rpm', 'tracking extruder max rpm', 'feeder target throughput', 'feeder actual throughput', 'feeder wtp/rpm value', 'hopper dumping']
      case 5:
        return ['system online', 'station online', 'pumps online', 'station conveying', 'pump blowback engaged', 'pump hours between oil changes']
      case 6:
        return ['switch on DP setpoint', 'regen exhaust air temperature', 'bed-break set point', 'cool break set point', 'left bed in regen', 'left bed regen heating', 'left bed regen cooling', 'Notification word', 'dryer online', 'dryer sequenced shutdown', 'dirty filter bit', 'DH1 Online Hrs - Maint', 'DH1 Online Hrs - Total', 'DH2 Online Hrs - Maint', 'DH2 Online Hrs - Total', 'DH3 Online Hrs - Maint', 'DH3 Online Hrs - Total', 'Filter Hrs', 'Regen valve cycles', 'Right Bed Regen Cycles - Total', 'Left Bed Regen Cycles - Total', 'Dryer Online Hrs - Maint', 'Dryer Online Hrs - Total', 'Process Blower Run Hrs - Maint', 'Process Blower Run Hrs - Total', 'Process valve cycles - Total', 'Power On Hrs', 'Left Regen Heater hours - Maint', 'Left Regen Heater hours – Total', 'Right Regen Heater hours', 'Right Regen Heater hours']
      case 7:
        return ['bed-break set point', 'cool break set point', 'left bed in regen', 'left bed regen heating', 'left bed regen cooling', 'right bed in regen', 'right bed regen heating', 'right bed regen cooling', 'Notification word', 'dryer sequenced shutdown', 'dirty filter bit', 'Filter Hrs – Maint', 'Left Bed Regen Cycles', 'Dryer Online Hrs – Maint', 'Dryer Online Hrs – Total', 'Process Blower Run Hrs - Maint', 'Process Blower Run Hrs – Total', 'Process valve cycles – Total', 'Power On Hrs – Total', 'Left Regen Heater hours - Maint', 'Left Regen Heater hours – Total', 'Right Regen Heater hours - Maint', 'Right Regen Heater hours – Total', 'Regen valve cycles – Total', 'Right Bed Regen Cycles – Total']
      default:
        return []
      }
    }
  },
  
  created() {
    this.getLocations()
    this.getZones()
    this.getProductAlarms(this.$route.params.productId)
    this.getNotes(this.$route.params.productId)
  },

  mounted() {
    this.$channel.bind('alarm.created', (data) => {
      if (parseInt(this.$route.params.productId) === data.deviceId) {
        this.onNewAlarms(data)
      }
    })
  },

  methods: {
    ...mapActions({
      getLocations: 'locations/getLocations',
      getZones: 'zones/getZones',
      onAlarmParamChanged: 'alarms/onAlarmParamChanged',
      getProductAlarms: 'alarms/getProductAlarms',
      onNewAlarms: 'alarms/onNewAlarms',
      getNotes: 'notes/getNotes'
    }),
    analyticsComponent() {
      const configId = parseInt(this.$route.params.configurationId)

      switch (configId) {
      case 1: return 'BdBatchBlender'
      case 2: return 'AccumeterOvationContinuousBlender'
      case 3: return 'GhGravimetricExtrusionControlHopper'
      case 4: return 'GhFGravimetricAdditiveFeeder'
      case 5: return 'VtcPlusConveyingSystem'
      case 6: return 'NgxDryer'
      case 7: return 'NgxNomadDryer'
      case 8: return 'T50CentralGranulator'
      case 9: return 'GpPortableChiller'
      case 11: return 'TruetempTcu'
      default: return ''
      }
    },
    _onAlarmParamChange(params) {
      this.onAlarmParamChanged(params)
    }
  }
}
</script>
