<template>
  <div>
    <v-card :loading="isLoading" :disabled="isLoading">
      <v-card-title class="pb-0">Select Location</v-card-title>
      <v-card-text class="mt-2">
        <v-row v-if="locations.length" dense>
          <v-col
            v-for="(location, i) in locations"
            :key="i"
            cols="12"
          >
            <v-btn block @click="$emit('setLocationId', location.id)">{{ location.name }}</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
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
      isLoading: (state) => state.locations.tableLoading,
      locations: (state) => state.locations.data
    })
  },
  mounted() {
    this.getLocations()
  },
  methods: {
    ...mapActions({
      getLocations: 'locations/getLocations'
    })
  }
}
</script>
