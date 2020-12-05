<template>
  <v-menu
    offset-y
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn text dark v-on="on">
        <v-icon left>mdi-menu</v-icon> Companies
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="company in companies"
        :key="company.id"
        link
        @click="$emit('companyChanged', company)"
      >
        <v-list-item-title v-text="company.name"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  props: {
    companies: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
    }
  }
}
</script>