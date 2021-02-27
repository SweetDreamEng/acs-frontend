<template>
  <div>
    <v-row dense>
      <v-col cols="12" sm="6" lg="4">
        <bed-states
          :loading="loadingBedStates"
          :states="bedStates"
        >
        </bed-states>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <online-hours
          :loading="loadingOnlineHours"
          :hours="onlineHours"
        >
        </online-hours>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import BedStates from './components/BedStates'
import OnlineHours from './components/OnlineHours'

import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  components: {
    BedStates,
    OnlineHours
  },
  props: {
    machineId: {
      type: Number,
      default: 0
    },
    serialNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('ngxDryer', [
      'loadingBedStates',
      'loadingOnlineHours',
      'bedStates',
      'onlineHours'
    ])
  },
  mounted() {
    this.getBedStates({ serialNumber: this.serialNumber })
    this.getOnlineHours({ serialNumber: this.serialNumber })
  },
  methods: {
    ...mapActions('ngxDryer', [
      'getBedStates',
      'getOnlineHours'
    ])
  }
}
</script>