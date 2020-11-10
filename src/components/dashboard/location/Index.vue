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
          <v-col cols="6">
            <v-row dense>
              <v-col cols="6">
                <production-rate class="ml-n4" />
              </v-col>
              <v-col cols="6">
                <OEE class="ml-n4"/>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <avg-track />
          </v-col>
        </v-row>
      </div>
      <div class="text-right">
        <v-btn text color="primary" @click="$emit('viewDetails')">View Details</v-btn>
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
