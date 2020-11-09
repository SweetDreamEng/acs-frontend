<template>
	<div>
    <v-menu offset-y left transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          small
          class="ml-auto"
          v-on="on"
        >
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>

      <v-list dense>
        <v-list-item
          v-for="(item, index) in viewOptions"
          :key="index"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      viewOptions: [
        'Weekly', 'Monthly'
      ]
    }
  }
}
</script>
