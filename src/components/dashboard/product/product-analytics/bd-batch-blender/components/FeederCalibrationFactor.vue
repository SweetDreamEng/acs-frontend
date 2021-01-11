<template>
  <v-card height="100%" :loading="loading" :disabled="loading">
    <v-card-title>Feeder Calibration Factor</v-card-title>
    <v-card-text class="px-4">
      <v-list v-if="feeders.length">
        <v-list-item v-for="(feeder, i) in feeders" :key="i" style="min-height: 36px;">
          <v-list-item-content class="py-1">
            {{ `Feeder ${i + 1}` }}
          </v-list-item-content>

          <v-list-item-action class="font-weight-bold text-subtitle-1" style="margin-top: 6.8px; margin-bottom: 6.8px;">
            {{ feeder }}
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <div v-else class="text-center">
        No Data From Device
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
  },
  methods: {
  }
}
</script>
