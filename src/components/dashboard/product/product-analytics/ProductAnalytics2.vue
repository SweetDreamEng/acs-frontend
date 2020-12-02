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
        <!-- <operation-mode></operation-mode> -->
      </v-col>
      <v-col md="4" sm="8" xs="12">
        <energy-consumption
          :energy-consumption="energyConsumption"
        >
        </energy-consumption>
      </v-col>
      <v-col md="2" sm="4" xs="12">
        <!-- <availability :series="statusSeries"></availability> -->
      </v-col>
      <v-col md="2" sm="4" xs="12">
        <!-- <Cutting /> -->
        <!-- <hours-per-year class="mt-1"></hours-per-year> -->
      </v-col>
    </v-row>
<!--     <v-row dense>
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
    </v-row> -->
  </div>
</template>
<script>
import Overview from '../Overview'
import HoursPerYear from '../HoursPerYear'
import Utilization from '../Utilization'
import EnergyConsumption from '../EnergyConsumption'
import AccumulatedHopperInventory from '../AccumulatedHopperInventory'
import AccumulatedHauloffLength from '../AccumulatedHauloffLength'
import Recipe from './gh-gravimetric-extrusion-control-hopper/Recipe'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Overview,
    Utilization,
    EnergyConsumption
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

      // Energy Consumption
      energyConsumption: (state) => state.machines.energyConsumption
    })
  },
  methods: {
    ...mapActions({
    })
  }
}
</script>