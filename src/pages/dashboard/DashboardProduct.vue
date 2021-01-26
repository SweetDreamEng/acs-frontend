<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-sheet v-if="$route.name !== 'product-details'" color="surface2" class="my-n8 py-8">
      <v-container class="pb-0" fluid>
        <div v-if="$route.name === 'product-acs-dashboard'" class="d-flex mt-2 align-center">
          <v-breadcrumbs :items="acsBreadcrumbItems"></v-breadcrumbs>
          <v-spacer></v-spacer>
          <company-menu
            :companies="companies"
          >
          </company-menu>
        </div>
        <v-breadcrumbs v-else :items="breadcrumbItems"></v-breadcrumbs>
      </v-container>
    </v-sheet>
    <v-container fluid>
      <v-tabs v-if="deviceConfiguration.tcu_added" v-model="tabModel">
        <v-tab>{{ deviceConfiguration.name }}</v-tab>
        <v-tab>TruetempTcu</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabModel">
        <v-tab-item>
          <v-row class="flex-grow-0" dense>
            <v-col cols="12">
              <div>
                <v-combobox
                  v-model="selectedParameters"
                  :items="parameters.filter((item) => item.machine_id === parseInt($route.params.configurationId))"
                  solo
                  label="Add/Remove parameters"
                  multiple
                  item-text="name"
                  item-value="id"
                  class="flex-grow-0 ml-auto"
                  @input="onEnabledPropertiesChanged(false)"
                >
                  <template v-slot:selection="{ attrs, item }">
                    <v-chip
                      v-bind="attrs"
                      close
                      small
                      @click:close="remove(item, false)"
                    >
                      {{ item.name }}
                    </v-chip>
                  </template>
                </v-combobox>
              </div>
              <component 
                :is="analyticsComponent(parseInt($route.params.configurationId))" 
                :product-id="$route.params.productId"
                :parameters="selectedParameters.map((item) => item.id)"
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
                :enabled-properties="enabledProperties"
              >
              </product-parameters-chart>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <v-row class="flex-grow-0" dense>
            <v-col cols="12">
              <v-combobox
                v-model="selectedParametersForTcu"
                :items="parameters.filter((item) => item.machine_id === 11)"
                solo
                label="Add/Remove parameters"
                multiple
                item-text="name"
                item-value="id"
                class="flex-grow-0 ml-auto"
                @input="onEnabledPropertiesChanged(true)"
              >
                <template v-slot:selection="{ attrs, item }">
                  <v-chip
                    v-bind="attrs"
                    close
                    small
                    @click:close="remove(item, true)"
                  >
                    {{ item.name }}
                  </v-chip>
                </template>
              </v-combobox>
              <component
                :is="analyticsComponent(11)" 
                :product-id="$route.params.productId"
                :is-additional="true"
                :parameters="selectedParametersForTcu.map((item) => item.id)"
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
                :device-configuration="deviceConfiguration"
                :enabled-properties="enabledProperties"
              >
              </product-parameters-chart>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
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
import VtcPlusConveyingSystem from '../../components/dashboard/product/product-analytics/vtc-plus-conveying-system/VtcPlusConveyingAnalytics'
import NgxDryer from '../../components/dashboard/product/product-analytics/ngx-dryer/NgxDryer'
import NgxNomadDryer from '../../components/dashboard/product/product-analytics/ngx-nomad-dryer'
import T50CentralGranulator from '../../components/dashboard/product/product-analytics/t50-central-granulator'
import GpPortableChiller from '../../components/dashboard/product/product-analytics/gp-portable-chiller/PortableChillerAnalytics'
import TruetempTcu from '../../components/dashboard/product/product-analytics/truetemp-tcu/TruetempTcuAnalytics.vue'

import CompanyMenu from '../../components/dashboard/CompanyMenu'

export default {
  components: {
    CompanyMenu,
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
      tabModel: 0,
      parameters: [
        { id: 1, machine_id: 1, name: 'Capacity Utilization' },
        { id: 2, machine_id: 1, name: 'Energy Consumption' },
        { id: 3, machine_id: 1, name: 'Weight' },
        { id: 4, machine_id: 1, name: 'Recipe' },
        { id: 5, machine_id: 1, name: 'Inventories' },

        { id: 1, machine_id: 2, name: 'Capacity Utilization' },
        { id: 2, machine_id: 2, name: 'Energy Consumption' },
        { id: 3, machine_id: 2, name: 'System States' },
        { id: 4, machine_id: 2, name: 'Feeder Stable' },
        { id: 5, machine_id: 2, name: 'Process Rate' },
        { id: 6, machine_id: 2, name: 'Recipe' },

        { id: 1, machine_id: 11, name: 'System States' },
        { id: 2, machine_id: 11, name: 'TCU Temperature' }
      ],
      selectedParameters: [],
      selectedParametersForTcu: []
    }
  },
  computed: {
    ...mapState({
      loadingAlarmsTable: (state) => state.alarms.loadingAlarmsTable,
      deviceConfiguration: (state) => state.devices.deviceConfiguration,
      alarmTypes: (state) => state.alarms.alarmTypes,
      alarms: (state) => state.alarms.alarms,
      isLoading: (state) => state.machines.isNoteAdding,
      notes: (state) => state.notes.data,

      enabledProperties: (state) => state.machines.enabledProperties,

      companies: (state) => state.customers.companies,
      selectedCompanyName: (state) => state.machines.selectedCompany ? state.machines.selectedCompany.name : ''
    }),
    ...mapGetters({
      locationName: 'locations/locationName',
      zoneName: 'zones/zoneName',
      canViewCompanies: 'auth/canViewCompanies'
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
          text: this.deviceConfiguration.device_name,
          disabled: true
        }
      ]
    },
    acsBreadcrumbItems() {
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
          text: this.deviceConfiguration.device_name,
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

  mounted() {
    this.getEnabledProperties().then(() => {
      this.selectedParameters = this.parameters.filter((parameter) => {
        const machineProperty = this.enabledProperties.find((property) => property.machine_id === parseInt(this.$route.params.configurationId))
        const machinePropertyIds = machineProperty ? JSON.parse(machineProperty.property_ids) : []

        return parameter.machine_id === parseInt(this.$route.params.configurationId) && machinePropertyIds.includes(parameter.id)
      })

      if (!this.selectedParameters.length) {
        this.selectedParameters = this.parameters.filter((item) => item.machine_id === parseInt(this.$route.params.configurationId))
      }

      this.selectedParametersForTcu = this.parameters.filter((parameter) => {
        const machineProperty = this.enabledProperties.find((property) => property.machine_id === 11)
        const machinePropertyIds = machineProperty ? JSON.parse(machineProperty.property_ids) : []

        return parameter.machine_id === 11 && machinePropertyIds.includes(parameter.id)
      })

      if (!this.selectedParametersForTcu.length) {
        this.selectedParametersForTcu = this.parameters.filter((item) => item.machine_id === 11)
      }
    })

    if (this.canViewCompanies)
      this.initAcsDashboard()
    this.getDeviceConfiguration(this.$route.params.productId)
    this.getLocations()
    this.getZones()
    this.getProductAlarms(this.$route.params.productId)
    this.getNotes(this.$route.params.productId)

    this.$channel.bind('alarm.created', (data) => {
      if (parseInt(this.$route.params.productId) === data.deviceId) {
        this.onNewAlarms(data)
      }
    })
  },

  methods: {
    ...mapActions({
      getDeviceConfiguration: 'devices/getDeviceConfiguration',
      initAcsDashboard: 'machines/initAcsDashboard',
      getLocations: 'locations/getLocations',
      getZones: 'zones/getZones',
      onAlarmParamChanged: 'alarms/onAlarmParamChanged',
      getProductAlarms: 'alarms/getProductAlarms',
      onNewAlarms: 'alarms/onNewAlarms',
      getNotes: 'notes/getNotes',
      getEnabledProperties: 'machines/getEnabledProperties',
      updateEnabledProperties: 'machines/updateEnabledProperties'
    }),
    analyticsComponent(configurationId) {
      switch (configurationId) {
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
    },
    remove (item, isAdditional) {
      this.selectedParameters.splice(this.selectedParameters.indexOf(item), 1)
      this.onEnabledPropertiesChanged(isAdditional)
    },
    onEnabledPropertiesChanged(isAdditional) {
      if (!isAdditional) {
        this.updateEnabledProperties({ id: this.$route.params.configurationId, isImportant: true, enabledProperties: this.selectedParameters.map((item) => item.id) })
      } else {
        this.updateEnabledProperties({ id: 11, isImportant: true, enabledProperties: this.selectedParametersForTcu.map((item) => item.id) })
      }

    }
  }
}
</script>
