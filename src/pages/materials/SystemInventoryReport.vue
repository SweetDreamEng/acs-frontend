<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-card :disabled="loadingBlenders" :loading="loadingBlenders">
      <v-card-title>Report</v-card-title>

      <v-card-text>
        <div class="d-flex">
          <v-select
            :items="blenders"
            item-text="customer_assigned_name"
            item-value="serial_number"
            v-model="blenderId"
            dense
            outlined
            label="Please select Blender"
            @change="getReport({ blenderId })"
          >
          </v-select>
        </div>

        <div v-if="loadingReports" class="d-flex flex-grow-1 align-center justify-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>

        <div v-else>
          <v-expansion-panels v-if="reports.length > 0">
            <v-expansion-panel
              v-for="(report, i) in reports"
              :key="i"
            >
              <v-expansion-panel-header>
                {{ reportTitle(report) }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-data-table
                  :headers="tableHeaders"
                  :items="report.reportItems"
                  class="flex-grow-1"
                >
                  <template v-slot:top>
                    <div class="text-right">
                      <v-btn
                        color="red"
                        :dark="!deletingReport"
                        :loading="deletingReport"
                        :disabled="deletingReport"
                        @click="_deleteReport(report)"
                      >
                        Delete
                      </v-btn>
                    </div>
                  </template>
                </v-data-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <div v-else class="text-center">
            No report
          </div>
        </div>
      </v-card-text>
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

      blenderId: 0
    }
  },
  computed: {
    ...mapState({
      loadingReports: (state) => state.materials.loadingReports,
      loadingBlenders: (state) => state.materials.loadingBlenders,
      deletingReport: (state) => state.materials.deletingReport,

      reports: (state) => state.materials.reports,
      blenders: (state) => state.materials.blenders
    })
  },
  mounted() {
    this.getBlenders()
  },
  methods: {
    ...mapActions({
      getReport: 'materials/getReport',
      getBlenders: 'materials/getBlenders',
      deleteReport: 'materials/deleteReport'
    }),
    reportTitle(track) {
      const blender = this.blenders.find((b) => b.serial_number === this.blenderId)
      const dateStart = new Date(track.start * 1000).toISOString()
      const dateStop = new Date(track.stop * 1000).toISOString()

      return blender ? `${blender.customer_assigned_name} - ${dateStart.substr(0, 10)} ${dateStart.substr(11, 8)} - ${dateStop.substr(0, 10)} ${dateStop.substr(11, 8)}` : ''
    },

    async _deleteReport(report) {
      try {
        await this.deleteReport({ id: report.id })

        this.getReport({ blenderId: this.blenderId })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
