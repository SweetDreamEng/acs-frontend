<template>
  <div class="d-flex flex-grow-1">
    <!-- Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      app
      floating
      class="elevation-1"
      :right="$vuetify.rtl"
      :light="menuTheme === 'light'"
      :dark="menuTheme === 'dark'"
    >
      <!-- Navigation menu info -->
      <template v-slot:prepend>
        <div class="pa-2">
          <v-img v-if="logoFile" :src="logoFilePath" @error="onLogoImgError()"> </v-img>
          <v-img v-else-if="logoFile === false" :src="require('../assets/imgs/logo-aec.png')" > </v-img>
        </div>
      </template>
      
      <main-menu :menu="userMenu" />

      <!-- Navigation menu footer -->
      <template v-slot:append>
        <!-- Footer navigation links -->
        <div class="pa-1 text-center">
          <v-btn
            v-for="(item, index) in navigation.footer"
            :key="index"
            :href="item.href"
            :target="item.target"
            small
            text
          >
            {{ item.text }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar
      app
      :color="isToolbarDetached ? 'transparent' : undefined"
      :flat="isToolbarDetached"
      :light="toolbarTheme === 'light'"
      :dark="toolbarTheme === 'dark'"
    >
      <v-card class="flex-grow-1 d-flex" :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']" :flat="!isToolbarDetached">
        <div class="d-flex flex-grow-1 align-center">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer class="d-none d-lg-block"></v-spacer>
          <toolbar-user />
        </div>
      </v-card>
    </v-app-bar>

    <v-main>
      <v-container v-if="this.$route.meta.layout !== 'dashboard'" class="fill-height" :fluid="!isContentBoxed">
        <v-layout>
          <slot></slot>
        </v-layout>
      </v-container>
      <v-layout v-else>
        <slot></slot>
      </v-layout>
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// navigation menu configurations
import config from '../configs'

import MainMenu from '../components/navigation/MainMenu'
import ToolbarUser from '../components/toolbar/ToolbarUser'

export default {
  components: {
    MainMenu,
    ToolbarUser
  },
  data() {
    return {
      drawer: null,
      showSearch: false,
      navigation: config.navigation,
      logoImgError: false
    }
  },
  computed: {
    ...mapState('app', ['product', 'isContentBoxed', 'menuTheme', 'toolbarTheme', 'isToolbarDetached']),
    ...mapState({
      userRole: (state) => state.auth.user.role,
      logoFile: (state) => state.settings.logo_file
    }),
    userMenu() {
      switch (this.userRole) {
      case 'super_admin':
        return this.navigation.superAdminMenu
      case 'acs_admin':
      case 'acs_manager':
        return this.navigation.menu
      case 'acs_viewer':
        return this.navigation.acsViewerMenu
      case 'customer_admin':
      case 'customer_manager':
        return this.navigation.customerMenu
      case 'customer_operator':
        return this.navigation.customerOperatorMenu
      default:
        return null
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
