<template>
  <v-card height="100%" :loading="loading" :disabled="loading">
    <v-card-title>Hopper Stable</v-card-title>
    <v-card-text class="px-4">
      <v-list v-if="stables.length">
        <v-list-item v-for="(stable, i) in stables" :key="i" style="min-height: 36px;">
          <v-list-item-content class="py-1">
            {{ `Feeder ${i + 1}` }}
          </v-list-item-content>

          <v-list-item-action class="my-1">
            <div class="align-center">
              <v-icon left :color="stable ? 'green' : 'grey'">mdi-circle</v-icon> {{ stable ? 'Stable' : 'Unstable' }}
            </div>
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
    stables: {
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
