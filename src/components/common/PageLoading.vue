<template>
  <v-dialog
    v-model="isLoading"
    persistent
    content-class="page-loader"
  >
    <v-progress-circular
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-dialog>
</template>
<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style>
  .page-loader {
    width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; box-shadow: none;
  }
</style>