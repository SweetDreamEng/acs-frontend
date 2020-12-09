<template>
  <div class="d-flex text-center flex-column flex-md-row flex-grow-1">
    <v-sheet class="layout-side mx-auto mx-md-1 d-none d-md-flex flex-md-column justify-space-between px-2">
      <div class="mt-3 mt-md-10 pa-2">
        <v-img v-if="logoFilePath" class="logo" :src="logoFilePath" > </v-img>
        <v-img v-else-if="logoFilePath === false" class="logo" :src="require('../assets/imgs/logo-aec.png')" > </v-img>
      </div>
      <div v-if="authBackgroundFile" class="w-full" :style="authBackground"/> 
      <div v-else-if="authBackgroundFile === false" class="w-full defaultAuthBackground" />
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
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('app', ['product']),
    ...mapState({
      authBackgroundFile: (state) => state.settings.auth_background_file,
      logoFilePath: (state) => state.settings.logo_file
    }),
    authBackground() {
      return {
        'background-image': `url(${this.authBackgroundFile})`,
        'background-size': 'cover'
      }
    }
  },
  mounted() {
    this.setInitialSetting()
  },
  methods: {
    ...mapActions({
      setInitialSetting: 'settings/setInitialSetting'
    })
  }
}
</script>

<style scoped>
.logo {
  max-width: 356px;
  max-height: 88px;
}

.layout-side {
  width: 420px;
}

.layout-content {
  max-width: 480px;
}

.w-full {
  height: 100%;
}

.defaultAuthBackground {
  background-image: url('../assets/imgs/auth-background.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
