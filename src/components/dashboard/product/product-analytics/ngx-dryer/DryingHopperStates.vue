<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    height="100%"
  >
    <v-card-title>Drying Hopper States</v-card-title>
    <v-card-text>
      <v-alert
        :color="backgroundColor(dryingHoppers.hopper1)"
        :style="`color: ${textColor(dryingHoppers.hopper1)}`"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="7">
            <span
              class="font-weight-bold"
            >Drying Hopper 1</span>
          </v-col>
          <v-col class="d-flex body-2">
            <v-icon
              small
              left
              :color="circleColor(dryingHoppers.hopper1)"
            >mdi-checkbox-blank-circle</v-icon>
            {{ valueText(dryingHoppers.hopper1) }}
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
        :color="backgroundColor(dryingHoppers.hopper2)"
        :style="`color: ${textColor(dryingHoppers.hopper2)}`"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="7">
            <span
              class="font-weight-bold"
            >Drying Hopper 2</span>
          </v-col>
          <v-col class="d-flex body-2">
            <v-icon
              small
              left
              :color="circleColor(dryingHoppers.hopper2)"
            >mdi-checkbox-blank-circle</v-icon>
            {{ valueText(dryingHoppers.hopper2) }}
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
        :color="backgroundColor(dryingHoppers.hopper3)"
        :style="`color: ${textColor(dryingHoppers.hopper3)}`"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col cols="7">
            <span
              class="font-weight-bold"
            >Drying Hopper 3</span>
          </v-col>
          <v-col class="d-flex body-2">
            <v-icon
              small
              left
              :color="circleColor(dryingHoppers.hopper3)"
            >mdi-checkbox-blank-circle</v-icon>
            {{ valueText(dryingHoppers.hopper3) }}
          </v-col>
        </v-row>
      </v-alert>
    </v-card-text>
  </v-card>
</template>
<script>
// value meaning hopper color
// 0 DISABLED GREY
// 1 ENABLED WHITE
// 2 ONLINE GREEN
// 3 SETBACK BLUE
// 4 AUTOTUNE YELLOW
// 5 ALARMED RED

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    dryingHoppers: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    backgroundColor(value) {
      if (value === 0) return 'grey lighten-4'
      else if (value === 2) return 'green lighten-4'
      else if (value === 3) return 'blue lighten-4'
      else if (value === 4) return 'yellow lighten-4'
      else if (value === 5) return 'red lighten-4'
    },
    circleColor(value) {
      if (value === 0) return 'grey'
      else if (value === 2) return 'green'
      else if (value === 3) return 'blue'
      else if (value === 4) return 'yellow'
      else if (value === 5) return 'red'
    },
    textColor(value) {
      if (value === 0) return '#9e9e9e'
      else return '#193d66'
    },
    valueText(value) {
      if (value === 0) return 'Disabled'
      else if (value === 1) return 'Enabled'
      else if (value === 2) return 'Online'
      else if (value === 3) return 'Setback'
      else if (value === 4) return 'Autotune'
      else if (value === 5) return 'Alarmed'
    }
  }
}
</script>