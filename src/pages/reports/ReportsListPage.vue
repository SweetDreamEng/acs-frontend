<template>
  <div class="d-flex flex-column flex-grow-1 pt-8">
    <v-card :disabled="reportsListLoading">
      <v-row align="center" justify="center">
        <v-col cols="4">
          <v-card-title>
            Reports
          </v-card-title>
        </v-col>
        <v-col cols="8" class="d-flex text-right align-center">
          <v-text-field
            v-model="searchQuery"
            append-icon="$mdi-magnify"
            class="flex-grow-1 mr-md-2"
            solo
            hide-details
            dense
            clearable
            placeholder="e.g. report name, date from, date to, etc"
          ></v-text-field>
          <v-btn
            icon
            small
            class="ml-2 mr-1"
            @click="refreshReportsList()"
          >
            <v-icon>$mdi-refresh</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="reportsList"
          :loading="reportsListLoading"
          :search="searchQuery"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="downloadReport(item)">
              <v-icon small>$mdi-printer</v-icon>
            </v-btn>
            <v-btn icon @click="editReport(item)">
              <v-icon small>$mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="removeReport(item)">
              <v-icon small>$mdi-trash-can-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="isDeleteReport" max-width="500">
      <v-card>
        <v-card-text class="text-center">
          <v-avatar class="text-center mt-5" color="grey lighten-2" size="100">
            <v-icon color="white" x-large>$mdi-trash-can-outline</v-icon>
          </v-avatar>
        </v-card-text>
        <v-card-title class="mt-1 headline justify-center">Are you sure to delete report?</v-card-title>
        <v-card-text class="pb-0 text-center">Click on Confirm to delete report.</v-card-text>
        <div class="mt-2 pb-3 text-center">
          <v-btn color="grey lighten-2" depressed @click="isDeleteReport = false">Cancel</v-btn>
          <v-btn
            class="ml-2 white--text"
            depressed
            color="red"
            :loading="reportsListLoading"
            @click="confirmDelete"
          >Confirm</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      headers: [
        { text: 'Report Name', align: 'center', value: 'filename' },
        { text: 'Date From', align: 'center', value: 'from' },
        { text: 'Date To', align: 'center', value: 'to' },
        { text: 'Actions', align: 'center', value: 'actions', sortable: false }
      ],
      searchQuery: '',
      isEditingReport: false,
      isDeleteReport: false,
      selectedReport: {}
    }
  },
  computed: {
    ...mapState({
      reportsList: (state) => state.machines.reportsList,
      reportsListLoading: (state) => state.machines.reportsListLoading
    })
  },
  mounted() {
    this.getReportsList()
  },
  methods: {
    ...mapActions({
      getReportsList: 'machines/getReportsList',
      deleteReport: 'machines/deleteReport'
    }),
    downloadReport(report) {
      const filename = report.filename + '.xlsx'
      const filepath = this.$REPORTS_URL + filename

      this.$download(filepath, filename)
    },
    editReport(report) {
      console.log('edit', report)
    },
    removeReport(report) {
      this.selectedReport = report
      this.isDeleteReport = true
    },
    async confirmDelete() {
      try {
        await this.deleteReport(this.selectedReport.id)

        this.isDeleteReport = false
      } catch (error) {
        console.log(error)
      }

    },
    refreshReportsList() {
      this.getReportsList()
    }
  }
}
</script>
