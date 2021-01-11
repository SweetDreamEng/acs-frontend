<template>
  <v-card>
    <v-card-title>Hopper Stable</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(stable, i) in stables" :key="i">
          <v-list-item-content>
            <!-- <v-list-item-title v-text="file.title"></v-list-item-title>
            <v-list-item-subtitle v-text="file.subtitle"></v-list-item-subtitle> -->
            a
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    stables: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
