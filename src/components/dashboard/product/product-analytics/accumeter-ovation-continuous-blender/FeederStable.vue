<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    height="100%"
  >
    <v-card-title>Feeder Stable</v-card-title>
    <v-card-text>
      <div v-for="(feeder, i) in feeders" :key="i" class="d-flex py-1">
        <div class="title">Feeder {{ i + 1 }}</div>
        <v-spacer></v-spacer>
        <v-chip
          label
          class="ml-auto"
          :class="{ 'red--text': !feeder }"
          :color="feeder ? 'green lighten-4' : 'red lighten-4'"
        >
          <v-icon small left :color="feeder ? 'green' : 'red'">
            mdi-checkbox-blank-circle
          </v-icon>
          {{ feeder ? 'Stable' : 'Unstable'}}
        </v-chip>
      </div>
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