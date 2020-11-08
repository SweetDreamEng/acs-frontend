<template>
  <v-card>
    <v-card-title class="primary white--text">Alarm Reports</v-card-title>
    <v-card-text class="mt-4">
      <div
        v-for="(alarm, i) in alarms"
        :key="i"
        class="d-flex align-center justify-space-between my-1"
      >
        <span>{{ alarm.productName }}</span>
        <v-alert
          type="error"
          dense
          outlined
          class="mb-0"
        >
          <small>{{ alarm.message }}</small>
        </v-alert>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$emit('close')">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    // markers: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   }
    // }
  },
  data() {
    return {
      alarms: [
        {
          productName: 'BD Batch Blender',
          message: 'Out of Material'
        },
        {
          productName: 'Gravimetric Extrusion control',
          message: 'Mixer failure'
        }
      ]
    }
  }
}
</script>
