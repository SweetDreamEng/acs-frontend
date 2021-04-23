<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="text-h4">Active Thresholds</div>
      </div>
    </div>
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
            @click="getActiveThresholds"
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

import operators from './content/operators'

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
        { text: 'Last Triggered at', value: 'last_triggered_at' }
      ],
      searchQuery: '',
      selectedThresholds: []
    }
  },
  computed: {
    ...mapState({
      thresholds: (state) => state.thresholds.thresholds,
      loading: (state) => state.thresholds.loading,
      isThresholdUpdating: (state) => state.thresholds.isThresholdUpdating
    })
  },
  mounted() {
    this.getActiveThresholds()
  },
  methods: {
    ...mapActions({
      getActiveThresholds: 'thresholds/getActiveThresholds',
      clearThresholds: 'thresholds/clearThresholds'
    }),
    async handleSubmit() {
      try {
        await this.clearThresholds({
          thresholds: this.selectedThresholds
        })

        this.selectedThresholds = []

        this.getActiveThresholds()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
