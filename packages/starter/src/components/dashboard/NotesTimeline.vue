<template>
	<v-card>
    <v-card-title>
      <span class="primary--text">Notes & Timeline</span>
    </v-card-title>
    <v-card-text>
      <v-timeline>
        <v-timeline-item
          v-for="(note, i) in machine.notes"
          :key="i"
          color="success"
        >
          <template v-slot:opposite>
            <span
              :class="`subtitle font-weight-bold cyan--text`"
              v-text="formatDate(note.time)"
            ></span>
          </template>
          {{ note.text }}
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    machine: {
      type: Object,
      default: () => ({
        id: 1,
        selections: [1, 3, 4],
        status: 'Warning',
        machinename: 'BD Batch Blender',
        capacity: 89,
        consumption: '80 Watts',
        factory: '30 Elm Street, NY',
        department: 'Division 1',
        notes: []
      })
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