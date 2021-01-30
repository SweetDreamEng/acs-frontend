<template>
  <v-card>
    <v-card-title>
      <span class="primary--text">Notes & Timeline</span>
    </v-card-title>
    <v-card-text>
      <v-timeline>
        <v-timeline-item
          v-for="(note, i) in notes"
          :key="i"
          color="success"
          :class="{ 'text-right': i % 2 }"
        >
          <template v-slot:opposite>
            <span
              :class="`subtitle font-weight-bold secondary--text`"
            >{{ note.created_at | formatDate('PPpp') }}</span>
          </template>
          {{ note.note }}
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>