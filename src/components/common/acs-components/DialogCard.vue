<template>
  <v-card>
    <v-card-title class="primary white--text">{{ title }}</v-card-title>
    <v-card-text class="mt-4">
      
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ['title']
}
</script>