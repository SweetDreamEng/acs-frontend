<template>
  <div>
    <v-row dense>
      <v-col cols="12" sm="6" lg="4">
        <bed-states
          :loading="loadingBedStates"
          :states="bedStates"
        >
        </bed-states>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" md="6">
        <area-graph
          title="DH Online Hours"
          unit-string="h"
          :loading="loadingDHOnlineHours"
          :series="dhOnlineHoursSeries()"
          :time-range-label="timeRangeLabel(dhOnlineHoursTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('dh-online-hours')"
        >
        </area-graph>
      </v-col>
      <v-col cols="12" md="6">
        <area-graph
          title="Dryer Online Hours"
          unit-string="h"
          :loading="loadingDryerOnlineHours"
          :series="dryerOnlineHoursSeries()"
          :time-range-label="timeRangeLabel(dryerOnlineHoursTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('dryer-online-hours')"
        >
        </area-graph>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" md="6">
        <area-graph
          title="Blower Run Hours"
          unit-string="h"
          :loading="loadingBlowerRunHours"
          :series="blowerRunHoursSeries()"
          :time-range-label="timeRangeLabel(blowerRunHoursTimeRange)"
          @showTimeRange="onShowTimeRangeDlgOpen('blower-run-hours')"
        >
        </area-graph>
      </v-col>
    </v-row>
    <time-range-chooser
      :dlg="showTimeRangeChooser"
      :time-range="selectedTimeRange"
      @close="showTimeRangeChooser = false"
      @submit="_onTimeRangeChanged"
    >
    </time-range-chooser>
  </div>
</template>
<script>

import { mapState, mapGetters, mapActions } from 'vuex'

import AreaGraph from '../../common/AreaGraph'
import BedStates from './components/BedStates'
import TimeRangeChooser from '../../../TimeRangeChooser1'

export default {
  components: {
    AreaGraph,
    BedStates,
    TimeRangeChooser
  },
  props: {
    productId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showTimeRangeChooser: false
    }
  },
  computed: {
    ...mapState({
      loadingBedStates: (state) => state.ngxDryer.loadingBedStates,
      loadingDHOnlineHours: (state) => state.ngxDryer.loadingDHOnlineHours,
      loadingDryerOnlineHours: (state) => state.ngxDryer.loadingDryerOnlineHours,
      loadingBlowerRunHours: (state) => state.ngxDryer.loadingBlowerRunHours,

      bedStates: (state) => state.ngxDryer.bedStates,
      dhOnlineHours: (state) => state.ngxDryer.dhOnlineHours,
      dhOnlineHoursTimeRange: (state) => state.ngxDryer.dhOnlineHoursTimeRange,
      dryerOnlineHours: (state) => state.ngxDryer.dryerOnlineHours,
      dryerOnlineHoursTimeRange: (state) => state.ngxDryer.dryerOnlineHoursTimeRange,
      blowerRunHours: (state) => state.ngxDryer.blowerRunHours,
      blowerRunHoursTimeRange: (state) => state.ngxDryer.blowerRunHoursTimeRange,

      selectedTimeRange: (state) => state.ngxDryer.selectedTimeRange
    }),
    ...mapGetters({
      timeRangeLabel: 'bdBlenderAnalytics/timeRangeLabel'
    })
  },
  mounted() {
    this.getBedStates(this.productId)
    this.getDhOnlineHours(this.productId)
    this.getDryerOnlineHours(this.productId)
    this.getBlowerRunHours(this.productId)
  },
  methods: {
    ...mapActions({
      getBedStates: 'ngxDryer/getBedStates',
      getDhOnlineHours: 'ngxDryer/getDhOnlineHours',
      getDryerOnlineHours: 'ngxDryer/getDryerOnlineHours',
      getBlowerRunHours: 'ngxDryer/getBlowerRunHours',

      onTimeRangeChanged: 'ngxDryer/onTimeRangeChanged',
      selectTimeRange: 'ngxDryer/selectTimeRange'
    }),
    dhOnlineHoursSeries() {
      const items = ['DH1 Online Hrs - Maint', 'DH1 Online Hrs – Total', 'DH2 Online Hrs - Maint', 'DH2 Online Hrs – Total', 'DH3 Online Hrs - Maint', 'DH3 Online Hrs – Total']

      return items.map((item, i) => {
        return {
          name: item,
          data: this.dhOnlineHours[i]
        }
      })
    },
    dryerOnlineHoursSeries() {
      const items = ['Dryer Online Hrs – Maint', 'Dryer Online Hrs – Total']

      return items.map((item, i) => {
        return {
          name: item,
          data: this.dryerOnlineHours[i]
        }
      })
    },
    blowerRunHoursSeries() {
      const items = ['Process Blower Run Hrs - Maint', 'Process Blower Run Hrs – Total']

      return items.map((item, i) => {
        return {
          name: item,
          data: this.blowerRunHours[i]
        }
      })
    },
    onShowTimeRangeDlgOpen(key) {
      this.selectTimeRange(key)
      this.showTimeRangeChooser = true
    },
    _onTimeRangeChanged(data) {
      data.id = this.productId

      this.onTimeRangeChanged(data)
      this.showTimeRangeChooser = false
    }
  }
}
</script>