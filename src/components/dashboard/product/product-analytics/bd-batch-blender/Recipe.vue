<template>
  <v-card height="100%">
    <v-card-title class="d-flex justify-space-between">
      <div>Recipe</div>
      <v-btn
        icon
        small
      >
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      {{ recipeLabel }}
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  components: {
  },
  props: {
    recipeValues: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
    }
  },
  computed: {
    recipeLabel() {
      if (recipeValues.includes(999999)) {
        return 'Auto'
      } else {
        return ''
      }
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
