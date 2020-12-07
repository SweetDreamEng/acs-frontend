<template>
  <div
    class="d-flex flex-grow-1"
  >
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
          <v-img v-if="logoFileName" :src="require(logoFileName)" > </v-img>
          <v-img v-else :src="require('../assets/imgs/logo-aec.png')" > </v-img>
        </div>
      </template>

      <!-- Navigation menu -->
      <main-menu v-if="userRole === 'super_admin'" :menu="navigation.superAdminMenu" />
      <main-menu v-if="userRole === 'acs_admin' || userRole === 'acs_manager'" :menu="navigation.menu" />
      <main-menu v-if="userRole === 'acs_viewer'" :menu="navigation.acsViewerMenu" />
      <main-menu v-if="userRole === 'customer_admin' || userRole === 'customer_manager'" :menu="navigation.customerMenu" />
      <main-menu v-if="userRole === 'customer_operator'" :menu="navigation.customerOperatorMenu" />

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
      :color="isToolbarDetached ? 'surface' : undefined"
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
      drawer: true,
      showSearch: false,
      navigation: config.navigation
    }
  },
  computed: {
    ...mapState('app', ['product', 'isContentBoxed', 'menuTheme', 'toolbarTheme', 'isToolbarDetached']),
    ...mapState({
      userRole: (state) => state.auth.user.role,
      logoFileName: (state) => state.settings.logo_file_name
    })
  }
}
</script>
