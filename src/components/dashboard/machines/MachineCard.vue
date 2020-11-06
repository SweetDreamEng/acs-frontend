<template>
  <v-card class="pa-2">
    <div class="d-flex">
      <div class="overline text-right">{{ card.title }}</div>
      <v-spacer></v-spacer>
      <div
        class="overline text-right font-weight-bold"
        :class="{
          'error--text': card.state === 'STOPPED',
          'success--text': card.state === 'RUNNING',
          'warning--text': card.state === 'MAINTENANCE'
        }"
      >
        {{ card.state }}</div>
    </div>
    <v-divider class="my-2"></v-divider>
    <div>
      <div class="d-flex justify-center align-center flex-wrap" style="min-height: 300px">
        <div class="w-full d-flex justify-center align-center flex-wrap">
          <goal-graph></goal-graph>
          <capacity-graph></capacity-graph>
        </div>

        <uptime-graph></uptime-graph>
        <cycle-graph></cycle-graph>
      </div>
      <v-divider class="my-2"></v-divider>
      <div>
        <div class="text-body-2">Energy usage/cycle: <span class="font-weight-bold">{{ card.energy || '0.07kW' }}</span></div>
        <div class="text-body-2">Operational Efficiency: <span class="font-weight-bold">{{ card.efficiency || '75' }}</span></div>
      </div>
    </div>
  </v-card>
</template>

<script>
import CapacityGraph from './CapacityGraph'
import GoalGraph from './GoalGraph'
import CycleGraph from './CycleGraph'
import UptimeGraph from './UptimeGraph'

export default {
  components: {
    GoalGraph,
    CapacityGraph,
    CycleGraph,
    UptimeGraph
  },
  props: {
    card: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
