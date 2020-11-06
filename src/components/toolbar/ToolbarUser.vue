<template>
  <v-menu offset-y left transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <!-- <v-btn icon class="elevation-2" v-on="on">
        <v-badge
          color="success"
          dot
          bordered
          offset-x="10"
          offset-y="10"
        >
          <v-avatar size="40">
            <v-img src="/images/avatars/avatar1.svg"></v-img>
          </v-avatar>
        </v-badge>
      </v-btn> -->
      <v-btn
        icon
        small
        v-on="on"
      >
        <v-avatar
          color="primary"
          size="28"
        >
          <span class="white--text">JD</span>
        </v-avatar>
      </v-btn>
    </template>

    <v-list dense nav>
      <v-list-item
        v-for="(item, index) in menu"
        :key="index"
        :to="item.link"
        :exact="item.exact"
        :disabled="item.disabled"
        link
      >
        <v-list-item-icon>
          <v-icon small :class="{ 'grey--text': item.disabled }">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.key ? $t(item.key) : item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-1"></v-divider>

      <v-list-item @click="signOut">
        <v-list-item-icon>
          <v-icon small>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('menu.logout') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import config from '../../configs'
/*
|---------------------------------------------------------------------
| Toolbar User Component
|---------------------------------------------------------------------
|
| Quickmenu for user menu shortcuts on the toolbar
|
*/
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      menu: config.toolbar.user,
      username: 'John Doe'
    }
  },
  methods: {
    ...mapActions({
      'signOut': 'auth/signOut'
    })
  }
}
</script>
