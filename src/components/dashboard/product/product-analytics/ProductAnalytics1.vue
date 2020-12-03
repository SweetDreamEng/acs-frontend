<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="4" xs="12">
        <overview
          :machine="machine"
        >
        </overview>
      </v-col>
      <v-col md="8" sm="8" xs="12">
        <utilization></utilization>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="6" sm="12" xs="12">
        <OEE
          :mode="modeInventory"
          :param="paramInventory"
          :valuesHopInventory="valuesHopInventory"
          :valuesFrtInventory="valuesFrtInventory"
          :isLoading="isInventoryProductLoading"
          @changeParams="_onProductInventoryParamChanged"
        >
        </OEE>
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
        <AverageUtilization
          :weekly-running-hours="weeklyRuningHours"
        >
        </AverageUtilization>
      </v-col>
      <v-col md="4" sm="8" xs="12">
        <energy-consumption
          :energy-consumption="energyConsumption"
        >
        </energy-consumption>
      </v-col>
      <v-col md="4" sm="8" xs="12">
        <machine-status></machine-status>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Overview from '../Overview'
import HoursPerYear from '../HoursPerYear'
import MachineStatus from './bd-batch-blender/MachineStatus'
import Utilization from '../Utilization'
import ActualTargetWeight from '../ActualTargetWeight'
import AverageUtilization from '../AverageUtilization'
import OEE from '../OEE'
import EnergyConsumption from '../EnergyConsumption'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Overview, MachineStatus, Utilization, ActualTargetWeight, AverageUtilization, OEE, EnergyConsumption
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
      isInventoryProductLoading: (state) => state.machines.isInventoryProductLoading,
      
      energyConsumption: (state) => state.machines.energyConsumption,                   // Energy Consumption
      weeklyRuningHours: (state) => state.machines.weeklyRuningHours                    // Weekly running hours
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