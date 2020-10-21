<template>
	<v-card>
    <v-card-title>
      <span class="primary--text">Notes & Timeline</span>
    </v-card-title>
    <v-card-text>
      <v-timeline align-top>
        <v-timeline-item
          v-for="(note, i) in machine.notes"
          :key="i"
          color="success"
        >
          <v-card color="secondary lighten-1 elevation-1" dark>
            <v-card-title class="py-1">
            {{  formatDate(note.time) }}
            <v-spacer></v-spacer>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                >
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item
                >
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            
            </v-card-title>
            <v-card-text class="white text--primary">
              {{ note.text }}
            </v-card-text>
          </v-card>
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
      return date ? moment(date).format('D MMM H:m:s') : ''
    }
  }
}
</script>