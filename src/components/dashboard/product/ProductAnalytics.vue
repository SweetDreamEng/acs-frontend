<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="4" xs="12">
        <overview></overview>
      </v-col>
      <v-col md="8" sm="8" xs="12">
        <utilization></utilization>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="4" sm="8" xs="12">
        <energy-consumption></energy-consumption>
      </v-col>
      <v-col md="2" sm="4" xs="12">
        <availability></availability>
        <hours-per-year class="mt-1"></hours-per-year>
      </v-col>
      <v-col md="6" sm="12" xs="12">
        <actual-target-weight
          :mode="modeWeight"
          :param="paramWeight"
          :valuesTgtWeight="valuesTgtWeight"
          :valuesActWeight="valuesActWeight"
          :isLoading="isWeightProductLoading"
          @changeParams="_onProductWeightParamChange"
        >
        </actual-target-weight>
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
import Overview from './Overview'
import HoursPerYear from './HoursPerYear'
import Availability from './Availability'
import Utilization from './Utilization'
// import StatusSummary from './StatusSummary'
import ActualTargetWeight from './ActualTargetWeight'
import AverageUtilization from './AverageUtilization'
import Cutting from './Cutting'
import OEE from './OEE'
import EnergyConsumption from './EnergyConsumption'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Overview, HoursPerYear, Availability, Utilization, ActualTargetWeight, AverageUtilization, Cutting, OEE, EnergyConsumption
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      modeWeight: (state) => state.machines.modeWeightProduct,
      paramWeight: (state) => state.machines.paramWeightProduct,
      valuesTgtWeight: (state) => state.machines.valuesTgtWeightProduct,
      valuesActWeight: (state) => state.machines.valuesActWeightProduct,
      isWeightProductLoading: (state) => state.machines.isWeightProductLoading
    })
  },
  mounted() {
    this.initProductAnalytics({
      mode: this.modeWeight,
      param: this.paramWeight
    })
  },
  methods: {
    ...mapActions({
      initProductAnalytics: 'machines/initProductAnalytics',
      onProductWeightParamChange: 'machines/onProductWeightParamChange'
    }),
    _onProductWeightParamChange(data) {
      this.onProductWeightParamChange(data)
    }
  }
}
</script>