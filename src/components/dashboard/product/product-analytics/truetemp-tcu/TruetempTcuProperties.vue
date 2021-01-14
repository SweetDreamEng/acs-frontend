<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="6">
      </v-col>
    </v-row>
  </div>
</template>
<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
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
      selectedTimeRange: (state) => state.truetempTcu.selectedTimeRange
    }),
    ...mapGetters({
      timeRangeLabel: 'bdBlenderAnalytics/timeRangeLabel'
    })
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      onTimeRangeChanged: 'truetempTcu/onTimeRangeChanged',
      selectTimeRange: 'truetempTcu/selectTimeRange'
    }),
    onShowTimeRangeDlgOpen(key) {
      this.selectTimeRange(key)
      this.showTimeRangeChooser = true
    },
    _onTimeRangeChanged(data) {
      data.id = this.productId

      this.onTimeRangeChanged(data)
      this.showTimeRangeChooser = false
    }
  }
}
</script>