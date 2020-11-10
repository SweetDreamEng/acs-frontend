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
          <v-col cols="4">
            <v-row dense>
              <v-col cols="6">
                <production-rate />
              </v-col>
              <v-col cols="6">
                <OEE/>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row dense>
              <v-col xs="12" sm="12" md="12">
                <avg-track />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <production-rate-machine />
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import ProductionRate from './ProductionRate'
import OEE from './OEE'
import AvgTrack from './AvgTrack'
import ProductionRateMachine from './ProductionRateMachine'
export default {
  components: {
    ProductionRate,
    OEE,
    AvgTrack,
    ProductionRateMachine
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
