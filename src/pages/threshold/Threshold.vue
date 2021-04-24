<template>
  <div class="flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="text-h4">Thresholds</div>
      </div>
    </div>
    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent" @change="handleTagChange">
      <v-tab to="#tabs-add">Add Threshold</v-tab>
      <v-tab to="#tabs-list">Thresholds List</v-tab>
      <v-tab to="#tabs-active">Active Thresholds</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tabs-add">
        <add-threshold></add-threshold>
      </v-tab-item>
      <v-tab-item value="tabs-list">
        <thresholds-list></thresholds-list>
      </v-tab-item>
      <v-tab-item value="tabs-active">
        <active-threshold></active-threshold>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import AddThreshold from './AddThresholdPage'
import ThresholdsList from './ThresholdsPage'
import ActiveThreshold from './ActiveThresholdsPage'

import { mapActions } from 'vuex'

export default {
  components: {
    AddThreshold,
    ThresholdsList,
    ActiveThreshold
  },
  data() {
    return {
      tab: null
    }
  },
  methods: {
    ...mapActions({
      getThresholds: 'thresholds/getThresholds',
      getActiveThresholds: 'thresholds/getActiveThresholds'
    }),
    handleTagChange(tab) {
      if (tab === 'tabs-list') {
        this.getThresholds()
      }
      if (tab === 'tabs-active') {
        this.getActiveThresholds()
      }
    }
  }
}
</script>
