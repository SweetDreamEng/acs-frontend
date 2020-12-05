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
        >
          <template v-slot:opposite>
            <span
              :class="`subtitle font-weight-bold secondary--text`"
              v-text="formatDate(note.created_at)"
            ></span>
          </template>
          {{ note.note }}
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
<script>
/*
|---------------------------------------------------------------------
| Note and Timeline Card Component
|---------------------------------------------------------------------
|
| Timeline and notes for the timeline component
|
*/
import moment from 'moment'
export default {
  props: {
    notes: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
    }
  },
  methods: {
    formatDate(date) {
      return date ? moment(date).format('MMMM Do, YYYY H:m A ') + 'EST' : ''
    }
  }
}
</script>