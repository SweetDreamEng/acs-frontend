<template>
  <div>
    <v-row dense>
      <v-col md="4" sm="12">
        <overview
          :machine="machine"
          :loading="loadingOverview"
        >
        </overview>
      </v-col>
      <v-col md="4" sm="12">
        <machine-state
          :loading="loadingMachineState"
          :machine="machineState"
        ></machine-state>
      </v-col>
      <v-col md="4" sm="12">
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Overview from '../../common/Overview'
import MachineState from './MachineState'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Overview,
    MachineState
  },
  props: {
    productId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showTimeRangeChooser: false
    }
  },
  computed: {
    ...mapState({
      machine: (state) => state.machines.machine,
      machineState: (state) => state.machines.systemStates,
      
      loadingOverview: (state) => state.machines.loadingOverview,
      loadingMachineState: (state) => state.machines.loadingSystemStates
    }),
    ...mapGetters({
    })
  },
  created() {
    this.getOverview(this.productId)
    this.getSystemStates(this.productId)
  },
  methods: {
    ...mapActions({
      onTimeRangeChanged: 'machines/onTimeRangeChanged',
      selectTimeRange: 'machines/selectTimeRange',
      getOverview: 'machines/getOverview',
      getSystemStates: 'machines/getSystemStates'
    }),
    onShowTimeRangeDlgOpen(key) {
      this.selectTimeRange(key)
      this.$nextTick(() => {
        this.showTimeRangeChooser = true
      })
    },
    _onTimeRangeChanged(data) {
      data.id = this.productId
      this.onTimeRangeChanged(data)
      this.showTimeRangeChooser = false
    }
  }
}
</script>