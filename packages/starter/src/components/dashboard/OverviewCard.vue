<template>
  <v-card>

    <!-- loading spinner -->
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else>
      <v-card-title>
        {{ label }}
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <!-- information -->
        <gmap-map :center="center" :zoom="4" style="width: 100%; height: 500px">
          <gmap-marker
            v-for="(m, index) in markers"
            :key="index"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'dashboard.capacity'
    },
    markers: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      center: {
        lat: 41.14961,
        lng: -87.6500523
      }
    }
  }
}
</script>
