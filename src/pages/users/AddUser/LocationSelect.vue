<template>
  <div>
    <div
      v-for="(location, i) in locations"
      :key="i"
    >
      <v-checkbox
        v-model="selectedLocations"
        :value="location.id"
        :label="location.location"
        class="shrink mr-2 mt-0"
      ></v-checkbox>
      <div
        v-if="selectedLocations.includes(location.id)"
        class="d-flex flex-wrap px-2"
      >
        <v-checkbox
          v-for="(zone, j) in zonesOfLocation(location.id)"
          :key="j"
          v-model="selectedZones[location.id]"
          :value="zone.id"
          :label="zone.name"
          class="shrink mr-2 mt-0"
        ></v-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    locations: {
      type: Array,
      default: () => []
    },
    zones: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedLocations: [],
      selectedZones: Array(this.locations.length).fill([])
    }
  },
  methods: {
    zonesOfLocation(location_id) {
      return this.zones.filter((zone) => zone.location_id === location_id)
    }
  }
}
</script>