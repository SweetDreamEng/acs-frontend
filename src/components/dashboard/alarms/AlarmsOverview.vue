<template>
  <div class="d-flex flex-grow-1 flex-column mt-1">
    <v-card
      :loading="loading"
      :disabled="loading"
    >
      <v-card-title>Overview</v-card-title>
      <v-card-text v-if="alarmsOverview">
        <v-row dense>
          <v-col cols="12" md="4">
            <!-- <apexchart
              height="200"
              :options="chartOptions"
              :series="series"
            >
            </apexchart> -->
          </v-col>
          <v-col cols="12" md="2">
            <div>
              <div class="mb-1">
                <v-icon>$mdi-bell</v-icon>
              </div>
              <div class="text-h4 font-weight-bold">
                {{ alarmsOverview.total }}
              </div>
              <div>
                Total Alarms
              </div>
            </div>
          </v-col>
          <v-col v-for="(alarm, index) in alarmsOverview.top_alarms" :key="index" cols="12" md="2">
            <div>
              <div class="mb-1">
                <v-icon :color="getColorByIndex(index)">$mdi-near-me</v-icon>
              </div>
              <div class="text-h6 font-weight-bold">
                {{ alarmsOverview.top_alarms[index].count }}
              </div>
              <div>
                <div>
                  {{ alarmsOverview.top_alarms[index].machine_name }}
                </div>
                <div>
                  {{ alarmsOverview.top_alarms[index].name }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
