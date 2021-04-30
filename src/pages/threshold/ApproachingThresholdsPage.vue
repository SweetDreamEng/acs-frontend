<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-card :disabled="loading">
      <v-row dense class="pa-2 align-center">
        <v-col cols="6" class="d-flex text-right align-center">
          <v-text-field
            v-model="searchQuery"
            append-icon="$mdi-magnify"
            class="flex-grow-1 mr-md-2"
            solo
            hide-details
            dense
            clearable
            placeholder="e.g. condition, last triggered date etc"
          ></v-text-field>
          <v-btn
            :loading="loading"
            icon
            small
            class="ml-2"
            @click="getApproachingThresholds"
          >
            <v-icon>$mdi-refresh</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6" class="d-flex text-right align-right">
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="selectedThresholds.length === 0" :loading="isThresholdUpdating" @click="handleSubmit">
            Clear Thresholds
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        v-model="selectedThresholds"
        show-select
        :headers="headers"
        :items="thresholds"
        :loading="loading"
        :search="searchQuery"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>

/*
|---------------------------------------------------------------------
| Threshold List Page Component
| url: /threshold/list
|---------------------------------------------------------------------
|
| List thresholds
*/
import { mapActions, mapState } from 'vuex'

export default {
  components: {
  },
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      headers: [
        { text: 'Id', sortable: false, value: 'id' },
        { text: 'Device name', sortable: false, value: 'device_name' },
        { text: 'Condition', sortable: false, value: 'option' },
        { text: 'Last Triggered at (EST)', value: 'approaching_triggered_time' }
      ],
      searchQuery: '',
      selectedThresholds: []
    }
  },
  computed: {
    ...mapState({
      thresholds: (state) => state.thresholds.approachingThresholds,
      loading: (state) => state.thresholds.loading,
      isThresholdUpdating: (state) => state.thresholds.isThresholdUpdating
    })
  },
  mounted() {
    this.getApproachingThresholds()
  },
  methods: {
    ...mapActions({
      getApproachingThresholds: 'thresholds/getApproachingThresholds',
      clearApproachingThresholds: 'thresholds/clearApproachingThresholds'
    }),
    async handleSubmit() {
      try {
        await this.clearApproachingThresholds({
          thresholds: this.selectedThresholds
        })

        this.selectedThresholds = []

        this.getApproachingThresholds()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
