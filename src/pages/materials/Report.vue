<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-card v-if="report" :disabled="loadingTrack" :loading="loadingTrack">
      <v-card-title>Materials</v-card-title>
      <v-data-table
        :headers="tableHeaders"
        :items="report.reportItems"
        class="flex-grow-1"
        :disabled="loadingReport"
        :loading="loadingReport"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <div class="d-flex">
              <v-select
                :items="blenders"
                item-text="customer_assigned_name"
                item-value="serial_number"
                v-model="blenderId"
                dense
                outlined
                label="Choose device"
              >
              </v-select>
              <v-select
                :items="blenderTracks"
                item-text="start"
                item-value="id"
                v-model="trackId"
                dense
                outlined
                label="Choose track"
                class="ml-1"
              >
              </v-select>
              <v-btn color="primary" class="ml-2" @click="getReport({ blenderId, trackId })">Get Report</v-btn>
            </div>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      tableHeaders: [
        { text: 'Material', value: 'material' },
        { text: 'Location', value: 'location' },
        { text: 'Value', value: 'value' }
      ],

      blenderId: 0,
      trackId: 0,
      editDialog: false
    }
  },
  computed: {
    ...mapState({
      loadingReport: (state) => state.materials.loadingReport,
      loadingTrack: (state) => state.materials.loadingTrack,

      report: (state) => state.materials.report,
      blenders: (state) => state.materials.blenders,
      tracks: (state) => state.materials.tracks
    }),

    blenderTracks() {
      return this.tracks.filter((t) => t.device_id === this.blenderId)
    }
  },
  mounted() {
    this.getTracks()
  },
  methods: {
    ...mapActions({
      getReport: 'materials/getReport',
      getTracks: 'materials/getTracks'
    })

    // async getReport() {
    //   try {
    //     const loadingReport = true

    //     await this.getReport()
    //   } catch (err) {
    //     console.log(err)
    //   }

    //   const loadingReport = false
    // }
  }
}
</script>
