<template>
  <div>
    <v-card>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="6" md="6">
            <v-card outlined tile class="elevation-2">
              <v-card-title class="subtitle-1">Today's Production</v-card-title>
              <v-card-text class="primary--text">
                <span class="display-1">80</span>
                <span class="title">/</span>
                <span class="title">140</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-card outlined tile class="elevation-2">
              <v-card-title class="subtitle-1">First Pass Yield</v-card-title>
              <v-card-text class="primary--text">
                <span class="display-1">87%</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" sm="6" md="6">
            <v-card outlined tile class="elevation-2">
              <v-card-title class="subtitle-1">Average Daily Production(this wk)</v-card-title>
              <v-card-text class="primary--text">
                <span class="display-1">152</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-card outlined tile class="elevation-2">
              <v-card-title class="subtitle-1">Avg First Past Yield (this wk)</v-card-title>
              <v-card-text class="primary--text">
                <span class="display-1">84%</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
}
</script>
<style scoped>
  .v-card__title {
    word-break: break-word;
  }
</style>