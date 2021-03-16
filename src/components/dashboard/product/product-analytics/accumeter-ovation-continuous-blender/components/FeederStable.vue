<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    height="100%"
  >
    <v-card-title>Feeder Stable</v-card-title>
    <v-card-text>
      <template v-if="feeders.length">
        <div v-for="(feeder, i) in feeders" :key="i" class="d-flex py-1">
          <div class="title">Feeder {{ i + 1 }}</div>
          <v-spacer></v-spacer>
          <v-chip
            label
            class="ml-auto"
            :class="{ 'red--text': !feeder }"
            :color="feeder ? 'acs-stable lighten-4' : 'acs-unstable lighten-4'"
          >
            <v-icon small left :color="feeder ? 'acs-stable' : 'acs-unstable'">
              $mdi-checkbox-blank-circle
            </v-icon>
            {{ feeder ? 'Stable' : 'Unstable' }}
          </v-chip>
        </div>
      </template>
      <template v-else>
        <div class="text-center">No Data From Device</div>
      </template>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    feeders: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  }
}
</script>