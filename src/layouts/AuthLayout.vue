<template>
  <div class="d-flex text-center flex-column flex-md-row flex-grow-1">
    <v-sheet class="layout-side mx-auto mx-md-1 d-none d-md-flex flex-md-column justify-space-between px-2">
      <div class="mt-3 mt-md-10 pa-2">
        <img class="w-full" src="/images/logo-aec.png" />
        <v-btn to="/" class="my-4">Take me back</v-btn>
      </div>
      <img class="w-full" src="/images/illustrations/auth-background.png" />
    </v-sheet>

    <div class="pa-2 pa-md-4 flex-grow-1 align-center justify-center d-flex flex-column">
      <div class="layout-content ma-auto w-full">
        <slot></slot>
      </div>
      <div class="overline mt-4">{{ product.name }} - {{ product.version }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('app', ['product'])
  }
}
</script>

<style scoped>
.layout-side {
  width: 420px;
}

.layout-content {
  max-width: 480px;
}
</style>
