<template>
  <v-card height="100%" :loading="loading" :disabled="loading">
    <v-card-title>
      Drying Hopper States
      <v-btn
        icon
        small
        class="ml-auto"
        @click="$emit('reload')"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="px-2">
      <v-list v-if="hopperStates.length">
        <v-list-item v-for="(state, i) in hopperStates" :key="i">
          <v-list-item-content class="py-1">
            {{ state.name }}
          </v-list-item-content>

          <v-list-item-action class="my-1">
            <div class="align-center" style="width: 180px;">
              <v-icon left :color="circleColor(i, state.value)">mdi-circle</v-icon> {{ valueText(i, state.value) }}
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
    hopperStates: {
      type: Array,
      default: () => {}
    }
  },
  methods: {
    circleColor(i, value) {
      if (i === 0) {
        if (value === 0) return 'grey'
        else if (value === 1) return '#DDD'
        else if (value === 2) return 'green'
        else if (value === 3) return 'blue'
        else if (value === 4) return 'yellow'
        else if (value === 5) return 'red'
      } else if (i === 1) {
        if (value === 0) return 'grey'
        else if (value === 1) return 'green'
        else if (value === 2) return 'black'
      } else if (i > 1) {
        if (value === 0) return 'grey'
        else if (value === 1) return 'green'
        else if (value === 2) return 'yellow'
        else if (value === 3) return 'blue'
        else if (value === 4) return 'red'
        else if (value === 5) return 'yellow'
      }

      return ''
    },
    valueText(i, value) {
      if (i === 0) {
        if (value === 0) return 'Disabled'
        else if (value === 1) return 'Enabled'
        else if (value === 2) return 'Online'
        else if (value === 3) return 'Setback'
        else if (value === 4) return 'Autotune'
        else if (value === 5) return 'Alarmed'
      } else if (i === 1) {
        if (value === 0) return 'Offline'
        else if (value === 1) return 'Online'
        else if (value === 2) return 'Shutdown'
      } else if (i > 1) {
        if (value === 0) return 'Offline/Not enabled'
        else if (value === 1) return 'Enabled'
        else if (value === 2) return 'In demand'
        else if (value === 3) return 'Loading'
        else if (value === 4) return 'Alarmed'
        else if (value === 5) return 'Filter Clean/Dump delay'
      }

      return ''
    }
  }
}
</script>
