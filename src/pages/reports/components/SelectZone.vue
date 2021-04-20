<template>
  <div>
    <v-card :loading="isLoading" :disabled="isLoading">
      <v-card-title class="pb-0">Select Zone</v-card-title>
      <v-card-text class="mt-2">
        <v-row v-if="zones.length" dense>
          <v-col
            v-for="(zone, i) in zones"
            :key="i"
            cols="12"
          >
            <v-btn block @click="$emit('setZoneId', zone.id)">{{ zone.name }}</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <div class="mt-2 pb-3 text-right">
        <v-btn color="grey lighten-2" depressed @click="$emit('cancel')">Back</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.machines.loadingZonesTable,
      zones: (state) => state.zones.data
    })
  }
}
</script>
