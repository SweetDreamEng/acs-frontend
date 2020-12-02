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
    </v-row>
    <v-row dense>
      <v-col md="4" sm="8" xs="12">
        <operation-mode></operation-mode>
      </v-col>
      <v-col md="4" sm="8" xs="12">
        <energy-consumption
          :energy-consumption="energyConsumption"
        >
        </energy-consumption>
      </v-col>
      <v-col md="2" sm="4" xs="12">
      </v-col>
      <v-col md="2" sm="4" xs="12">
      </v-col>
    </v-row>
    <v-row dense>
      <v-col md="4" sm="8" xs="12">
        <recipe
          :set-points="recipeSetPoints"
          :actual-points="recipeActualPoints"
        >
        </recipe>
      </v-col>
      <v-col md="4" sm="8" xs="12">
        <accumulated-hopper-inventory
          :hopper-inventories="hopperInventories"
        >
        </accumulated-hopper-inventory>
      </v-col>
      <v-col md="4" sm="8" xs="12">
        <accumulated-hauloff-length
          :hauloff-lengths="hauloffLengths"
        >
        </accumulated-hauloff-length>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Overview from '../Overview'
import OperationMode from '../OperationMode'
import HoursPerYear from '../HoursPerYear'
import Utilization from '../Utilization'
import EnergyConsumption from '../EnergyConsumption'
import AccumulatedHopperInventory from './gh-gravimetric-extrusion-control-hopper/AccumulatedHopperInventory'
import AccumulatedHauloffLength from './gh-gravimetric-extrusion-control-hopper/AccumulatedHauloffLength'
import Recipe from './gh-gravimetric-extrusion-control-hopper/Recipe'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Overview,
    OperationMode,
    Utilization,
    EnergyConsumption,
    AccumulatedHopperInventory,
    AccumulatedHauloffLength,
    Recipe
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      machine: (state) => state.machines.machine,

      // Energy Consumption
      energyConsumption: (state) => state.machines.energyConsumption,

      hopperInventories: (state) => state.machines.hopperInventories,
      hauloffLengths: (state) => state.machines.hauloffLengths,

      recipeSetPoints: (state) => state.machines.recipeSetPoints,
      recipeActualPoints: (state) => state.machines.recipeActualPoints
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