<template>
  <div class="d-flex text-center flex-column flex-md-row flex-grow-1">
    <v-sheet class="layout-side mx-auto mx-md-1 d-none d-md-flex flex-md-column justify-space-between px-2">
      <div class="mt-3 mt-md-10 pa-2">
        <v-img v-if="logoFile" class="logo" :src="logoFilePath" @error="onLogoImgError()"> </v-img>
        <v-img v-else-if="logoFile === false" class="logo" :src="require('../assets/imgs/logo-aec.png')" > </v-img>
      </div>
      <div v-if="authBackgroundFile" class="w-full" :style="authBackground" />
      <div v-else-if="authBackgroundFile === false" class="w-full defaultAuthBackground" />
    </v-sheet>

    <div class="pa-2 pa-md-4 flex-grow-1 align-center justify-center d-flex flex-column">
      <div class="layout-content ma-auto w-full">
        <slot></slot>
      </div>
      <div class="text-overline mt-4">{{ product.name }} - {{ product.version }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      logoImgError: false
    }
  },
  computed: {
    ...mapState('app', ['product']),
    ...mapState({
      authBackgroundFile: (state) => state.settings.authBackgroundFile,
      logoFile: (state) => state.settings.logoFile
    }),
    authBackground() {
      return {
        'background-image': `url(${this.authBackgroundFile})`,
        // 'background-size': 'cover',
        'background-position': 'center center',
        'background-size': '100% 100%'
      }
    },
    logoFilePath() {
      return this.logoImgError ? require('../assets/imgs/logo-aec.png') : this.logoFile
    }
  },
  methods: {
    onLogoImgError() {
      this.logoImgError = true
    }
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

.w-full {
  height: 100%;
}

.defaultAuthBackground {
  background-image: url('../assets/imgs/auth-background.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
