<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <div>
        <v-btn icon class="ml-auto" @click="">
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <v-card-text>
      <div class="d-flex mt-n3">
        <v-row dense>
          <v-col xs="12" sm="7" md="7">
            <v-row dense>
              <v-col xs="12" sm="6" md="6">
                <production-rate />
              </v-col>
              <v-col xs="12" sm="6" md="6">
                <OEE/>
              </v-col>
            </v-row>
          </v-col>
          <v-col xs="12" sm="5" md="5">
            <v-row dense>
              <v-col xs="12" sm="12" md="12">
                <avg-track></avg-track>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <div class="text-right mt-n2">
        <v-btn outlined color="primary" @click="$emit('viewDetails')">View Details</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
// import VueSpeedometer from 'vue-speedometer'

import ProductionRate from './ProductionRate'
import OEE from './OEE'
import AvgTrack from './AvgTrack'
export default {
  components: {
    ProductionRate, OEE, AvgTrack
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    this.showChart = true
  }
}
</script>
