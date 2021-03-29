<template>
  <div class="d-flex flex-grow-1 flex-column mt-1">
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

// import TimeRangeChooser from '../TimeRangeChooser1'

export default {
  components: {
    // TimeRangeChooser
  },

  data() {
    return {
      showTimeRangeChooser: false,
      loading: false
    }
  },
  computed: {
    ...mapState({
      alarmsOverview: (state) => state.alarms.alarmsOverview
    })
  },

  async mounted() {
    this.loading = true

    try {
      await this.getAlarmsOverview()
    } catch (error) {
      console.log(error)
    }

    this.loading = false
  },
  methods: {
    ...mapActions({
      getAlarmsOverview: 'alarms/getAlarmsOverview'
    }),
    getColorByIndex(index) {
      const colors = {
        0: 'red',
        1: 'yellow',
        2: 'blue'
      }

      return colors[index] || 'blue'
    }
  }
}
</script>
