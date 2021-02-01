<template>
  <div class="d-flex align-center">
    <div class="label font-italic">(Data displayed for last 7 days)</div>
    <div>
      <v-icon class="ml-2 mr-0" color="#269ffb">mdi-checkbox-blank</v-icon>
      Unplanned
    </div>
    <div>
      <v-icon class="ml-2 mr-0" :color="$vuetify.theme.themes.light.primary">mdi-checkbox-blank</v-icon>
      Planned
    </div>
    <div>
      <v-icon class="ml-2 mr-0" color="#febb3b">mdi-checkbox-blank</v-icon>
      Idle
    </div>
  </div>
</template>