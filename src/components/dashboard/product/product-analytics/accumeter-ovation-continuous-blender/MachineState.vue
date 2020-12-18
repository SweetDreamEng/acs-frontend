<template>
  <v-card
    :loading="loading"
    :disabled="loading"
    height="100%"
  >
    <v-card-title>System States</v-card-title>
    <v-card-text>
      <v-alert
        :color="systemStates.machine_running ? 'green lighten-4' : 'red lighten-4'"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col class="grow">
            <span
              class="font-weight-bold"
              :class="{ 'red--text': !systemStates.machine_running }"
            >Machine State</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex body-2" :class="{ 'red--text': !systemStates.machine_running }">
            <v-icon
              small
              left
              :color="systemStates.machine_running ? 'green' : 'red'"
            >mdi-checkbox-blank-circle</v-icon>
            {{ systemStates.machine_running ? 'Running' : 'Not running'}}
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
        :color="systemStates.system_steady ? 'green lighten-4' : 'red lighten-4'"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col class="grow">
            <span
              class="font-weight-bold"
              :class="{ 'red--text': !systemStates.system_steady }"
            >System steady</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex body-2" :class="{ 'red--text': !systemStates.system_steady }">
            <v-icon
              small
              left
              :color="systemStates.system_steady ? 'green' : 'red'"
            >mdi-checkbox-blank-circle</v-icon>
            {{ systemStates.system_steady ? 'Steady' : 'Not steady'}}
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
        :color="systemStates.mass_flow_hopper ? 'green lighten-4' : 'red lighten-4'"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col class="grow">
            <span
              class="font-weight-bold"
              :class="{ 'red--text': !systemStates.mass_flow_hopper }"
            >Mass flow hopper</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex body-2" :class="{ 'red--text': !systemStates.mass_flow_hopper }">
            <v-icon
              small
              left
              :color="systemStates.mass_flow_hopper ? 'green' : 'red'"
            >mdi-checkbox-blank-circle</v-icon>
            {{ systemStates.mass_flow_hopper ? 'Steady' : 'Not steady'}}
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
        :color="systemStates.rpm ? 'green lighten-4' : 'red lighten-4'"
      >
        <v-row
          align="center"
          no-gutters
        >
          <v-col class="grow">
            <span
              class="font-weight-bold"
              :class="{ 'red--text': !systemStates.rpm }"
            >RPM</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex body-2" :class="{ 'red--text': !systemStates.rpm }">
            <v-icon
              small
              left
              :color="systemStates.rpm ? 'green' : 'red'"
            >mdi-checkbox-blank-circle</v-icon>
            {{ systemStates.rpm ? 'Steady' : 'Not steady'}}
          </v-col>
        </v-row>
      </v-alert>
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
    systemStates: {
      type: Object,
      default: () => {}
    }
  }
}
</script>