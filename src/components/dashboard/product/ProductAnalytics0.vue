<template>
  <div>
    <v-row dense>
      <v-col sm="4" xs="12">
        <overview
          :machine="machine"
        >
        </overview>
      </v-col>
      <v-col sm="8" xs="12">
        <utilization></utilization>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="6" sm="12">
        <OEE
          :mode="modeInventory"
          :param="paramInventory"
          :values-hop-inventory="valuesHopInventory"
          :values-frt-inventory="valuesFrtInventory"
          :is-loading="isInventoryProductLoading"
          @changeParams="_onProductInventoryParamChanged"
        >
        </OEE>
      </v-col>
      <v-col md="6" sm="12">
        <actual-target-weight
          :mode="modeWeight"
          :param="paramWeight"
          :values-tgt-weight="valuesTgtWeight"
          :values-act-weight="valuesActWeight"
          :is-loading="isWeightProductLoading"
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
      <v-col md="4" sm="8" xs="12">
        <energy-consumption></energy-consumption>
      </v-col>
      <v-col md="2" sm="4" xs="12">
        <availability :series="statusSeries"></availability>
      </v-col>
      <v-col md="2" sm="4" xs="12">
        <Cutting />
        <!-- <hours-per-year class="mt-1"></hours-per-year> -->
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Overview from './common/Overview'
import HoursPerYear from './HoursPerYear'
import Availability from './Availability'
import Utilization from './common/Utilization'
// import StatusSummary from './StatusSummary'
import ActualTargetWeight from './common/ActualTargetWeight'
import AverageUtilization from './AverageUtilization'
import Cutting from './Cutting'
import OEE from './common/OEE'
import EnergyConsumption from './common/EnergyConsumption'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Overview, Availability, Utilization, ActualTargetWeight, AverageUtilization, Cutting, OEE, EnergyConsumption
  },
  data() {
    return {
      statusSeries: [{
        name: 'Status',
        data: [
          ['2020-02-02', 13],
          ['2020-02-03', 16],
          ['2020-02-04', 9],
          ['2020-02-05', 12]
        ]
      }]
    }
  },
  computed: {
    ...mapState({
      machine: (state) => state.machines.machine,

      modeWeight: (state) => state.machines.modeWeightProduct,
      modeInventory: (state) => state.machines.modeInventory,

      paramWeight: (state) => state.machines.paramWeightProduct,
      paramInventory: (state) => state.machines.paramInventory,

      valuesTgtWeight: (state) => state.machines.valuesTgtWeightProduct,
      valuesActWeight: (state) => state.machines.valuesActWeightProduct,
      valuesHopInventory: (state) => state.machines.valuesHopInventory,
      valuesFrtInventory: (state) => state.machines.valuesFrtInventory,

      isWeightProductLoading: (state) => state.machines.isWeightProductLoading,
      isInventoryProductLoading: (state) => state.machines.isInventoryProductLoading
    })
  },
  methods: {
    ...mapActions({
      onProductWeightParamChange: 'machines/onProductWeightParamChange',
      onProductInventoryParamChanged: 'machines/onProductInventoryParamChanged'
    }),
    _onProductWeightParamChange(data) {
      this.onProductWeightParamChange(data)
    },
    _onProductInventoryParamChanged(data) {
      this.onProductInventoryParamChanged(data)
    }
  }
}
</script>