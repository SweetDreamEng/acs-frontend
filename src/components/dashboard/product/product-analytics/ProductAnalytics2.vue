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
  </div>
</template>
<script>
import Overview from '../Overview'
import Utilization from '../Utilization'
import EnergyConsumption from '../EnergyConsumption'
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