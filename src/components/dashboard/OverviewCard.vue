<template>
  <div>
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
          <gmap-map
            :center="center"
            :zoom="4"
            style="width: 100%; height: 500px"
            icon="https://www.google.dk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          >
            <gmap-marker
              v-for="(m, index) in markers"
              :key="index"
              :position="m.position"
              :clickable="true"
              :icon="markerOptions"
              @click="onMarkerClick"
            ></gmap-marker>
          </gmap-map>
        </v-card-text>
      </div>
    </v-card>

    <!-- modal -->
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-title class="primary white--text">Overview</v-card-title>
        <v-card-text class="mt-4">
          <v-alert
            dense
            outlined
            type="info"
          >
            <small>Average Utilization: 44%</small>
          </v-alert>
          <v-alert
            dense
            outlined
            type="success"
          >
            <small>No Alarms Reported</small>
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Overview Card Component
|---------------------------------------------------------------------
|
| Google map with locations of machines
|
*/
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
      },
      markerOptions: {
        url: require('../../assets/svg/gmap-icon.png'),
        size: { width: 90, height: 90, f: 'px', b: 'px' },
        scaledSize: { width: 36, height: 36, f: 'px', b: 'px' }
      },
      dialog: false,
      
      // form
      hours: '',
      isFormValid: true,

      // form error
      error: false,
      errorMessages: '',

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },
  methods: {
    onMarkerClick() {
      this.dialog = true
    }
  }
}
</script>
