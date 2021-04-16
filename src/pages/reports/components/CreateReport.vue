<template>
  <v-card>
    <v-card-text class="text-center">
      <v-avatar class="text-center mt-5" color="grey lighten-2" size="100">
        <v-icon color="primary" x-large>$mdi-file-chart-outline</v-icon>
      </v-avatar>
    </v-card-text>
    <v-card-title class="mt-1 headline justify-center">Do you want to create a Report?</v-card-title>
    <v-card-text class="pb-0 text-center">Click on Create Report to generate a new report.</v-card-text>
    <div class="mt-2 pb-3 text-center">
      <v-btn class="ml-2" depressed color="primary" @click="$emit('createReport')">+ Create Report</v-btn>
    </div>
  </v-card>
</template>
<script>
export default {
}
</script>
