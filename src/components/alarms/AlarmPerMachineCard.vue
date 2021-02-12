<template>
  <v-row>
    <v-col>
      <v-toolbar
        color="grey"
        flat
        dense
      >
        {{ name }}
      </v-toolbar>
      <v-card
        outlined
        style="border: 1px solid grey;"
        tile
      >
        <v-icon>mdi-near-me</v-icon>{{ amount }}
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    amount: {
      type: Number,
      default: 0
    }
  }
}
</script>
