<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-card :disabled="loadingReports" :loading="loadingReports">
      <v-card-title>System Inventory Report</v-card-title>

      <v-card-text>
        <div class="text-right">
          <v-btn
            color="primary"
            :loading="exportingReport"
            :disabled="exportingReport"
            @click="_exportSystemInventoryReport()"
          >
            Save
          </v-btn>
        </div>
        <v-data-table
          :headers="tableHeaders"
          :items="systemInventoryReports"
          class="flex-grow-1"
        >
          <template v-slot:item.value="{ item }">
            {{ item.value.toFixed(3) }}
          </template>
        </v-data-table>
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
        { text: 'Value', value: 'value' }
      ]
    }
  },
  computed: {
    ...mapState({
      loadingReports: (state) => state.materials.loadingReports,
      exportingReport: (state) => state.materials.exportingReport,

      systemInventoryReports: (state) => state.materials.systemInventoryReports
    })
  },
  mounted() {
    this.getSystemInventoryReport()
  },
  methods: {
    ...mapActions({
      getSystemInventoryReport: 'materials/getSystemInventoryReport',
      exportSystemInventoryReport: 'materials/exportSystemInventoryReport'
    }),
    async _exportSystemInventoryReport() {
      try {
        const response = await this.exportSystemInventoryReport()

        const filepath = process.env.VUE_APP_SERVER_API_ENDPOINT.slice(0, -3) + 'assets/app/reports/' + response.filename

        this.$download(filepath, response.filename)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
