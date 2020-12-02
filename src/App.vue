<template>
  <v-app v-if="isAppReady">
    <page-loading :is-loading="isPageLoading"></page-loading>
    <div>
      <!-- Layout component -->
      <component :is="currentLayout" v-if="isRouterLoaded">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </component>
    </div>

    <v-snackbar
      v-model="toast.show"
      :timeout="toast.timeout"
      :color="toast.color"
      top
      right
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2">{{ toast.icon }}</v-icon>
        <span>{{ toast.message }}</span>
      </div>
      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="toast.show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import config from './configs'

import PageLoading from './components/common/PageLoading'

// Layouts
import defaultLayout from './layouts/DefaultLayout'
import dashboardLayout from './layouts/DashboardLayout'
import simpleLayout from './layouts/SimpleLayout'
import authLayout from './layouts/AuthLayout'
import errorLayout from './layouts/ErrorLayout'

/*
|---------------------------------------------------------------------
| Main Application Component
|---------------------------------------------------------------------
|
| In charge of choosing the layout according to the router metadata
|
*/
export default {
  components: {
    PageLoading,
    defaultLayout,
    simpleLayout,
    authLayout,
    errorLayout,
    dashboardLayout
  },
  computed: {
    ...mapState('app', ['toast']),
    ...mapState({
      isPageLoading: (state) => state.app.isPageLoading,
      isAppReady: (state) => state.auth.isAppReady
    }),
    isRouterLoaded: function() {
      if (this.$route.name !== null) return true

      return false
    },
    currentLayout: function() {
      const layout = this.$route.meta.layout || 'default'

      return layout + 'Layout'
    }
  },
  head: {
    link: [
      // adds config/icons into the html head tag
      ...config.icons.map((href) => ({ rel: 'stylesheet', href }))
    ]
  }
}
</script>

<style>
/**
 * Transition animation between pages
 */

@font-face {
  font-family: "Museo Sans 500";
  src: local("Museo Sans 500"),
   url(./assets/fonts/MuseoSans_500.otf) format("truetype");
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.cursor-pointer {
  cursor: pointer;
}
.theme--dark.v-breadcrumbs a {
  color: white;
}
</style>
