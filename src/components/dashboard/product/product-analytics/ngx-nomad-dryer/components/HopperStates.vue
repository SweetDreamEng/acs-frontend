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
        <v-icon>$mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="px-2">
      <v-list v-if="hopperStates.length">
        <v-list-item v-for="(state, i) in hopperStates" :key="i">
          <v-list-item-content class="py-1">
            {{ state.name }}
          </v-list-item-content>

          <v-list-item-action class="my-1">
            <div class="align-center" style="width: 200px;">
              <v-icon left :color="circleColor(i, state.value)">$mdi-circle</v-icon> {{ valueText(i, state.value) }}
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

const DRYING_HOPPER_STATES = {
  DISABLED: {
    color: 'acs-hopper-disabled',
    label: 'Disabled'
  },
  ENABLED: {
    color: 'acs-hopper-enabled',
    label: 'Enabled'
  },
  ONLINE: {
    color: 'acs-online',
    label: 'Online'
  },
  SETBACK: {
    color: 'acs-hopper-setback',
    label: 'Setback'
  },
  AUTOTUNE: {
    color: 'acs-hopper-autotune',
    label: 'Autotune'
  },
  ALARMED: {
    color: 'acs-hopper-alarmed',
    label: 'Alarmed'
  }
}

const CONVEY_STATES = {
  OFFLINE: {
    color: 'acs-offline',
    label: 'Offline'
  },
  ONLINE: {
    color: 'acs-online',
    label: 'Online'
  },
  SHUTDOWN: {
    color: 'black',
    label: 'Shutdown'
  }
}

const LOADER_STATES = {
  OFFLINE: {
    color: 'acs-offline',
    label: 'Offline/Not enabled'
  },
  ENABLED: {
    color: 'green',
    label: 'Enabled'
  },
  IN_DEMAND: {
    color: 'yellow',
    label: 'In Demand'
  },
  LOADING: {
    color: 'blue',
    label: 'Loading'
  },
  ALARMED: {
    color: 'red',
    label: 'Alarmed'
  },
  FILTER_CLEAN: {
    color: 'yellow',
    label: 'Filter clean/Dump delay'
  }
}

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
    getHopperState(hopperType, value) {
      // get states for drying hopper
      if (hopperType === 0) {
        if (value === 0) return DRYING_HOPPER_STATES['DISABLED']
        else if (value === 1) return DRYING_HOPPER_STATES['ENABLED']
        else if (value === 2) return DRYING_HOPPER_STATES['ONLINE']
        else if (value === 3) return DRYING_HOPPER_STATES['SETBACK']
        else if (value === 4) return DRYING_HOPPER_STATES['AUTOTUNE']
        else if (value === 5) return DRYING_HOPPER_STATES['ALARMED']
      } // get states for convey
      else if (hopperType === 1) {
        if (value === 0) return CONVEY_STATES['OFFLINE']
        else if (value === 1) return CONVEY_STATES['ONLINE']
        else if (value === 2) return CONVEY_STATES['SHUTDOWN']
      } // get states for loaders
      else if (hopperType > 1) {
        if (value === 0) return LOADER_STATES['OFFLINE']
        else if (value === 1) return LOADER_STATES['ENABLED']
        else if (value === 2) return LOADER_STATES['IN_DEMAND']
        else if (value === 3) return LOADER_STATES['LOADING']
        else if (value === 4) return LOADER_STATES['ALARMED']
        else if (value === 5) return LOADER_STATES['FILTER_CLEAN']
      }

      return ''
    },
    circleColor(hopperType, value) {
      const state = this.getHopperState(hopperType, value)

      return state ? state.color : ''
    },

    valueText(hopperType, value) {
      const state = this.getHopperState(hopperType, value)

      return state ? state.label : ''
    }
  }
}
</script>
