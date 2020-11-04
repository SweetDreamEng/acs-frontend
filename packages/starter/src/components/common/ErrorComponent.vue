<template>
  <v-alert
    v-if="error"
    dense
    outlined
    type="error"
  >
    {{ error }}
  </v-alert>
</template>

<script>
/*
|---------------------------------------------------------------------
| Validation Error Component
|---------------------------------------------------------------------
|
|
*/
export default {
  props: {
    // Text to copy to clipboard
    error: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  }
}
</script>
