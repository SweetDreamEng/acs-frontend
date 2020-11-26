<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="8" xs="12">
        <hours-per-year></hours-per-year>
      </v-col>
      <v-col md="2" sm="4" xs="12">
        <availability></availability>
        <utilization class="mt-1"></utilization>
      </v-col>
      <v-col md="6" sm="12" xs="12">
        <utilization-and-availability
          :mode="modeTgtActWeight"
          :valuesTgtWeight="valuesTgtWeight"
          :valuesActWeight="valuesActWeight"
          :isLoading="isWeightProductLoading"
          @changeMode="_onProductTgtActModeChange"
        >
        </utilization-and-availability>
        <!-- <status-summary class="mt-1"></status-summary> -->
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="4" sm="8" xs="12">
        <AverageUtilization />
      </v-col>
      <v-col md="2" sm="4" xs="12">
        <Cutting />
      </v-col>
      <v-col md="6" sm="12" xs="12">
        <OEE />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import HoursPerYear from './HoursPerYear'
import Availability from './Availability'
import Utilization from './Utilization'
// import StatusSummary from './StatusSummary'
import UtilizationAndAvailability from './UtilizationAndAvailability'
import AverageUtilization from './AverageUtilization'
import Cutting from './Cutting'
import OEE from './OEE'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    HoursPerYear, Availability, Utilization, UtilizationAndAvailability, AverageUtilization, Cutting, OEE
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      modeTgtActWeight: (state) => state.machines.modeTgtActWeightProduct,
      valuesTgtWeight: (state) => state.machines.valuesTgtWeightProduct,
      valuesActWeight: (state) => state.machines.valuesActWeightProduct,
      isWeightProductLoading: (state) => state.machines.isWeightProductLoading
    })
  },
  mounted() {
    this.initProductAnalytics()
  },
  methods: {
    ...mapActions({
      initProductAnalytics: 'machines/initProductAnalytics',
      onProductTgtActModeChange: 'machines/onProductTgtActModeChange'
    }),
    _onProductTgtActModeChange(mode) {
      this.onProductTgtActModeChange(mode)
    }
  }
}
</script>