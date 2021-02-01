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
      <div v-if="loadingDeviceConfig" class="d-flex flex-column flex-grow-1 align-center justify-center mt-6">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        Loading configuration...
      </div>
      <div v-else>
        <v-tabs v-if="deviceConfiguration.isTcuConnected" v-model="tabModel">
          <v-tab>{{ deviceConfiguration.plcMachineName }}</v-tab>
          <v-tab>{{ deviceConfiguration.tcuMachineName }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabModel">
          <v-tab-item>
            <v-row class="flex-grow-0" dense>
              <v-col cols="12">
                <product-analytics
                  :machine-id="deviceConfiguration.plcMachineId"
                  :serial-number="parseInt(deviceConfiguration.plcSerialNumber)"
                  :enabled-graphs="deviceConfiguration.plcEnabledAnalyticsGraphs"
                  :graphs="deviceConfiguration.plcAnalyticsGraphs"
                >
                </product-analytics>
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
                <product-parameters-chart
                  :machine-id="deviceConfiguration.plcMachineId"
                  :serial-number="parseInt(deviceConfiguration.plcSerialNumber)"
                  :enabled-graphs="deviceConfiguration.plcEnabledPropertiesGraphs"
                  :graphs="deviceConfiguration.plcPropertiesGraphs"
                >
                </product-parameters-chart>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row class="flex-grow-0" dense>
              <v-col cols="12">
                <product-analytics
                  :machine-id="11"
                  :serial-number="parseInt(deviceConfiguration.tcuSerialNumber)"
                  :enabled-graphs="deviceConfiguration.tcuEnabledAnalyticsGraphs"
                  :graphs="deviceConfiguration.tcuAnalyticsGraphs"
                >
                </product-analytics>
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
                  :machine-id="11"
                  :serial-number="parseInt(deviceConfiguration.tcuSerialNumber)"
                  :enabled-graphs="deviceConfiguration.tcuEnabledPropertiesGraphs"
                  :graphs="deviceConfiguration.tcuPropertiesGraphs"
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
      </div>
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
import ProductAnalytics from '../../components/dashboard/product/ProductAnalytics'
import NotesTimeline from '../../components/dashboard/NotesTimeline'
import NoteForm from '../../components/dashboard/NoteForm'
import CompanyMenu from '../../components/dashboard/CompanyMenu'

export default {
  components: {
    CompanyMenu,
    ProductParametersChart,
    ProductAnalytics,
    NotesTimeline,
    NoteForm,
    AlarmTable
  },
  props: {
  },
  data() {
    return {
      tabModel: 0,
      selectedParameters: [],
      selectedParametersForTcu: []
    }
  },
  computed: {
    ...mapState({
      loadingAlarmsTable: (state) => state.alarms.loadingAlarmsTable,
      loadingDeviceConfig: (state) => state.devices.loadingDeviceConfig,
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
          text: this.deviceConfiguration.plcMachineName,
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
          text: this.deviceConfiguration.plcMachineName,
          disabled: true
        }
      ]
    }
  },

  mounted() {
    this.getDeviceConfiguration(this.$route.params.productId)
    if (this.canViewCompanies)
      this.initAcsDashboard()
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
